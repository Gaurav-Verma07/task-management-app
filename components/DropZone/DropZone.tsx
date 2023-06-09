import { Group, Text, useMantineTheme, rem, Image, Button, Paper } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useContext, useState } from 'react';
import classes from './styles.module.css';
import { db, storage } from '@/services/appwriteConfig';
import { toast } from 'react-toastify';
import { UserDataContext } from '@/context';

const Upload = (props: Partial<DropzoneProps>) => {
  const theme = useMantineTheme();
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const { userData, setUserData } = useContext(UserDataContext);
  const [isUploaded, setIsUploaded] = useState(false);
  // const id = uniqueId;

  const uploadImageHandler = async (file: any) => {
    try {
      if (!isUploaded) {
        const data = await storage.createFile('6481ca77cc63dcae7209', userData.userId, file);
        console.log({ data });
        const docData = await db.updateDocument('6481cad1448109f73920', '6481cada40114c73e2c1', userData.userId, {
          isPic: true,
        });
        setIsUploaded(true);
      } else {
        const updatedData = await storage.updateFile('6481ca77cc63dcae7209', userData.userId, file);
        console.log({ updatedData });
      }
      setUserData((prev) => ({ ...prev, isPic: true }));
      toast.info('Profile image updated');
    } catch (err: any) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Paper
        sx={() => ({
          display: 'flex',
          alignItems: 'center',
        })}
        key={index}
      >
        <Image
          className={classes.preview}
          src={imageUrl}
          imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
          alt="profile pic"
        />
        <Button
          onClick={() => uploadImageHandler(file)}
          variant="outline"
          color="grape"
          radius="xl"
          size="xs"
          uppercase
        >
          Upload
        </Button>
      </Paper>
    );
  });
  return (
    <div>
      <Dropzone
        maxFiles={1}
        onDrop={setFiles}
        onReject={(files) => console.log('rejected files', files)}
        maxSize={3 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        {...props}
      >
        <Group position="center" spacing="xl" style={{ minHeight: rem(100), pointerEvents: 'none' }}>
          <Dropzone.Accept>
            <IconUpload
              size="3.2rem"
              stroke={1.5}
              color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX size="3.2rem" stroke={1.5} color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]} />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto size="3.2rem" stroke={1.5} />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drag images here or click to select files
            </Text>
            <Text size="sm" color="dimmed" inline mt={7}>
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </div>
        </Group>
      </Dropzone>
      {previews}
      {/* <Image src={storage.getFilePreview('6481ca77cc63dcae7209', userData.userId)} alt='pic' /> */}
    </div>
  );
};

export default Upload;
