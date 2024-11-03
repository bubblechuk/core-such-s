import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {Header} from './header/Header'
import {Main} from './Main'
import {Footer} from './footer/Footer'
import {Catalog} from './catalog/Catalog'
import {Product} from './product/Product'
import {About} from './about/About'
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import './App.css'
function App() {
  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0); // Сбрасываем прокрутку в начало
    }, [pathname]); // Запускаем эффект при изменении маршрута

    return null; // Этот компонент ничего не рендерит
};
  window.onload = () => {
    if (window.innerWidth >= 1000) {
      var logo = document.getElementsByClassName("header__logo")[0].childNodes[0];
    logo.style.fontSize = "70px"; // Set initial size
    setTimeout(() => {
        logo.style.fontSize = "40px"; // Change size after 1 second
    }, 750);
    }
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
    
    <Router>
    <ScrollToTop />
    <Header/>
    <div className='content'>
      <Routes>
        <Route path='/core-such-s' element={<Main />} />
        <Route path='/catalog' element={<Catalog />} />
        <Route path='/product' element={<Product />}/>
        <Route path='/about' element={<About />}/>
      </Routes>
      </div>
          <Footer/>
    </Router>

    </div>
  )
}

export default App
