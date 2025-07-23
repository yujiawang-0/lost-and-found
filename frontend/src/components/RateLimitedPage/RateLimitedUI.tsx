import { Button, Container, Group, Text, Title } from '@mantine/core';
import classes from './ServerError.module.css';

export function RateLimitedUI() {
  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.label}>429</div>
        <Title className={classes.title}>Rate Limit Reached...</Title>
        <Text size="lg" ta="center" className={classes.description}>
          You've made too many requests in a short period. Please wait a moment. Try again in a few seconds for the best experience.
        </Text>
        <Group justify="center">
          <Button variant="white" size="md">
            Refresh the page
          </Button>
        </Group>
      </Container>
    </div>
  );
}


export default RateLimitedUI;