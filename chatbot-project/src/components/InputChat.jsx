import { useState } from 'react'
import { Chatbot } from 'supersimpledev'
import LoadingSpinnerImage from '../assets/loading-spinner.gif'
import './InputChat.css'
import dayjs from 'dayjs'

function InputChat({chatMessages, setChatMessages, isLoading, setIsLoading, isButtonTop, setIsButtonTop}) {
  const [inputValue, setInputValue] = useState('');

  function textInput(event) {
    // console.log(event.target.value);
    setInputValue(event.target.value);
  }

  async function sendMessage() {
    // alert("You sent: " + inputValue);
    
    setInputValue('');
    if (inputValue.trim() === '' || isLoading) {
      return;
    }
    setIsLoading(true);
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputValue,
        role: "user",
        id: crypto.randomUUID(),
        time: dayjs().valueOf(),
      }
    ]
    // setChatMessages(newChatMessages);
    setChatMessages([
      ...newChatMessages,
      {
        message: <img className="img-loading" src={LoadingSpinnerImage} />,
        role: "robot",
        id: crypto.randomUUID(),
      }
    ]);

    // const response = Chatbot.getResponse(inputValue);
    const response = await Chatbot.getResponseAsync(inputValue);
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        role: "robot",
        id: crypto.randomUUID(),
        time: dayjs().valueOf(),
      }
    ]);
    // setInputValue('');
    setIsLoading(false);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      sendMessage();
    } else if (event.key === 'Escape') {
      setInputValue('');
    }
  }

  function clearMessage() {
    localStorage.removeItem('chatMessages');
    setChatMessages([]);
  }

  function textboxRun() {
    const inputChatElem = document.querySelector('.container-input-and-buttons');
    const chatMessagesElem = document.querySelector('.chat-messages-container');
    if (!isButtonTop) {
      inputChatElem.classList.add('top-textbox');
      chatMessagesElem.classList.add('mt');
      setIsButtonTop(true);
    } else {
      inputChatElem.classList.remove('top-textbox');
      chatMessagesElem.classList.remove('mt');
      setIsButtonTop(false);
    }
  }

  return (
    <div className="chat-input-container">
      <div className="container-input-and-buttons top-textbox">
        <input 
          type="text" 
          onChange={textInput} 
          value={inputValue} 
          placeholder="Send a message to Chatbot" 
          size="30" 
          onKeyDown={handleKeyDown}
          className="chat-input" 
        />
        <button 
          onClick={sendMessage}
          className="chat-send-button"
        >Send
        </button>
        <button 
          onClick={clearMessage}
          className="clear-button"
        >Clear
        </button>
      </div>
      <div className="">
        <p 
          className='btn-move-textbox'
          onClick={textboxRun}
        >
          Move textbox to {isButtonTop ? 'bottom' : 'top'}
        </p>
      </div>
    </div>
  );
}

export default InputChat;