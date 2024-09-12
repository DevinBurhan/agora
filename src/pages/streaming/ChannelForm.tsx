import { Button, Input, Space } from 'antd';

// const { AGORA_TOKEN: token } = import.meta.env;
// console.log('🚀 ~ appId:', appId);
const appId = 'eeaf0b754eaa4f13af26642c757fc7b9';
const token =
  '007eJxTYLDYNPHtKdvSG3mrj/PYuHVPOy11aN7/H38m9skohwaGrfymwJCamphmkGRuapKamGiSZmicmGZkZmZilGxuap6WbJ5kySv6IK0hkJEht7SOmZEBAkF8HoaU1Nx83eSMxLy81BwGBgASfiQ7';
export function ChannelForm(props: {
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
  setChannelName: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { setInCall, setChannelName } = props;

  return (
    <form className="join">
      {/* {appId === '' && (
        <p style={{ color: 'red' }}>
          Please enter your Agora App ID in App.tsx and refresh the page
        </p>
      )} */}
      <Space>
        <Input placeholder="Enter Channel Name" onChange={(e) => setChannelName(e.target.value)} />
        <Button
          type="primary"
          onClick={(e) => {
            e.preventDefault();
            setInCall(true);
          }}
        >
          Join
        </Button>
      </Space>
    </form>
  );
}
