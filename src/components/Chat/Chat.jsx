import React, {useState, useEffect} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import { useLocation } from 'react-router-dom'; 

import "./Chat.css"

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages'

let socket; 

const Chat = () => {

  const [name, setName] = useState("")
  const [room, setRoom] = useState("")

  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState("")

  const ENDPOINT = "https://react-chat-app-eosin.vercel.app"

  const location = useLocation()

  useEffect(() => {
    const {name, room} = queryString.parse(location.search)

    socket = io(ENDPOINT, {
      transports: ['websocket'], // Force WebSocket
      secure: true,
    })
     
    setName(name)
    setRoom(room)

    socket.emit("join", {name, room})

    return () => {
      socket.off()
      socket.disconnect()
    }

  }, [ENDPOINT, location.search])

  useEffect(() => {

    socket.on("message", (message) => {
      setMessages([...messages, message])
    })

  }, [messages])

  const sendMessage = (event) => {
    event.preventDefault()

    if(message) {
      socket.emit("sendMessage", message)
      setMessage("")
    } 
  }
  
  return (
    <div className="outerContainer">
    <div className="container">
      <InfoBar room = {room} />
          <Messages messages={messages} name={name}/>
         <Input setMessage={setMessage} sendMessage={sendMessage} message={message}/>
    </div>
  </div>  
  )
}

export default Chat