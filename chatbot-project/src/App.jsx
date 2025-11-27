import { useState, useEffect } from 'react'
import InputChat from './components/InputChat'
import ChatMessages from './components/ChatMessages'
import { Chatbot } from 'supersimpledev'
import './App.css'

function App() {
  // useState untuk menyimpan state chatMessages
  const [chatMessages, setChatMessages] = useState(
    JSON.parse(localStorage.getItem('chatMessages')) ||
    [
    /*{
      message: "Hello chatbot",
      role: "user",
      id: 'id1'
    },
    {
      message: "Hello! how can I help you?",
      role: "robot",
      id: 'id2'
    },
    {
      message: "Can you get me today date?",
      role: "user",
      id: 'id3'
    },
    {
      message: "Today is November 21",
      role: "robot",
      id: 'id4'
    }*/
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonTop, setIsButtonTop] = useState(true);

  useEffect(() => {
    // console.log("InputChat component mounted");
    Chatbot.addResponses({
      'Namamu siapa?': 'Saya adalah Chatbot dari Super Simple Dev.',
      'Kamu dari mana?' : tanggapanChatBot(),
    });
  }, []);

  function tanggapanChatBot() {
    return 'Saya berasal dari dunia digital, diciptakan untuk membantu Anda!';
  }

  return (
    <div className="container-app">
      <ChatMessages 
        chatMessages={chatMessages} 
        isButtonTop={isButtonTop}
      />
      <InputChat 
        chatMessages={chatMessages} 
        setChatMessages={setChatMessages} 
        isLoading={isLoading} 
        setIsLoading={setIsLoading} 
        isButtonTop={isButtonTop}
        setIsButtonTop={setIsButtonTop}
      />
    </div>
  )
}

export default App
