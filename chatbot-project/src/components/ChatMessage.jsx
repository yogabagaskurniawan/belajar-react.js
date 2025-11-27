import RobotImage from '../assets/robot.png'
import UserImage from '../assets/profile-1.jpg'
import './ChatMessage.css'
import dayjs from 'dayjs'

function ChatMessage({message, role, time}) {
  // console.log({UserImage});
  // const message = props.message;
  // const role = props.role;
  // const {message, role} = props;

  /*
  if (role === 'robot') {
    return (
      <div>
        <img src="robot.png" width="50" />
        {message}
      </div>
    );
  }
  */

  // Guard operator (&&)
  // jika role === 'robot' bernilai true, maka bagian setelah && akan dieksekusi
  return (
    <div className={(role === 'user') ? 'user-message' : 'robot-message'}>
      {(role === 'robot') && <img src={RobotImage} />}
      <div className="chat-message-box">
        {message}
        <div className="chat-message-time">
          {dayjs(time).format('HH:mm')}
        </div>
      </div>
      {(role === 'user') && <img src={UserImage} />}
    </div>
  );
}

export default ChatMessage;