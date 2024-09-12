import { useUserInfo } from '@/store/authStore';

import AgoraUIKit, { layout } from 'agora-react-uikit';
import 'agora-react-uikit/dist/index.css';
import { Button, Form, Input } from 'antd';
import React, { CSSProperties, useEffect, useState } from 'react';

const demoChannel = 'demo-channel-02';
const appID = 'eeaf0b754eaa4f13af26642c757fc7b9';
const Token =
  '007eJxTYNhV3jP34Y2je8s3Cbl4Fx3xnMpx5eiBp/8k1ZjL/cMqFrIoMKSmJqYZJJmbmqQmJpqkGRonphmZmZkYJZubmqclmydZLpj+MK0hkJHBheEbCyMDBIL4/Awpqbn5uskZiXl5qTm6BkYMDABMqCR0';

function getRandomThreeDigitNugmber() {
  return Math.floor(100 + Math.random() * 900);
}

export function UiKItVideoStream(props: {
  setChange: React.Dispatch<React.SetStateAction<boolean>>;
  change: boolean;
}) {
  const { setChange, change } = props;
  const [videocall, setVideocall] = useState(false);
  const [username, setUsername] = useState('');
  const [tokenVal, setTokenVal] = useState('');
  const getUserId = getRandomThreeDigitNugmber();
  const { firstName, lastName, organisationId, role, id: userId } = useUserInfo();

  const Payload = {
    uid: getUserId,
    channel_name: demoChannel,
    role: role === 'user' ? 'subscriber' : 'publisher',
  };

  // const handleJoinRoom = (val) => {
  //   setTokenVal(val);
  // };

  // const { mutate: tokenMutate } = useGetAgoraToken(handleJoinRoom);

  useEffect(() => {
    setChange(videocall);
  }, [videocall, setChange]);

  useEffect(() => {
    if (organisationId === null || organisationId === undefined) {
      setUsername('Admin');
    } else if (firstName && firstName !== '' && organisationId) {
      setUsername(`${firstName} ${lastName}`);
    } else {
      setUsername(organisationId?.name);
    }
  }, [firstName, lastName, organisationId]);

  // useEffect(() => {
  //   if (tokenVal !== '') {
  //     setTimeout(() => {
  //       setVideocall(true);
  //     }, 100);
  //   }
  // }, [tokenVal]);

  return (
    <div style={styles.container}>
      <div style={styles.videoContainer}>
        {videocall ? (
          <AgoraUIKit
            rtcProps={{
              appId: appID,
              channel: demoChannel,
              token: Token,
              // uid: getUserId,
              role: role === 'user' ? 'audience' : 'host',
              layout: layout.grid,
              enableScreensharing: true,
            }}
            styleProps={{
              usernameText: {
                color: '#33ff75',
                background: '#3a3a3abd',
                borderTopLeftRadius: '2px',
                borderTopRightRadius: '2px',
              },
              localBtnContainer: { background: '#00a76f' },
              popUpContainer: {
                background: 'rgb(29 29 29 / 74%)',
                color: '#ffffff',
                height: '100px',
                borderRadius: '6px',
              },
              iconSize: 18,
            }}
            rtmProps={{ username: username || 'user', displayUsername: true }}
            callbacks={{
              EndCall: () => setVideocall(false),
            }}
          />
        ) : (
          <Form>
            {' '}
            <center className="m-3">
              <p>
                Join as a <b>{username}</b> or change your username
              </p>
            </center>
            <div style={styles.nav}>
              <Form.Item label="User Name">
                <Input
                  style={styles.input}
                  placeholder="Enter User name"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </Form.Item>{' '}
              <Button
                type="primary"
                onClick={async () => {
                  // await tokenMutate({ payload: Payload });
                  setVideocall(true);
                }}
              >
                Join Call
              </Button>
            </div>
          </Form>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: '60%',
    margin: 'auto',
    height: '60vh',
    display: 'flex',
    flex: 1,
    backgroundColor: '#b6b6b621',
  },
  heading: { textAlign: 'center' as const, fontWeight: 600, margin: '14px' },
  videoContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  } as CSSProperties,
  nav: { display: 'flex', justifyContent: 'space-around', margin: '20px 0' },
  btn: {
    backgroundColor: '#007bff',
    cursor: 'pointer',
    borderRadius: 5,
    padding: '4px 8px',
    color: '#ffffff',
    fontSize: 20,
  },
  input: { display: 'flex', height: 34, alignSelf: 'center', width: '200px' } as CSSProperties,
};
