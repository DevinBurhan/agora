import { useEffect, useState } from 'react';

import {
  ClientConfig,
  IAgoraRTCRemoteUser,
  createClient,
  createMicrophoneAndCameraTracks,
} from './AgoraReactWrapper';
import { Controls } from './Controles';
import { Videos } from './Video';

export const agoraConfig: ClientConfig = {
  mode: 'rtc',
  codec: 'vp8',
};

const useClient = createClient(agoraConfig);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
const appId = 'eeaf0b754eaa4f13af26642c757fc7b9';
const token =
  '007eJxTYNhV3jP34Y2je8s3Cbl4Fx3xnMpx5eiBp/8k1ZjL/cMqFrIoMKSmJqYZJJmbmqQmJpqkGRonphmZmZkYJZubmqclmydZLpj+MK0hkJHBheEbCyMDBIL4/Awpqbn5uskZiXl5qTm6BkYMDABMqCR0';
const demoChannel = 'demo-channel-02';

export function VideoCall(props: {
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
  channelName: string;
}) {
  const { setInCall, channelName } = props;
  const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>([]);
  const [start, setStart] = useState<boolean>(false);
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  useEffect(() => {
    // function to initialise the SDK
    const init = async (name: string) => {
      client.on('user-published', async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === 'video') {
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        }
        if (mediaType === 'audio') {
          user.audioTrack?.play();
        }
      });

      client.on('user-unpublished', (user, type) => {
        if (type === 'audio') {
          user.audioTrack?.stop();
        }
        if (type === 'video') {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on('user-left', (user) => {
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      await client.join(appId, name, token, null);
      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);
    };

    if (ready && tracks) {
      console.log('init ready');
      init(channelName);
    }
  }, [channelName, client, ready, tracks]);

  return (
    <div className="App">
      {ready && tracks && <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />}
      {start && tracks && <Videos users={users} tracks={tracks} />}
    </div>
  );
}
