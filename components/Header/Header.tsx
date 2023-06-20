import Image from 'next/image';
import classes from './styles.module.css';
import Link from 'next/link';
import clsx from 'clsx';
import { ReactElement, useContext, useState } from 'react';
import Login from '../Login/Login';
import { Avatar, Menu, Tooltip } from '@mantine/core';
import { account, storage } from '@/services/appwriteConfig';
import { useRouter } from 'next/router';
import { ModalContext, UserDataContext } from '@/context';
import { toast } from 'react-toastify';
import { config } from '@/services/config';
const Header = () => {
  const { isModal, setIsModal } = useContext(ModalContext);
  const { userData, setUserData } = useContext(UserDataContext);
  const router = useRouter();
  const logoutHandler = () => {
    account
      .deleteSession('current')
      .then((res) => {
        setUserData((prev) => ({ ...prev, isLoggedIn: false }));
        router.push('/');
        localStorage.removeItem('userId');
      })
      .catch((err) => toast.error(err.message));
  };

  const dashboardHandler = () => {
    router.push('/dashboard/home');
  };
  const profilePic:any=storage.getFilePreview(config.NEXT_PUBLIC_BUCKET_ID, userData.userId);


  return (
    <section className={classes.main}>
      <Link href="/" className={classes.logo}>
        <Image src="/assets/Navbar/ProTASK.svg" fill alt="logo" />
      </Link>
      <div className={classes.navlinks}>
        {userData.isLoggedIn ? (
          <Menu
            trigger="hover"
            openDelay={100}
            closeDelay={100}
            transitionProps={{ transition: 'rotate-right', duration: 150 }}
            withArrow
          >
            <Menu.Target>
              {userData.isPic ? (
                <Avatar src={profilePic} radius="xl" size="lg" />
              ) : (
                <Avatar
                  radius="xl"
                  size="lg"
                  sx={() => ({
                    border: `1px solid ${userData.color}`,
                  })}
                  color={userData.color}
                >
                  {userData?.username[0].toUpperCase()}
                </Avatar>
              )}
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>{userData.username}</Menu.Label>
              <Menu.Item onClick={dashboardHandler}>Dashboard</Menu.Item>
              <Menu.Item onClick={logoutHandler}>Logout</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ) : (
          <Tooltip label="Login" color="grey" withArrow>
            <Avatar
              radius="xl"
              size="lg"
              sx={() => ({
                cursor: 'pointer',
              })}
              onClick={() => {
                setIsModal({ ...isModal, isOpen: true, isLogging: true });
              }}
            />
          </Tooltip>
        )}
      </div>
      {isModal.isLogging && <Login />}
    </section>
  );
};

export default Header;
