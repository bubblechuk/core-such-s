import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {Header} from './header/Header'
import {Main} from './Main'
import {Footer} from './footer/Footer'
import {Catalog} from './catalog/Catalog'
import './App.css'
function App() {
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
    <Header/>
    <Router>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/catalog' element={<Catalog />} />
      </Routes>
    </Router>
    <Footer/>
    </div>
  )
}

export default App
