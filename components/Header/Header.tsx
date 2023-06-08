import Image from 'next/image';
import classes from './styles.module.css';
import Link from 'next/link';
import clsx from 'clsx';
import { useContext, useState } from 'react';
import Login from '../Login/Login';
import LoginContext from '@/context/loginContext';
const Header = () => {
  const { isLogging, setIsLogging } = useContext(LoginContext);
  return (
    <section className={classes.main}>
      <Link href="/" className={classes.logo}>
        <Image src="/assets/Navbar/ProTASK.svg" fill alt="logo" />
      </Link>
      <div className={classes.navlinks}>
        <button
          className={clsx(classes.btn)}
          onClick={() => {
            setIsLogging(true);
          }}
        >
          Login
        </button>
        <Link href="/signup" className={clsx(classes.btn, classes.signup)}>
          {' '}
          Get Started{' '}
        </Link>
      </div>
      {isLogging && <Login />}
    </section>
  );
};

export default Header;
