import { Box } from '@mantine/core';
import classes from './Demo.module.css';

export function Demo() {
  return (
    <Box className={classes.box}>
      Box component with <span className={classes.highlight}>some styles</span>
    </Box>
  );
}
