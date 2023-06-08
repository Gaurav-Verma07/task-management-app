import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import { useContext } from 'react';
import LoginContext from '@/context/loginContext';

const ModalBox = ({ children, title }: any) => {
  const [opened, { open, close }] = useDisclosure(true);
  const { setIsLogging, isLogging } = useContext(LoginContext);
  console.log({open, isLogging})
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          close();
          setIsLogging(false);
        }}
        sx={() => ({
          // background: '#F1EEF9',
          // padding: '15px',
          // display: 'flex',
          // justifyContent: 'space-between',
          '& .mantine-kea9ny':{
            backgroundColor:'rgba(0, 0, 0, .3)'
          }
        })}
  
        title={title}
        centered
      >
        {children}
      </Modal>
    </>
  );
};

export default ModalBox;
