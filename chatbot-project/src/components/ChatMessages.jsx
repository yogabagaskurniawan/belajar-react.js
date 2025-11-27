import { useRef, useEffect } from 'react'
import ChatMessage from './ChatMessage'
import './ChatMessages.css'

function ChatMessages({chatMessages, isButtonTop}) {
  // useRef untuk mendapatkan referensi elemen DOM
  const chatMessageRef = useRef(null);
// function useAutoScroll(dependencies) {
//   const containerRef = useRef(null);
  // useEffect untuk menjalankan efek samping setelah render
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
    // console.log('updated');
    // console.log(chatMessageRef.current);
    const chatMessagesElem = chatMessageRef.current;
    // const chatMessagesElem = containerRef.current;
    if (chatMessagesElem) {
      chatMessagesElem.scrollTop = chatMessagesElem.scrollHeight;
    }
//   }, dependencies);
//   return containerRef;
  }, [chatMessages, isButtonTop]);

// function ChatMessages({ chatMessages }) {
  // const chatMessageRef = useAutoScroll([chatMessages]);
  return (
    <div ref={chatMessageRef} className="chat-messages-container mt">
      {(chatMessages.length === 0) && <p className="title">Welcome to the chatbot project! Send a message using the textbox below</p>}
      {chatMessages.map((chatMessage) => (
        <ChatMessage 
          message={chatMessage.message} 
          role={chatMessage.role} 
          key={chatMessage.id} 
          time={chatMessage.time}
        />
      ))}
    </div>
  )
}

// export default {ChatMessages, useAutoScroll};
export default ChatMessages;
