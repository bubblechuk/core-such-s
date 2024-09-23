import './Main.css'
import Smile from './images/smile.png'
import Thundercat from './images/thundercat.png'
export const Main = () => {
    return <div className="main">
        <div className='mainpage'>
        <div className="weekly">
            <div className="weekly__image">
            <img src={Smile}/>
            <div className="weekly__bg">
            </div>
            </div>
            <div className="weekly__header">
                <h2>Исполнитель недели</h2>
                <h1>The Smile</h1>
            </div>
            
        </div>
        <div class="genres">

        </div>
        <div class="weekly">
            <div class="weekly__image">
                <img src={Thundercat}/>
                <div className="weekly__bg" style={{background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 95%)"}}>
                </div>
            </div>
            <div className="weekly__header" style={{color: "black"}}>
                <h2>Thundercat: Apocalypse</h2>
                <h1>Издание "Ten Years Anniversary"</h1>
            </div>
        </div>
        <div className="email">
            <h1>Хотите быть в курсе событий?</h1>
            <h2>Подпишитесь на нашу рассылку по e-mail, <br/>чтобы узнавать новости <span>первым</span>!</h2>
            <div>
            <input type="email" placeholder="Ваш e-mail"/>
            <button>Подписаться</button>
            </div>
        </div>
        </div>
    </div>
}