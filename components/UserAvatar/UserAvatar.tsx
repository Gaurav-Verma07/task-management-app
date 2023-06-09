import { UserDataContext } from '@/context';
import { Avatar } from '@mantine/core';
import { useContext } from 'react';

const UserAvatar = () => {
  const { userData } = useContext(UserDataContext);

  return userData.isPic ? (
    <Avatar src={userData.avatar} radius="xl" size="lg" />
  ) : (
    <Avatar radius="xl" size="lg" color={userData.color}>
      {userData?.username[0]}
    </Avatar>
  );
};
export default UserAvatar;
