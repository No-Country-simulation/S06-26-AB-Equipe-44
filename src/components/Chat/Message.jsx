import "./chat.css"
function Message({content, from}) {
    
    return(
        <div>
            <section className={`message ${from}`}>
                
                <p>{content}</p>

            </section>
        </div>
    )

}
export default Message