import { Space } from 'antd';

import {
  AgoraVideoPlayer,
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from './AgoraReactWrapper';

export function Videos(props: {
  users: IAgoraRTCRemoteUser[];
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
}) {
  const { users, tracks } = props;

  return (
    <div>
      <div id="videos">
        <AgoraVideoPlayer
          style={{ height: '70vh', width: '80%' }}
          className="vid"
          videoTrack={tracks[1]}
        />
        <Space className="mt-2">
          {users.length > 0 &&
            users.map((user) => {
              if (user.videoTrack) {
                return (
                  <AgoraVideoPlayer
                    style={{ height: '150px', width: '200px' }}
                    className="vid"
                    videoTrack={user.videoTrack}
                    key={user.uid}
                  />
                );
              }
              return null;
            })}{' '}
        </Space>
      </div>
    </div>
  );
}
