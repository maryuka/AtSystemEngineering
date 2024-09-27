import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import Mermaid from 'react-mermaid2';

interface ERDiagramProps {
    answer: string | null;
}

const ERDiagram: React.FC<ERDiagramProps> = ({ answer }) => {
    const diagramDefinition = `
    erDiagram
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
    `;
    console.log(answer);
    console.log(diagramDefinition);

    return (
        <Box display="flex" justifyContent="center" mt={5}>
            <Paper elevation={3} sx={{ width: 500, p: 3 }}>
                <Typography variant="h6" gutterBottom>
                    ER Diagram
                </Typography>
                <Mermaid chart={answer} />
            </Paper>
        </Box>
    );
};

export default ERDiagram;