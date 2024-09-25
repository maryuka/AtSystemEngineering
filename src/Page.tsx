import { Typography } from '@mui/material';
import { DashboardLayout, PageContainer } from '@toolpad/core';

export default function Page() {
  return (
    <DashboardLayout>
      <PageContainer>
        <main>
          <Typography variant="h6" color="grey.800">
            Hello world!
          </Typography>
        </main>
      </PageContainer>
    </DashboardLayout>
  );
}