import Message from "./Message.jsx"
import "./chat.css"

function MessageList({messages}){



    return(
        <div className="message-list">
            {
                messages.map(message => (

                    <Message

                        content={message.content}

                        from={message.sender}

                    />

                ))
            }

        </div>    
    )
        
}
export default MessageList