import theme from './theme.ts';
import { AppProvider, DashboardLayout, Navigation, Router, Session } from '@toolpad/core'

import { useEffect, useMemo, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Feedback1 from './Feedback1.tsx';
import Question1 from './Question1.tsx';
import Question2 from './Question2.tsx';
import Feedback2 from './Feedback2.tsx';
import StorageIcon from '@mui/icons-material/Storage';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

const NAVIGATION = (navigate: (path: string) => void) => [
    {
        segment: '1',
        title: '問題1',
        icon: <StorageIcon />,
        onClick: () => navigate('/1'),
    },
    {
        segment: '2',
        title: '問題2',
        icon: <StorageIcon />,
        onClick: () => navigate('/2'),
    },
    {
        segment: '1/feedback',
        title: 'フィードバック1',
        icon: <ThumbUpAltIcon />,
        onClick: () => navigate('/1/feedback'),
    },
    {
        segment: '2/feedback',
        title: 'フィードバック2',
        icon: <ThumbUpAltIcon />,
        onClick: () => navigate('/2/feedback'),
    },
];

function DemoPageContent({ pathname }: { pathname: string }) {
    if (pathname === '/1/feedback')
        return <Feedback1 />;
    if (pathname === '/2/feedback')
        return <Feedback2 />;
    if (pathname === '/1')
        return <Question1 />;
    if (pathname === '/2')
        return <Question2 />;

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
    const [pathname, setPathname] = useState(window.location.pathname);
    const router = useMemo<Router>(() => {
        return {
            pathname,
            searchParams: new URLSearchParams(window.location.search),
            navigate: (path) => {
                window.history.pushState({}, '', path);
                setPathname(path.toString());
            },
        };
    }, [pathname]);

    const [session, setSession] = useState<Session | null>({
        user: {
            name: 'Bharat Kashyap',
            email: 'bharatkashyap@outlook.com',
            image: '/panda.jpg',
        },
    });

    const authentication = useMemo(() => {
        return {
            signIn: () => {
                setSession({
                    user: {
                        name: 'Bharat Kashyap',
                        email: 'bharatkashyap@outlook.com',
                        image: 'https://avatars.githubusercontent.com/u/19550456',
                    },
                });
            },
            signOut: () => {
                setSession(null);
            },
        };
    }, []);

    return (
        <AppProvider branding={{ title: "AtSystemEngineering" }} theme={theme} navigation={NAVIGATION(router.navigate)} router={router} session={session} authentication={authentication}>
            <DashboardLayout>
                <DemoPageContent pathname={pathname} />
            </DashboardLayout>
        </AppProvider>
    );
};

export default App;