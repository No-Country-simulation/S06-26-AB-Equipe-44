import { useState } from "react"
import ChatHeader from "./ChatHeader.jsx"
import MessageList from "./MessageList.jsx"
import MessageInput from "./MessageInput.jsx"



function Chat({pagina, setPagina}){
    const [messages, setMessages] = useState([]);
    
    function sendMessages(text){
        setMessages(prev => [
            ...prev,
            {
                sender: "user",
                content: text
            }

        ]);
    }


    return(
        <div className="chat-container">

            <ChatHeader
                setPagina={setPagina}
            />
            <MessageList
                messages={messages}
            />
            <MessageInput
                onSend={sendMessages}
                messageList={() => setMessages([])}
            />

        </div>
    )

}

export default Chat