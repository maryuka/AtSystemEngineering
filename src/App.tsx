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
import DatabaseQuestions from './Database.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const NAVIGATION = (navigate: (path: string) => void) => [
    {
        segment: 'categories/1',
        title: 'データベース設計',
        icon: <StorageIcon />,
        onClick: () => navigate('/categories/1'),
    },
    {
        segment: 'categories/2',
        title: 'API設計',
        icon: <StorageIcon />,
        onClick: () => navigate('/categories/2'),
    },
    {
        segment: 'categories/3',
        title: 'UI設計',
        icon: <StorageIcon />,
        onClick: () => navigate('/categories/3'),
    },
];

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

    function DemoPageContent({ pathname }: { pathname: string }) {
        if (pathname === '/categories/1') {
            return <DatabaseQuestions />;
        }

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

    return (
        <AppProvider branding={{ title: "AtSystemEngineering" }} theme={theme} navigation={NAVIGATION(router.navigate)} router={router} session={session} authentication={authentication}>
            <DashboardLayout>
                <Routes>
                    <Route path="/" element={<DemoPageContent pathname={pathname} />} />
                    <Route path="/categories/1" element={<DatabaseQuestions />} />
                    <Route path="/categories/2" element={<Typography>API設計のコンテンツ</Typography>} />
                    <Route path="/categories/3" element={<Typography>UI設計のコンテンツ</Typography>} />
                    <Route path="/questions/1" element={<Question1 />} />
                    <Route path="/questions/2" element={<Question2 />} />
                    <Route path="/questions/1/feedback" element={<Feedback1 />} />
                    <Route path="/questions/2/feedback" element={<Feedback2 />} />
                </Routes>
            </DashboardLayout>
        </AppProvider>
    );
};

export default App;