import AgoraRTC, { AgoraRTCProvider } from 'agora-rtc-react';
import { Button, Card } from 'antd';
import React, { useState } from 'react';

import { useRouter } from '@/router/hooks';

import VideoStreamSdk from '../agora-sdk-components/VideoStreamSdk';

const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

function JoinVideoStreaming() {
  const [change, setChange] = useState(false);
  const { push } = useRouter();
  const [channelName, setChannelName] = useState('');
  const [inCall, setInCall] = useState(false);

  return (
    <Card
      title="Video Stream Page"
      extra={
        <Button type="primary" onClick={() => push(`/streaming`)} disabled={change}>
          Back
        </Button>
      }
    >
      {/* vudeo calling using agora react ng */}
      {/* <h1 className="heading mb-4">Agora RTC NG SDK React Wrapper</h1>
      {inCall ? (
        <VideoCall setInCall={setInCall} channelName={channelName} />
      ) : (
        <ChannelForm setInCall={setInCall} setChannelName={setChannelName} />
      )} */}

      {/* live streaming using agora uikit */}
      {/* <UiKItVideoStream setChange={setChange} change={change} /> */}
      <AgoraRTCProvider client={client}>
        <VideoStreamSdk />
      </AgoraRTCProvider>
    </Card>
  );
}

export default JoinVideoStreaming;
