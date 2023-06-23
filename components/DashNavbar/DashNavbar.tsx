import { useContext, useState } from 'react';
import { Navbar, Center, Tooltip, UnstyledButton, createStyles, Stack, rem } from '@mantine/core';
import {
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
  IconLogout,
  IconSwitchHorizontal,
} from '@tabler/icons-react';
import Link from 'next/link';
import { UserDataContext } from '@/context';
import { useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
  link: {
    width: rem(50),
    height: rem(50),
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.white,
    opacity: 0.85,
    margin: '5px 0',
    '&:hover': {
      opacity: 1,
      backgroundColor: 'rgba(255, 255, 255, .2)',
    },
  },

  active: {
    opacity: 1,
    '&, &:hover': {
      backgroundColor: 'rgba(255, 255, 255, .2)',
    },
  },
}));

interface NavbarLinkProps {
  to: string;
  icon: React.FC<any>;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick, to }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Link href={to}>
      <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
        <UnstyledButton onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
          <Icon size="1.2rem" stroke={1.5} />
        </UnstyledButton>
      </Tooltip>
    </Link>
  );
}

const mockdata = [
  { icon: IconHome2, label: 'Home', to: '/dashboard/home' },
  { icon: IconDeviceDesktopAnalytics, label: 'Analytics', to: '/dashboard/analytics' },
  // { icon: IconUser, label: 'Account', to: '/dashboard/user' },
];

const DashNavbar = () => {
  const [active, setActive] = useState(0);
  const { setUserData } = useContext(UserDataContext);
  const router = useRouter();

  const links = mockdata.map((link, index) => (
    <NavbarLink {...link} key={link.label} active={index === active} onClick={() => setActive(index)} />
  ));

  const logoutHandler = () => {
    setUserData((prev) => ({
      userId: '',
      username: '',
      email: '',
      color: '',
      isLoggedIn: false,
      isPic: false,
    }));
    router.push('/');
  };

  return (
    <Navbar
      width={{ base: 80 }}
      p="md"
      sx={() => ({
        position: 'relative',
        zIndex: 100,
        background:
          'linear-gradient(180deg, rgba(81, 0, 255, 1) 36.87%, rgba(81, 0, 255, 0.9) 56.67%, rgba(81, 0, 255, 0.9) 97.29%)',
      })}
    >
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={30}>
          <Tooltip label="Log Out" position="right" transitionProps={{ duration: 0 }}>
            <IconLogout color="#fff" onClick={logoutHandler} />
          </Tooltip>
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
};

export default DashNavbar;
