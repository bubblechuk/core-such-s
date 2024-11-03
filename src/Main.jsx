import './Main.css'
import Smile from './images/smile.png'
import Thundercat from './images/thundercat.png'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';
export const Main = () => {
    const list = useSelector(state => state.catalog.catalog);
    const [emailsend, setEmail] = useState('');
    async function handleEmail(data) {
        console.log("Sending email with data:", data); 
        try {
          const response = await fetch('http://localhost:5000/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                { 
                    email: data.trim(),
                    subject: "Магазин винила Septima",
                    message: "Привет! Спасибо что подписались на нашу рассылку! Давайте быть в курсе событий вместе! Ваш магазин пластинок, Septima."
                }
            )
          });
          const result = await response.json();
          alert(result.message);
        } catch (error) {
          console.error('Error in handleEmail:', error);
          alert('Failed to send email');
        }
      }
    return <div className="main">
        <div className='mainpage'>
        <div className="weekly">
            <div className="weekly__image">
            <img alt="smilegroup" src={Smile}/>
            <div className="weekly__bg">
            </div>
            <div className="weekly__header">
                <h2>Исполнитель недели</h2>
                <h1>The Smile</h1>
            </div>
            </div>
            
            
        </div>
        <h2 id="newh2">Новинки в нашем магазине: </h2>
        <div class="newbies">
            {list.map((elem, index) => {
                if(index > 2) return null;
                return (
                        <div className="catalog__element" key={elem.id}>
                            <Link to={`/product?name=${elem.title}`} className='link'><img src={elem.imageUrl} alt={elem.title} /></Link>
                            <div className='catalog__title'>
                                <div className='catalog__name'>
                                    <Link to={`/product?name=${elem.title}`} className='link'>
                                        <h1>{elem.title}</h1>
                                    </Link>
                                    <h3>{elem.artist}</h3>
                                </div>
                            </div>
                        </div>
                    )})}
        </div>
        <div class="weekly">
            <div class="weekly__image">
                <img alt="thundercat" src={Thundercat}/>
                <div className="weekly__bg" style={{background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 95%)"}}/>
                <div className="weekly__header" style={{color: "black"}}>
                <h2>Thundercat: Apocalypse</h2>
                <h1>Издание "Ten Years Anniversary"</h1>
                </div>
            </div>

        </div>
        <div className="email">
            <h1>Хотите быть в курсе событий?</h1>
            <h2>Подпишитесь на нашу рассылку по e-mail, <br/>чтобы узнавать новости <span>первым</span>!</h2>
            <div>
            <input value={emailsend} onChange ={(e) => {setEmail(e.target.value)}}id="emailsender" type="email" placeholder="Ваш e-mail"/>
            <button onClick={() => {
                handleEmail(emailsend)
                setEmail('')
            }}>Подписаться</button>
            </div>
        </div>
        </div>
    </div>
}