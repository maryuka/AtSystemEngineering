import { Container, Typography, Box, List, ListItem, ListItemText, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import { useState } from 'react';
import MonacoEditor from '@uiw/react-monacoeditor';

const answers = [
    {
        title: '解答例1',
        content: `
        会員テーブル:
        - 会員ID
        - 名前
        - メールアドレス

        商品テーブル:
        - 商品ID
        - 商品名
        - カテゴリID

        カテゴリテーブル:
        - カテゴリID
        - カテゴリ名

        注文テーブル:
        - 注文ID
        - 会員ID
        - 商品ID
        - 注文日
      `,
    },
    {
        title: '解答例2',
        content: `
        会員テーブル:
        - 会員ID
        - 名前
        - メールアドレス
        - 住所

        商品テーブル:
        - 商品ID
        - 商品名
        - カテゴリID
        - 価格

        カテゴリテーブル:
        - カテゴリID
        - カテゴリ名

        注文テーブル:
        - 注文ID
        - 会員ID
        - 商品ID
        - 注文日
        - 数量
      `,
    },
    {
        title: '解答例3',
        content: `
        会員テーブル:
        - 会員ID
        - 名前
        - メールアドレス
        - 電話番号

        商品テーブル:
        - 商品ID
        - 商品名
        - カテゴリID
        - 在庫数

        カテゴリテーブル:
        - カテゴリID
        - カテゴリ名

        注文テーブル:
        - 注文ID
        - 会員ID
        - 商品ID
        - 注文日
        - 配送先住所
      `,
    },
];

const renderTable = (content: string) => {
    const tables = content.trim().split('\n\n').map(table => {
        const lines = table.trim().split('\n');
        const tableName = lines[0].replace(':', '');
        const columns = lines.slice(1).map(line => line.replace('-', '').trim());
        return { tableName, columns };
    });

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>テーブル名 </TableCell>
                        < TableCell > カラム </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        tables.map((table, index) => (
                            <TableRow key={index} sx={{ paddingY: 0 }}>
                                <TableCell sx={{ paddingY: 0 }}> {table.tableName} </TableCell>
                                < TableCell sx={{ paddingY: 0 }
                                }>
                                    <List>
                                        {
                                            table.columns.map((column, idx) => (
                                                <ListItem key={idx} sx={{ listStyleType: 'disc', display: 'list-item', paddingY: 0 }} >
                                                    <ListItemText primary={column} />
                                                </ListItem>
                                            ))}
                                    </List>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>

    );
};


export default function Question2() {
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const handleAnswerClick = (answer: number) => {
        setSelectedAnswer(answer);
    };

    return (
        <Container maxWidth="xl" >
            <Typography variant="h3" > {``} </Typography>
            <Box sx={{ my: 4, display: 'flex', flexDirection: 'row', gap: 4 }}>
                <Box sx={{ display: 'flex', width: '40%', flexDirection: 'column', gap: 4 }}>
                    <Typography variant="h4" > 問題 </Typography>
                    < Typography variant="h6" > 簡易なECサイトのテーブル設計を行う際、以下の要件を満たす正しいテーブル設計を選んでください。</Typography>
                    < Box sx={{ display: 'flex', width: '50%', flexDirection: 'column', gap: 1 }
                    }>
                        <Typography variant="body1" > 要件 </Typography>
                        < List sx={{ pl: 2 }}>
                            <ListItem sx={{ listStyleType: 'disc', display: 'list-item' }}>
                                <ListItemText primary="会員が登録できる" />
                            </ListItem>
                            < ListItem sx={{ listStyleType: 'disc', display: 'list-item' }}>
                                <ListItemText primary="商品はカテゴリで分類される" />
                            </ListItem>
                            < ListItem sx={{ listStyleType: 'disc', display: 'list-item' }}>
                                <ListItemText primary="会員は商品を注文できる" />
                            </ListItem>
                        </List>
                    </Box>
                </Box>
                < Box sx={{ display: 'flex', width: '60%', flexDirection: 'column' }}>
                    <Typography variant="h4" > 解答 </Typography>
                    {/* monacoeditorを使ってコード入力をする */}
                    <MonacoEditor
                        language="html"
                        height="300px"
                        value=''
                        options={{
                            theme: 'vs-dark',
                        }}
                        // monacoeditorのvalueを更新する
                        onChange={(value) => {
                            console.log(value);
                        }}
                    />

                </Box>
            </Box>
            < Box sx={{ position: 'fixed', bottom: 16, right: 16 }}>
                <Button variant="contained" color="primary" > Submit </Button>
            </Box>
        </Container>
    );
}