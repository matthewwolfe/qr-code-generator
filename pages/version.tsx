import Box from '@mui/material/Box';
import packageJson from '../package.json';

function Version(): JSX.Element {
  return <Box p={2}>Version: {packageJson.version}</Box>;
}

export default Version;
