import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import { useContext } from 'react';
import ModalContext from '@/context/modalContext';

const ModalBox = ({ children, title }: any) => {
  const [opened, { open, close }] = useDisclosure(true);
  const { setIsModal } = useContext(ModalContext);
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          close();
          setIsModal((prev) => ({ ...prev, isCard: false, isLogging: false }));
        }}
        sx={() => ({
          '& .mantine-kea9ny': {
            backgroundColor: 'rgba(0, 0, 0, .1)',
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
