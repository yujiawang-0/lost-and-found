import {
  Anchor,
  Button,
  Checkbox,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { upperFirst, useToggle } from '@mantine/hooks';
import { FaGoogle } from "react-icons/fa";
import { useState, type ComponentProps } from 'react';
import { useAuth } from '../contexts/authContext/index.js';
import { doCreateUserWithEmailAndPassword, doSignInWithEmailAndPassword } from '../firebase/auth.js';

type PaperProps = ComponentProps<typeof Paper>;


export default function AuthenticationForm(props: PaperProps) {
  const { userLoggedIn } = useAuth();

  const [type, toggle] = useToggle(['login', 'register']);
  const [isSigningIn, setSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });


  const handleSubmit = async (values: typeof form.values) => {
    if (!isSigningIn) {
      setSigningIn(true);
      
      if (type === 'login') {
        // logging in
        await doSignInWithEmailAndPassword(values.email, values.password)
        console.log('Login with', values.email, values.password);
      } else {
        // signing up
        await doCreateUserWithEmailAndPassword(values.email, values.password)
        console.log('Register with', values.name, values.email, values.password);
      }
    }
    
  };

  return (
    <Paper radius="md" p="lg" withBorder {...props}>
      <Text size="lg" fw={500}>
        Welcome to Mantine, {type} with
      </Text>

      <Group grow mb="md" mt="md">
        <Button leftSection={<FaGoogle />} variant="default" {...props}>Google</Button>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          {type === 'register' && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="person@gmail.com"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
            radius="md"
          />

          {type === 'register' && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
            />
          )}
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
            {type === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" radius="xl">
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}