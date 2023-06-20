import { Header, Signup } from '@/components';
import Head from 'next/head';

const index = () => {
  return (
    <div>
      <Head>
        <title>SignUp - Task Management App</title>
      </Head>
      <Header />
      <Signup />
    </div>
  );
};

export default index;
