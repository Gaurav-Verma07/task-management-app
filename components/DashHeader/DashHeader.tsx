import { Autocomplete, Header, Avatar } from '@mantine/core';
import { useState } from 'react';
const data = [{ value: 'React' }, { value: 'Angular' }, { value: 'Svelte' }, { value: 'Vue' }];

const DashHeader = () => {
  const [value, setValue] = useState('');
  return (
    <Header
      sx={() => ({
        background: '#F1EEF9',
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
      })}
      height="70"
    >
      {/* <Flex> */}
      <Autocomplete
        sx={() => ({
          width: '80%',
          borderRadius: 30,
          margin: '0 auto',
          '& .mantine-gszoqu': {
            height: '44px !important',
            borderRadius: '23px',
          },
          '@media (min-width:700px)': {
            width: '600px',
          },
        })}
        value={value}
        onChange={setValue}
        placeholder="Search tasks..."
        transitionProps={{ transition: 'pop-top-left', duration: 80, timingFunction: 'ease' }}
        data={data}
      />
      <Avatar
        sx={() => ({
          margin: '0 auto',
        })}
        radius="xl"
        size="lg"
        color="green"
      >
        G
      </Avatar>
      {/* </Flex> */}
    </Header>
  );
};
export default DashHeader;
