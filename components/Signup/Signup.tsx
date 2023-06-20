import { SyntheticEvent, useContext, useEffect, useState } from 'react';
import classes from './styles.module.css';
import { Stepper, Button, Group, Paper, AspectRatio, TextInput, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import Upload from '../DropZone/DropZone';
import { account, db } from '@/services/appwriteConfig';
import { ToastContainer, toast } from 'react-toastify';
import { randomColor } from '@/utils/constants/colors';
import { uniqueId } from '@/utils/constants/uniqueId';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { UserDataContext } from '@/context';
import { config } from '@/services/config';

const Signup = () => {
  const [active, setActive] = useState(0);
  const [isSigned, setIsSigned] = useState(false);
  const id = uniqueId();
  const { setUserData } = useContext(UserDataContext);
  const router = useRouter();

  const nextStep = () => {
    if (active == 1) {
      router.push('/');
    }
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    });
  };
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const form = useForm({
    initialValues: {
      name: '',
      password: '',
      email: '',
    },

    validate: (values) => {
      if (active === 0) {
        return {
          name: values.name.trim().length < 1 ? 'Username is required' : null,
          password: values.password.length < 8 ? 'Password must include at least 8 characters' : null,
          email: /^\S+@\S+$/.test(values.email) ? null : 'Invalid email',
        };
      }
      return {};
    },
  });

  const signupHandler = async () => {
    try {
      if (!form.validate().hasErrors) {
        const color = randomColor;

        //create user
        const newUser = await account.create(id, form.values.email, form.values.password, form.values.name);
        console.log({ newUser });
        localStorage.setItem('userId', newUser.$id);

        //creating session
        const session = await account.createEmailSession(form.values.email, form.values.password);

        //user databse
        const data = await db.createDocument(
          config.NEXT_PUBLIC_DATABASE_ID,
          config.NEXT_PUBLIC_USERDATA_COLLECTION_ID,
          id,
          {
            userId: id,
            username: form.values.name,
            email: form.values.email,
            color,
          },
        );
        console.log('userDB', { data });
        localStorage.setItem('userId', id);
        setUserData({
          userId: id,
          username: form.values.name,
          email: form.values.email,
          color,
          isPic: false,
          isLoggedIn: true,
        });
        setActive(1);

        //sending verification
        await account.createVerification('http://localhost:3000/signup');
        toast.info('Verification mail sent');
        console.log({ session });
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  if (typeof window !== 'undefined') {
    // Client-side-only code
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');
    const secret: any = urlParams.get('secret');

    if (userId) {
      account.updateVerification(userId, secret).then(() => {
        toast.info('Email verified');
        setIsSigned(true);
      });
      localStorage.setItem('userId', id);
    }
  }

  return (
    <section className={classes.main}>
      <div className={classes.img}>
        <Image src="/assets/signup.svg" alt="herobox pic" fill />
      </div>
      <Paper className={classes.paper}>
        <Stepper active={active} onStepClick={setActive} breakpoint="sm">
          <Stepper.Step label="First step" description="Create an account">
            <TextInput label="Name" placeholder="Name" {...form.getInputProps('name')} />
            <TextInput mt="md" label="Email" placeholder="Email" {...form.getInputProps('email')} />
            <PasswordInput mt="md" label="Password" placeholder="Password" {...form.getInputProps('password')} />
          </Stepper.Step>
          <Stepper.Step label="Second step" description="Upload Profle Pic">
            <Upload />
          </Stepper.Step>
        </Stepper>

        <Group position="center" mt="xl">
          {active == 0 && (
            <Button onClick={signupHandler} disabled={!form.isValid()}>
              Create Account
            </Button>
          )}
          <Button onClick={nextStep}>{active === 1 ? 'Home' : 'Next step'}</Button>
        </Group>
      </Paper>
    </section>
  );
};
export default Signup;
