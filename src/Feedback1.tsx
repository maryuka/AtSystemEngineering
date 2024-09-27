import { Box, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"

const rows = [
    { prob_id: 1, youranswer: 1, correctanswer: 1, explanation: [`members テーブルは会員の基本情報（id, name, email）を適切に保持しています。\nproducts テーブルは商品情報と、その商品が属するカテゴリを示す category_id を持っています。\ncategories テーブルはカテゴリの情報（id, name）を保持しています。\norders テーブルは、どの会員（member_id）がどの商品（product_id）をいくつ（quantity）注文したかを記録しています。\nこの設計は、会員登録、商品のカテゴリ分類、商品の注文という要件を正しく満たしています。`] },
    // { prob_id: 2, youranswer: 2, correctanswer: 2 },
    // { prob_id: 3, youranswer: 3, correctanswer: 2 },
];

const Feedback1 = () => {
    return (
        <Container maxWidth="xl">
            <Box sx={{ my: 4, display: 'flex', flexDirection: 'row' }}>
                <Box>
                    <Typography variant="h4">提出</Typography>
                    <br />
                    <br />
                    <Typography variant="h4">1点/3点</Typography>
                </Box>
                <img style={{ width: "300px", marginLeft: "auto" }} src="/chart.png" alt="chart" />
            </Box>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>問題番号</TableCell>
                            <TableCell>あなたの答え</TableCell>
                            <TableCell >解答</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <>
                                <TableRow
                                    key={row.prob_id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.prob_id}
                                    </TableCell>
                                    <TableCell>{row.youranswer}</TableCell>
                                    <TableCell>{row.correctanswer}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={3}>
                                        {row.explanation}
                                    </TableCell>
                                </TableRow>
                            </>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}

export default Feedback1
