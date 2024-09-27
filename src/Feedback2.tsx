import { Box, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import MonacoEditor from '@uiw/react-monacoeditor';

const res = {
    "input_scores": {
        "relation_score": 1,
        "entity_score": 2,
        "column_name_score": 7.444444444444445
    },
    "pareto_scores": {
        "relation_score": 1,
        "entity_score": 3,
        "column_name_score": 9.5
    },
    "score_differences": {
        "relation_score_diff": 0,
        "entity_score_diff": -1,
        "column_name_score_diff": -2.0555555555555554
    },
    "pareto_diagrams": [
        "erDiagram\n                    CUSTOMER {\n                        int customer_id PK\n                        string first_name\n                        string last_name\n                        string email_address\n                        string physical_address\n                        string phone_number\n                    }\n                    ORDER {\n                        int order_id PK\n                        int customer_id FK\n                        date order_date\n                        float total_amount\n                        string shipping_method\n                        string payment_status\n                        date estimated_delivery_date\n                    }\n                    PRODUCT {\n                        int product_id PK\n                        string product_name\n                        string product_description\n                        float unit_price\n                        int stock_quantity\n                    }\n                    ORDER ||--o{ PRODUCT : \"includes\"\n                    CUSTOMER ||--o{ ORDER : \"places\"",
        "erDiagram\n                    X {\n                        int x_id PK\n                    }\n                    Y {\n                        int y_id PK\n                    }\n                    Z {\n                        int z_id PK\n                    }"
    ],
    "feedback": "エンティティの数が軽視された設計になっています。 カラム名の長さが軽視された設計になっています。"
}

const Feedback2 = () => {
    return (
        <Container maxWidth="xl">
            <Box sx={{ my: 4, display: 'flex', flexDirection: 'row', gap: 4 }}>
                <Box sx={{ width: "60%" }}>
                    <Typography variant="h4" >提出</Typography>
                    <br />
                    <br />
                    <Typography variant="h4">{res.feedback}</Typography>
                    <TableContainer component={Paper} sx={{ marginTop: "80px" }}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>リレーションの数</TableCell>
                                    <TableCell>エンティティの数</TableCell>
                                    <TableCell>カラム名の短さ</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>絶対スコア</TableCell>
                                    <TableCell component="th" scope="row">
                                        {res.input_scores.relation_score}
                                    </TableCell>
                                    <TableCell>{res.input_scores.entity_score}</TableCell>
                                    <TableCell>{res.input_scores.column_name_score}</TableCell>
                                </TableRow>
                                <TableRow
                                // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>パレット最適</TableCell>
                                    <TableCell component="th" scope="row">
                                        {res.pareto_scores.relation_score}
                                    </TableCell>
                                    <TableCell>{res.pareto_scores.entity_score}</TableCell>
                                    <TableCell>{res.pareto_scores.column_name_score}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>スコアの差</TableCell>
                                    <TableCell component="th" scope="row">
                                        {res.score_differences.relation_score_diff}
                                    </TableCell>
                                    <TableCell>{res.score_differences.entity_score_diff}</TableCell>
                                    <TableCell>{res.score_differences.column_name_score_diff}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                <Box sx={{ width: "40%" }}>
                    <Typography variant="h4">解答例</Typography>
                    <MonacoEditor
                        language="html"
                        height="500px"
                        value={res.pareto_diagrams[0]}
                        options={{
                            theme: 'vs-dark',
                        }}
                    />
                </Box>
            </Box>

            {/* <NavigateButton /> */}
        </Container>
    )
}

export default Feedback2
