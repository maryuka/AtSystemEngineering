import theme from './theme.ts';
import { AppProvider, Navigation } from '@toolpad/core'
import { Dashboard } from '@mui/icons-material';
import { Routes, Route } from 'react-router-dom';
import Page from './Page.tsx';
import Question from './Question.tsx';

const NAVIGATION: Navigation = [
    {
        kind: 'header',
        title: 'Main items',
    },
    {
        segment: 'page',
        title: 'Page',
        icon: <Dashboard />,
    },
];

const App = () => {
    return (
        <AppProvider theme={theme} navigation={NAVIGATION}>
            <Routes>
                <Route index element={<Page />} />
                <Route path="/question" element={<Question />} />
            </Routes>
        </AppProvider>
    )
}

export default App
