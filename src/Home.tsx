import { Container, Typography, Box } from '@mui/material';
import NavigateButton from './NavigationButton';

export default function Home() {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to <a href="https://mui.com/toolpad/core/introduction">Toolpad Core!</a>
        </Typography>

        <Typography variant="body1">
          Get started by editing <code>(dashboard)/page/page.tsx</code>
        </Typography>
        <NavigateButton />
      </Box>
    </Container>
  );
}