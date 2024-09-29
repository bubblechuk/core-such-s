import './footer.css'
import Social from '../images/social1.png'
export const Footer = () => {
    // var main = document.getElementsByClassName("main")[0],
    //     mainHeight = getComputedStyle(main).height;
    //     document.getElementsByClassName("footer")[0].style.top = `${parseInt(mainHeight.substring(0, mainHeight.length - 2)) + 100}px`;
    // console.log(mainHeight.substring(0, mainHeight.length - 2));
    return <div className='footer'>
        <div className='footer__content'>
            <div className='footer__links'>
                <ul>
                    <li>О компании</li>
                    <li>Реклама</li>
                    <li>Septima</li>
                    <li>Каталог</li>
                    <li>Корзина</li>
                    <li>О нас</li>
                </ul>
                <ul>
                    <li>Связь</li>
                    <li>+375 33 76 39 363</li>
                    <li>+375 33 76 39 343 (СМС)</li>
                    <li>help@thesound.com</li>
                </ul>
                <ul>
                    <li>Условия продажи</li>
                    <li>Политика приватности</li>
                    <li>Дополнительная информация</li>
                </ul>
                <div>
                <img src={Social}/>
                </div>
            </div>
            <hr/>
            <span>© 2024 Septima. Все права не защищены гыгыгы </span>
        </div>
    </div>
}

