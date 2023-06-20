import { FAQs, Features, Herobox, Header, WhyUs } from '@/components';
import Head from 'next/head';

const index = () => {
  return (
    <div>
      <Head>
        <title>Task Management App</title>
      </Head>
      <Header />
      <Herobox />
      <Features />
      <WhyUs />
      <FAQs />
    </div>
  );
};

export default index;
