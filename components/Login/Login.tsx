import ModalBox from '../Modal/Modal';
import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Text, Group, Button, Divider, Stack, Flex, Image, Anchor } from '@mantine/core';
import { account, db } from '@/services/appwriteConfig';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { ModalContext, UserDataContext } from '@/context';
import { config } from '@/services/config';

const Login = () => {
  const router = useRouter();
  const { setIsModal } = useContext(ModalContext);
  const { userData, setUserData } = useContext(UserDataContext);
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length < 8 ? 'Password should include at least 8 characters' : null),
    },
  });

  const loginHandler = async () => {
    try {
      const loggedUser = await account.createEmailSession(form.values.email, form.values.password);
      const { userId } = loggedUser;
      localStorage.setItem('userId', userId);
      db.getDocument(config.NEXT_PUBLIC_DATABASE_ID, config.NEXT_PUBLIC_USERDATA_COLLECTION_ID, userId)
        .then((res) => {
          const { userId, username, email, color, isPic } = res;
          setUserData({
            userId,
            username,
            email,
            color,
            isLoggedIn: true,
            isPic,
          });
        })
        .catch((err) => console.log(err));

      setIsModal((prev) => ({ ...prev, isLogging: false }));
      // setUserData({})
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  const signupHandler = () => {
    router.push('/signup');
    setIsModal((prev) => ({ ...prev, isLogging: false }));
  };

  const googleLogginHandler = async () => {
    try {
      account.createOAuth2Session('google', config.NEXT_PUBLIC_APP_URL);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <ModalBox title="Login">
      <Group grow mb="md" mt="md">
        <Button variant="filled" onClick={googleLogginHandler}>
          <Image src="/assets/google.png" alt="google logo" width={25} />
          Continue with Google
        </Button>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(loginHandler)}>
        <Stack>
          <TextInput label="Email" placeholder="hello@mantine.dev" {...form.getInputProps('email')} radius="md" />

          <PasswordInput label="Password" placeholder="Your password" {...form.getInputProps('password')} radius="md" />
        </Stack>
        <Group position="apart" mt="xl">
          <Anchor component="button" type="button" color="dimmed" onClick={signupHandler} size="xs">
            Don&apos;t have an account? Register
          </Anchor>
          <Button style={{ background: '#5509F7' }} type="submit" radius="xl">
            Login
          </Button>{' '}
        </Group>
      </form>
    </ModalBox>
  );
};

export default Login;
