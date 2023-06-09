import ModalBox from '../Modal/Modal';
import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Text, Group, Button, Divider, Stack, Flex, Image, Anchor } from '@mantine/core';
import { account, db } from '@/services/appwriteConfig';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { ModalContext, UserDataContext } from '@/context';

const Login = () => {
  const router = useRouter();
  const { setIsOpen } = useContext(ModalContext);
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
      // localStorage.setItem('userId', loggedUser.$id);
      const { userId } = loggedUser;
      console.log({ loggedUser });
      db.getDocument('6481cad1448109f73920', '6481cada40114c73e2c1', userId)
        .then((res) => {
          console.log({ res });
          const { userId, username, email, color, isPic } = res;
          setUserData({
            userId,
            username,
            email,
            color,
            isLoggedIn: true,
            isPic,
          });
          console.log({ userData });
        })
        .catch((err) => console.log(err));

      setIsOpen(false);
      // setUserData({})
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  const signupHandler = () => {
    router.push('/signup');
    setIsOpen(false);
  };

  const googleLogginHandler = async () => {
    try {
      const loggedUser = account.createOAuth2Session('google', 'http://localhost:3000');
      console.log({ loggedUser });
      toast.info('logged in');
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
        {/* <Flex justify="right" mt={20}>
          <Button style={{ background: '#5509F7' }} type="submit" radius="xl">
            Login
          </Button>
        </Flex> */}
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
