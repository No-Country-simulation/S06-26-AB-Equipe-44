import "./chat.css"
import Logo from "../../assets/icons_projeto_B2G/icon_orivis.png";


function ChatHeader({setPagina}) {
    
    return(
        <div>
                <header className='header'>
                    <section className='section-name-mark'>
                        <img src={Logo} alt="" />
                      <h2 className='name-mark'>Orivis IA</h2>
                      <p className="from">App BiT B2G</p>
                    </section>  
                      <section className='section-button-header'>

                      <button className="menu-item" onClick={() => setPagina("configurações")}>
                          Definições
                      </button>

                      <button className="menu-item" onClick={() => setPagina("geo")}>
                          Map
                      </button>

                    </section>

                  </header>

        </div>
    )
}

export default ChatHeader