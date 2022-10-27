import {useState, useEffect, useCallback} from "react"
import io from "socket.io-client"
import {nanoid} from "nanoid"

import Chat from "./components/Chat/Chat";
import ChatForm from "./components/ChatForm/ChatForm";
import SigninChatForm from "./components/SigninChatForm/SigninChatForm";

import './App.css';

const socket = io.connect("http://localhost:5000");

function App() {

  const [nickname, setNickname] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(()=> {
    // socket.on("connect", ()=> {
    //   console.log("Connect success");
    // })
    socket.on("chat-message", (message)=> {
      setMessages(prevMessages => {
        const newMessage = {
          id: nanoid(),
          type: "user",
          message,
        };
  
        return [...prevMessages, newMessage]
      });
    });
  }, [])

  const addNickname = useCallback(({name}) => setNickname(name), []);

  const addMessage = ({message}) => {
    setMessages(prevMessages => {
      const newMessage = {
        id: nanoid(),
        type: "you",
        message,
      };

      return [...prevMessages, newMessage]
    });

    socket.emit("chat-message", message)
  }
 

  return (
    <div className="App">
      {!nickname && <SigninChatForm onSubmit={addNickname}  />}
      {nickname && <ChatForm onSubmit={addMessage} />}
      {nickname && <Chat items={messages} />}
    </div>
  )
}

export default App;
