import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import { useContext } from 'react';
import LoginContext from '@/context/modalContext';

const ModalBox = ({ children, title }: any) => {
  const [opened, { open, close }] = useDisclosure(true);
  const { setIsOpen } = useContext(LoginContext);
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          close();
          setIsOpen(false);
        }}
        sx={() => ({
          '& .mantine-kea9ny': {
            backgroundColor: 'rgba(0, 0, 0, .3)',
          },
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
