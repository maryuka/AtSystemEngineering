# app/database.py

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .models import Base, ERDiagram
from .utils import parse_mermaid_er, calculate_scores

import os
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATABASE_URL = f"sqlite:///{os.path.join(BASE_DIR, '../data/er_diagrams.db')}"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    Base.metadata.create_all(bind=engine)
    session = SessionLocal()
    if session.query(ERDiagram).count() == 0:
        # 初期データの挿入（スコアに違いを持たせる）
        default_diagrams = [
            {
                "content": """
                erDiagram
                    A {
                        int id PK
                        string name
                        string email
                        string address
                        string phone
                    }
                    B {
                        int id PK
                        int a_id FK
                        string description
                    }
                    A ||--o{ B : "has"
                """,
                # リレーション数: 1, エンティティ数: 2, カラム名の長さ: 短い（平均4.5）
                "relation_score": 1,
                "entity_score": 2,
                "column_name_score": 4.5,
            },
            {
                "content": """
                erDiagram
                    CUSTOMER {
                        int customer_id PK
                        string first_name
                        string last_name
                        string email_address
                        string physical_address
                        string phone_number
                    }
                    ORDER {
                        int order_id PK
                        int customer_id FK
                        date order_date
                        float total_amount
                        string shipping_method
                        string payment_status
                        date estimated_delivery_date
                    }
                    PRODUCT {
                        int product_id PK
                        string product_name
                        string product_description
                        float unit_price
                        int stock_quantity
                    }
                    ORDER ||--o{ PRODUCT : "includes"
                    CUSTOMER ||--o{ ORDER : "places"
                """,
                # リレーション数: 2, エンティティ数: 3, カラム名の長さ: 長い（平均15.0）
                "relation_score": 2,
                "entity_score": 3,
                "column_name_score": 15.0,
            },
            {
                "content": """
                erDiagram
                    X {
                        int x_id PK
                    }
                    Y {
                        int y_id PK
                    }
                    Z {
                        int z_id PK
                    }
                """,
                # リレーション数: 0, エンティティ数: 3, カラム名の長さ: 短い（平均4.0）
                "relation_score": 0,
                "entity_score": 3,
                "column_name_score": 4.0,
            },
        ]
        for diagram in default_diagrams:
            er_diagram = ERDiagram(
                content=diagram["content"].strip(),
                relation_score=diagram["relation_score"],
                entity_score=diagram["entity_score"],
                column_name_score=diagram["column_name_score"],
            )
            session.add(er_diagram)
        session.commit()
    session.close()
