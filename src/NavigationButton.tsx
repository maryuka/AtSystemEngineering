import * as React from 'react';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';

export default function NavigateButton() {
  const [loading, setLoading] = React.useState(false);
  return (
    <Box sx={{ mt: 2 }}>
      <a href="/">
        <LoadingButton
          variant="contained"
          color="primary"
          loading={loading}
          onClick={() => setLoading(true)}
        >
          問題一覧に戻る
        </LoadingButton>
      </a>
    </Box>
  );
}