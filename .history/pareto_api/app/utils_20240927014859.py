# app/utils.py

import re
from collections import defaultdict
import numpy as np

# Mermaid ER図をパースする関数
def parse_mermaid_er(mermaid_text):
    tables = defaultdict(dict)
    current_table = None

    # 行ごとにパース
    for line in mermaid_text.strip().splitlines():
        # テーブル名の抽出
        table_match = re.match(r'\s*(\w+)\s*\{', line)
        if table_match:
            current_table = table_match.group(1)
            tables[current_table] = {"columns": [], "relations": []}
        # カラム情報の抽出
        elif current_table and re.match(r'\s*\}', line) is None:
            column_info = line.strip().split()
            if len(column_info) >= 2:
                column_name = column_info[1]
                tables[current_table]["columns"].append(column_name)
        # リレーション情報の抽出
        relation_match = re.match(r'\s*(\w+)\s*[\|}]{2}--[o|}]{1}\{\s*(\w+)\s*:', line)
        if relation_match:
            table_a = relation_match.group(1)
            table_b = relation_match.group(2)
            tables[table_a]["relations"].append(table_b)

    return tables

# スコアを計算する関数
def calculate_scores(tables_info):
    # リレーション数
    relations = set()
    for table, info in tables_info.items():
        for rel in info["relations"]:
            # リレーションを一意に識別するためにソート
            relations.add(tuple(sorted([table, rel])))
    relation_score = len(relations)

    # エンティティ数
    entity_score = len(tables_info)

    # カラム名の長さ（平均文字数）
    column_lengths = []
    for table, info in tables_info.items():
        for column in info["columns"]:
            column_lengths.append(len(column))
    avg_column_length = sum(column_lengths) / len(column_lengths) if column_lengths else 0
    column_name_score = avg_column_length

    return relation_score, entity_score, column_name_score

# パレート効率的な解を求める関数
def is_pareto_efficient(costs):
    is_efficient = np.ones(costs.shape[0], dtype=bool)
    for i, c in enumerate(costs):
        is_efficient[i] = np.all(
            np.any(costs <= c, axis=1) | (np.sum(costs < c, axis=1) > 0)
        )
    return is_efficient

# フィードバックメッセージを生成する関数
def generate_feedback(differences, is_pareto_optimal):
    feedback_parts = []
    criteria = ["リレーションの数", "エンティティの数", "カラム名の長さ"]
    for idx, diff in enumerate(differences):
        if diff > 0:
            feedback_parts.append(f"{criteria[idx]}に重きを置きすぎた設計になっています。")
        elif diff < 0:
            feedback_parts.append(f"{criteria[idx]}が軽視された設計になっています。")
    if is_pareto_optimal:
        feedback = "多くの機能を両立させた素晴らしい設計です。"
    else:
        feedback = " ".join(feedback_parts) if feedback_parts else "設計を見直すことをおすすめします。"
    return feedback
