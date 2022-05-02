import QrCode from 'qrcode';
import { useCallback, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

function App(): JSX.Element {
  const canvas = useRef(null);

  const [size, setSize] = useState<number>(500);
  const [content, setContent] = useState<string>('https://example.com');

  useEffect(() => {
    QrCode.toCanvas(canvas.current, content, { width: size });
  }, [content, size]);

  const download = useCallback(() => {
    QrCode.toDataURL(canvas.current, content, { width: size }, (error, url) => {
      const a = document.createElement('a');
      a.href = url;
      a.download = 'qrcode.png';
      a.click();
      a.remove();
    });
  }, [content, size]);

  return (
    <Box my={8} px={4}>
      <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 500, mx: 'auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="h4">QR Code Generator</Typography>
        </Box>

        <TextField
          label="Size (px)"
          margin="normal"
          onChange={(e) => setSize(Number.parseInt(e.currentTarget.value))}
          type="number"
          value={size}
        />

        <TextField
          label="Content"
          margin="normal"
          onChange={(e) => setContent(e.currentTarget.value)}
          value={content}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 8,
          mx: 'auto',
          width: '80%',
        }}
      >
        <canvas id="qrcode-canvas" ref={canvas} width={size} height={size}></canvas>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button onClick={download} size="large" variant="outlined">
          Download
        </Button>
      </Box>
    </Box>
  );
}

export default App;
