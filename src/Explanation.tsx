import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';

const MermaidExplanation: React.FC = () => {
    return (
        <Box display="flex" justifyContent="center" mt={2}>
            {/* // MUIのアコーディオンを使ってマーメイド記法の書き方を包含する */}
            <Paper elevation={3} sx={{ width: "full", p: 3 }}>
                <Typography variant="h5" gutterBottom>
                    マーメイド記法の書き方
                </Typography>

                <Typography variant="h6" gutterBottom>
                    1. ER図の定義を始める
                </Typography>
                <Typography paragraph>
                    <code>erDiagram</code> キーワードを使って、ER図の記述を始めます。
                </Typography>

                <Typography variant="h6" gutterBottom>
                    2. エンティティの定義
                </Typography>
                <Typography paragraph>
                    各エンティティを次の形式で記述します：
                </Typography>
                <Paper elevation={1} sx={{ p: 2, bgcolor: '#f5f5f5', mb: 2 }}>
                    <Typography variant="body1" component="pre">
                        {`ENTITY_NAME {
    型 属性名
    型 属性名
}`}
                    </Typography>
                </Paper>
                <Typography paragraph>
                    例：EMPLOYEE エンティティを定義する際のコードです。
                </Typography>
                <Paper elevation={1} sx={{ p: 2, bgcolor: '#f5f5f5', mb: 2 }}>
                    <Typography variant="body1" component="pre">
                        {`EMPLOYEE {
    int id PK
    string name
    string position
    float salary
}`}
                    </Typography>
                </Paper>

                <Typography variant="h6" gutterBottom>
                    3. リレーションシップの定義
                </Typography>
                <Typography paragraph>
                    エンティティ間のリレーションシップを次の形式で記述します：
                </Typography>
                <Paper elevation={1} sx={{ p: 2, bgcolor: '#f5f5f5', mb: 2 }}>
                    <Typography variant="body1" component="pre">
                        {`エンティティA ||--o{ エンティティB : "関係の名前"`}
                    </Typography>
                </Paper>
                <Typography paragraph>
                    例：EMPLOYEEがDEPARTMENTに所属している関係を表す場合のコードです。
                </Typography>
                <Paper elevation={1} sx={{ p: 2, bgcolor: '#f5f5f5', mb: 2 }}>
                    <Typography variant="body1" component="pre">
                        {`EMPLOYEE ||--o{ DEPARTMENT : "works in"`}
                    </Typography>
                </Paper>

                <Typography variant="h6" gutterBottom>
                    4. 完成した例
                </Typography>
                <Typography paragraph>
                    最後に、全体の例は次のようになります：
                </Typography>
                <Paper elevation={1} sx={{ p: 2, bgcolor: '#f5f5f5' }}>
                    <Typography variant="body1" component="pre">
                        {`erDiagram
EMPLOYEE {
    int id PK
    string name
    string position
    float salary
}
DEPARTMENT {
    int id PK
    string department_name
}
PROJECT {
    int id PK
    string project_name
    date start_date
    date end_date
}
EMPLOYEE ||--o{ DEPARTMENT : "works in"
EMPLOYEE ||--o{ PROJECT : "assigned to"
DEPARTMENT ||--o{ PROJECT : "oversees"
`}
                    </Typography>
                </Paper>
            </Paper>
        </Box>
    );
};

export default MermaidExplanation;