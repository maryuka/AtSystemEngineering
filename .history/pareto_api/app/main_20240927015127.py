# app/main.py

from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from . import models, schemas, utils, database
import numpy as np

app = FastAPI()

# データベースの初期化
models.Base.metadata.create_all(bind=database.engine)
database.init_db()

# データベースセッションを取得する依存関係
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/evaluate", response_model=schemas.ERDiagramOutput)
def evaluate_er_diagram(
    diagram_input: schemas.ERDiagramInput, db: Session = Depends(get_db)
):
    # Mermaid ER図をパースしてスコアを計算
    try:
        tables_info = utils.parse_mermaid_er(diagram_input.content)
        (
            input_relation_score,
            input_entity_score,
            input_column_name_score,
        ) = utils.calculate_scores(tables_info)
    except Exception as e:
        raise HTTPException(status_code=400, detail="ER図のパースに失敗しました。")

    # データベースに保存
    new_diagram = models.ERDiagram(
        content=diagram_input.content.strip(),
        relation_score=input_relation_score,
        entity_score=input_entity_score,
        column_name_score=input_column_name_score,
    )
    db.add(new_diagram)
    db.commit()
    db.refresh(new_diagram)

    # データベースから全てのER図を取得
    all_diagrams = db.query(models.ERDiagram).all()

    # スコアを集計
    scores = []
    diagrams_content = []
    for diagram in all_diagrams:
        scores.append(
            [diagram.relation_score, diagram.entity_score, diagram.column_name_score]
        )
        diagrams_content.append(diagram.content)

    costs = np.array(scores)

    # パレート効率的な解を計算
    pareto_mask = utils.is_pareto_efficient(costs)
    pareto_costs = costs[pareto_mask]
    pareto_diagrams = [
        diagrams_content[i] for i in range(len(diagrams_content)) if pareto_mask[i]
    ]

    # 入力されたER図がパレート効率的かどうかを確認
    input_index = [diagram.id for diagram in all_diagrams].index(new_diagram.id)
    is_input_pareto = pareto_mask[input_index]

    # パレート効率的な解の平均スコアを計算（入力がパレート効率的な場合は自分を除く）
    if is_input_pareto and len(pareto_costs) > 1:
        pareto_mean_scores = np.mean(
            np.delete(pareto_costs, np.where(pareto_mask == input_index), axis=0), axis=0
        )
    else:
        pareto_mean_scores = np.mean(pareto_costs, axis=0)

    # スコアの差を計算
    input_scores = np.array(
        [input_relation_score, input_entity_score, input_column_name_score]
    )
    score_differences = input_scores - pareto_mean_scores

    # フィードバックの生成
    feedback = utils.generate_feedback(score_differences, is_input_pareto)

    # 結果をJSON形式で返す
    return {
        "input_scores": {
            "relation_score": input_relation_score,
            "entity_score": input_entity_score,
            "column_name_score": input_column_name_score,
        },
        "pareto_scores": {
            "relation_score": pareto_mean_scores[0],
            "entity_score": pareto_mean_scores[1],
            "column_name_score": pareto_mean_scores[2],
        },
        "score_differences": {
            "relation_score_diff": score_differences[0],
            "entity_score_diff": score_differences[1],
            "column_name_score_diff": score_differences[2],
        },
        "pareto_diagrams": pareto_diagrams,
        "feedback": feedback,
    }
