import { ClientConfig, ICameraVideoTrack, IMicrophoneAudioTrack } from 'agora-rtc-sdk-ng';
import { Button, Space } from 'antd';
import { useState } from 'react';

import { createClient } from './AgoraReactWrapper';

export const agoraConfig: ClientConfig = {
  mode: 'rtc',
  codec: 'vp8',
};

const useClient = createClient(agoraConfig);

export function Controls(props: {
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const client = useClient();
  const { tracks, setStart, setInCall } = props;
  const [trackState, setTrackState] = useState({ video: true, audio: true });

  const mute = async (type: 'audio' | 'video') => {
    if (type === 'audio') {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === 'video') {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    // we close the tracks to perform cleanup
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setInCall(false);
  };

  return (
    <div className="controls mb-4">
      <Space>
        <Button className={trackState.audio ? 'on' : ''} onClick={() => mute('audio')}>
          {trackState.audio ? 'MuteAudio' : 'UnmuteAudio'}
        </Button>
        <Button className={trackState.video ? 'on' : ''} onClick={() => mute('video')}>
          {trackState.video ? 'MuteVideo' : 'UnmuteVideo'}
        </Button>
        <Button type="primary" onClick={() => leaveChannel()}>
          Leave
        </Button>
      </Space>
    </div>
  );
}
