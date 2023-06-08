import { useState } from 'react';
import classes from './styles.module.css';
import { Stepper, Button, Group, Paper, AspectRatio, TextInput, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import Upload from '../DropZone/DropZone';

const Signup = () => {
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    });
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const form = useForm({
    initialValues: {
      name: '',
      password: '',
      email: '',
      college: '',
      linkedin: '',
      profession: 'student',
    },

    validate: (values) => {
      if (active === 0) {
        return {
          name: values.name.trim().length < 1 ? 'Username is required' : null,
          password: values.password.length < 8 ? 'Password must include at least 6 characters' : null,
          email: /^\S+@\S+$/.test(values.email) ? null : 'Invalid email',
        };
      }

      return {};
    },
  });

  return (
    <section className={classes.main}>
      <div className={classes.video}>
        <video playsInline={true}>
          <source src="/assets/video.mp4" type="video/mp4" />
        </video>
      </div>
      <Paper className={classes.paper}>
        <Stepper active={active} onStepClick={setActive} breakpoint="sm">
          <Stepper.Step label="First step" description="Create an account">
            <TextInput label="Name" placeholder="Name" {...form.getInputProps('name')} />
            <TextInput mt="md" label="Email" placeholder="Email" {...form.getInputProps('email')} />
            <PasswordInput mt="md" label="Password" placeholder="Password" {...form.getInputProps('password')} />
          </Stepper.Step>
          <Stepper.Step label="Second step" description="Upload image">
            <Upload />
          </Stepper.Step>
        </Stepper>

        <Group position="center" mt="xl">
          {active !== 0 && (
            <Button variant="default" onClick={prevStep}>
              Back
            </Button>
          )}
          <Button onClick={nextStep}>{active === 1 ? 'Go to Dashboard' : 'Next step'}</Button>
        </Group>
      </Paper>
    </section>
  );
};
export default Signup;
