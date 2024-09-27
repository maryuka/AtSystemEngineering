import { Container, Box, Card, CardContent, Typography, Grid } from '@mui/material';

const problems = [
    { title: '問題1: ECサイト', difficulty: '難易度: 低', path: '/questions/1' },
    { title: '問題2: ECサイト', difficulty: '難易度: 高', path: '/questions/2' },
    { title: '問題3: ホテル予約システム', difficulty: '難易度: 高', path: '/questions/3' },
    { title: '問題4: タスク管理アプリケーション', difficulty: '難易度: 低', path: '/questions/4' },
    { title: '問題5: イベント管理システム', difficulty: '難易度: 中', path: '/questions/5' },
];

const DatabaseQuestions = () => {
    return (
        <Container maxWidth="xl">
            <Grid container spacing={4} sx={{ marginTop: 4 }}>
                {problems.map((problem, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ cursor: 'pointer' }} onClick={() => window.location.href = problem.path}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {problem.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {problem.difficulty}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default DatabaseQuestions;