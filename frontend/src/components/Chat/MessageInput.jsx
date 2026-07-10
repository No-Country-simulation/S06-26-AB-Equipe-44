import { useState } from "react"
import "./chat.css"

function MessageInput({onSend, messageList}) {

    const [text, setText] = useState("");

    return(
        <div>

            <section className="section-input">
                <button 
                    
                    type="button" 
                    
                    className="button-clean-message"

                    onClick={() => messageList([])}
                    
                    >🗑️</button>
                <input type="text" 
                    name="mensagem" 
                    className="input"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button
                    
                    onClick={() =>{ 
                        if(text.trim() === "") return; 
                        onSend(text); 
                        setText("");
                    }}

                    className="button-send"
                >Send</button>
            </section>

        </div>
    )

}

export default MessageInput