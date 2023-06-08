import { useState } from 'react';
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
  //   { icon: IconGauge, label: 'Dashboard' },
  { icon: IconDeviceDesktopAnalytics, label: 'Analytics', to: '/dashboard/analytics' },
  //   { icon: IconCalendarStats, label: 'Releases' },
  { icon: IconUser, label: 'Account', to: '/dashboard/user' },
  //   { icon: IconFingerprint, label: 'Security' },
  //   { icon: IconSettings, label: 'Settings' },
];

const DashNavbar = () => {
  const [active, setActive] = useState(2);

  const links = mockdata.map((link, index) => (
    <NavbarLink {...link} key={link.label} active={index === active} onClick={() => setActive(index)} />
  ));

  return (
    <Navbar
      width={{ base: 80 }}
      p="md"
      sx={() => ({
        position: 'relative',
        zIndex: 100,
        background:
          'linear-gradient(180deg, rgba(81, 0, 255, 0.75) 36.87%, rgba(80, 0, 250, 0.5475) 56.67%, rgba(85, 9, 247, 0.75) 97.29%)',
        borderRadius: '10px 10px 0 0',
      })}
    >
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          <NavbarLink to="/dashboard/switch" icon={IconSwitchHorizontal} label="Change account" />
          <NavbarLink to="/dashboard/logout" icon={IconLogout} label="Logout" />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
};

export default DashNavbar;
