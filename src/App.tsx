import theme from './theme.ts';
import { AppProvider, DashboardLayout, Navigation, Router } from '@toolpad/core'
import { Dashboard } from '@mui/icons-material';

import React, { useMemo, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Feedback1 from './Feedback1.tsx';
import Question1 from './Question1.tsx';
import Question2 from './Question2.tsx';
import Feedback2 from './Feedback2.tsx';


const NAVIGATION: Navigation = [
    {
        kind: 'header',
        title: 'Main items',
    },
    {
        segment: '1',
        title: '問題1',
        icon: <Dashboard />,
    },
    {
        segment: '2',
        title: '問題2',
        icon: <Dashboard />,
    },
    {
        segment: '1/feedback',
        title: 'フィードバック1',
        icon: <Dashboard />,
    },
    {
        segment: '2/feedback',
        title: 'フィードバック2',
        icon: <Dashboard />,
    },
];

function DemoPageContent({ pathname }: { pathname: string }) {
    if (pathname === '/1/feedback')
        return <Feedback1 />
    if (pathname === '/2/feedback')
        return <Feedback2 />
    if (pathname === '/1')
        return <Question1 />
    if (pathname === '/2')
        return <Question2 />

    return (
        <Box
            sx={{
                py: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
            }}
        >
            <Typography>Dashboard content for {pathname}</Typography>
        </Box>
    );
}

const App = () => {
    const [pathname, setPathname] = useState('/');
    const router = useMemo<Router>(() => {
        return {
            pathname,
            searchParams: new URLSearchParams(),
            navigate: (path) => setPathname(String(path)),
        };
    }, [pathname]);

    return (
        <AppProvider theme={theme} navigation={NAVIGATION} router={router}>
            <DashboardLayout>
                <DemoPageContent pathname={pathname} />
            </DashboardLayout>

        </AppProvider>
    )
}

export default App
