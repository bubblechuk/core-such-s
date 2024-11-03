import { useLocation } from 'react-router-dom';
import { addCart, delCart } from '../slices/listsSlice';
import { useDispatch, useSelector } from 'react-redux';
import "./product.css"
export const Product = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const list = useSelector(state => state.catalog.catalog);
    const cart = useSelector(state => state.cart.cart);
    const filtered = list.filter(elem => elem.title === searchParams.get('name'))
    const dispatch = useDispatch();
    return (
        <div className="product__main">
            <div className="product__content">
                <div className="product__head">
                <img alt="albumcover" id="album" src={filtered[0].imageUrl}/>
                <div className="product__title">
                    <h1 id="title">{filtered[0].title}</h1>
                    <h2 id="artist">{filtered[0].artist}</h2>
                    <hr/>
                    <h3>{filtered[0].price}$</h3>
                    <button id="cartbutton" onClick={(e) => {
                                
                                if (e.target.innerText === "В корзине") {
                                    dispatch(delCart(filtered[0].title))
                                }
                                else {
                                dispatch(addCart(list.filter((elem) => elem.title === filtered[0].title)))
                                }
                                }}> {cart.some((obj) => obj.title === filtered[0].title) ? "В корзине" : "В корзину"}</button>
                    <h3 id="desc">{filtered[0].description}</h3>
                    <div id="advanced">
                <h2 >Жанр: {filtered[0].genre}</h2>
                <h2>Год выпуска: {filtered[0].year}</h2>
                </div>
                </div>
                <div className="product__advanced">
                <div id="tracklist">
                    <h2>Список песен:</h2>
                    <div>
                <ul>
                {filtered[0].tracklist.map((elem) => {
                    return <li>{elem}</li>
                })}
                </ul>
                </div>
                </div>
                </div>
                </div>
            </div>
        </div>
    );
};