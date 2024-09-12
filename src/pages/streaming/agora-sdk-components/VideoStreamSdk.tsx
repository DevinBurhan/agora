import {
  LocalUser,
  RemoteUser,
  useIsConnected,
  useJoin,
  useLocalMicrophoneTrack,
  useLocalCameraTrack,
  usePublish,
  useRemoteUsers,
} from 'agora-rtc-react';
import { Button, Input, Space } from 'antd';
import React, { useState } from 'react';

import { Iconify } from '@/components/icon';

import './style.css';

const AppId = 'eeaf0b754eaa4f13af26642c757fc7b9';
const Token =
  '007eJxTYNhV3jP34Y2je8s3Cbl4Fx3xnMpx5eiBp/8k1ZjL/cMqFrIoMKSmJqYZJJmbmqQmJpqkGRonphmZmZkYJZubmqclmydZLpj+MK0hkJHBheEbCyMDBIL4/Awpqbn5uskZiXl5qTm6BkYMDABMqCR0';

function VideoStreamSdk() {
  const [calling, setCalling] = useState(false);
  const isConnected = useIsConnected();
  const [appId, setAppId] = useState('');
  const [channel, setChannel] = useState('');
  const [token, setToken] = useState('');

  useJoin({ appid: appId, channel, token: token || null }, calling);

  // local user
  const [micOn, setMic] = useState(true);
  const [cameraOn, setCamera] = useState(true);
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);
  usePublish([localMicrophoneTrack, localCameraTrack]);
  const remoteUsers = useRemoteUsers();

  return (
    <div>
      <div className="room">
        {isConnected ? (
          <div className="user-list">
            <div className="user">
              <LocalUser
                audioTrack={localMicrophoneTrack}
                cameraOn={cameraOn}
                micOn={micOn}
                videoTrack={localCameraTrack}
                cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
              >
                <samp className="user-name">You</samp>
              </LocalUser>
            </div>
            {remoteUsers.map((user) => (
              <div className="user" key={user.uid}>
                <RemoteUser
                  cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
                  user={user}
                >
                  <samp className="user-name">{user.uid}</samp>
                </RemoteUser>
              </div>
            ))}
          </div>
        ) : (
          <div className="join-room">
            <Space
              direction="vertical"
              size="middle"
              style={{ width: '50%', display: 'flex', margin: '30px auto' }}
            >
              {' '}
              <Space>
                <Iconify icon="heroicons-solid:exclaimation-circle" size={23} color="grey" />
                <p className="text-gray-600">
                  Enter channel name/url
                  <i>
                    {' '}
                    <b>demo-channel-02</b>
                  </i>{' '}
                  (testing channel) to join video call
                </p>
              </Space>
              <Input
                onChange={(e) => setChannel(e.target.value)}
                placeholder="Your channel/url name"
                value={channel}
              />
              <Button
                type="primary"
                className={`join-channel ${!appId || !channel ? 'disabled' : ''}`}
                disabled={!channel}
                onClick={() => {
                  setAppId(AppId);
                  setToken(Token);
                  setCalling(true);
                }}
              >
                <span>Join Channel</span>
              </Button>
            </Space>
          </div>
        )}
      </div>
      {isConnected && (
        <div className="control">
          <div className="left-control">
            <button className="btn" onClick={() => setMic((a) => !a)}>
              <i className={`i-microphone ${!micOn ? 'off' : ''}`} />
            </button>
            <button className="btn" onClick={() => setCamera((a) => !a)}>
              <i className={`i-camera ${!cameraOn ? 'off' : ''}`} />
            </button>
          </div>
          <button
            className={`btn btn-phone ${calling ? 'btn-phone-active' : ''}`}
            onClick={() => {
              setCalling((a) => !a);
              setChannel('');
            }}
          >
            {calling ? <i className="i-phone-hangup" /> : <i className="i-mdi-phone" />}
          </button>
        </div>
      )}
    </div>
  );
}

export default VideoStreamSdk;
