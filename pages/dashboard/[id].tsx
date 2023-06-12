import { DashNavbar, Dashboard, Header, Profile, Stats } from '@/components';
import { AppShell, Paper, ScrollArea } from '@mantine/core';
import { useRouter } from 'next/router';

const Box = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <AppShell
      sx={() => ({
        position: 'relative',
        '& .mantine-1682jzp': {
          width: 0,
          '@media (max-width:900px)': {
            paddingLeft: '10px',
            paddingRight: '10px',
          },
        },
      })}
      style={{ backgroundColor: '#F1EEF9' }}
      navbar={<DashNavbar />}
      header={<Header />}
    >
      <Paper
        sx={() => ({
          background: '#fff',
          maxWidth: '1100px',
          height: '85vh',
          padding: '15px',
          margin: '0 10px',
          borderRadius: '20px',
          overflow: 'hidden',
        })}
      >
        <Paper
          sx={() => ({
            background: '#fff',
            padding: '15px 0',
            margin: '0 10px',
            borderRadius: '0px',
            width: '100%',
            borderBottom: '1px solid #777777',
          })}
        >
          {id?.toString().toUpperCase()}
        </Paper>
        <ScrollArea w={'100%'} h="100%" scrollbarSize={12}>
          {id === 'home' && <Dashboard />}
          {id === 'user' && <Profile />}
          {id === 'analytics' && <Stats />}
        </ScrollArea>
      </Paper>
    </AppShell>
  );
};

export default Box;
