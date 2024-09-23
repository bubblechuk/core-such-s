import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { SortTable } from './SortTable'
import {Menu, OrderForm, Cart} from './OrderForm'
import { Provider } from 'react-redux';
import {Header} from './header/Header'
import {Main} from './Main'
import {Footer} from './footer/Footer'
import './App.css'
function App() {
  window.onload = () => {
    var logo = document.getElementsByClassName("header__logo")[0].childNodes[0];
    logo.style.fontSize = "70px"; // Set initial size

    setTimeout(() => {
        logo.style.fontSize = "40px"; // Change size after 1 second
    }, 750);
};
  const classes = document.body.classList;
        let timer = 0;
        window.addEventListener('resize', function () {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            else
                classes.add('stop-transitions');

            timer = setTimeout(() => {
                classes.remove('stop-transitions');
                timer = null;
            }, 100);
          })
  return (
    <div>
      <BrowserRouter>
      <Header/>
      <Main/>
    {/* <Menu/>
    <Routes>
      <Route path='catalog' element={<SortTable/>} />
      <Route path='cart' element={<Cart/>} />
      <Route path='order' element={<OrderForm/>} />
    </Routes> */}
    </BrowserRouter>
    <Footer/>
    </div>
  )
}

export default App
