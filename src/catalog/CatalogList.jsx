import { useState } from 'react';
import {Link} from 'react-router-dom'
import './catalog.css'
import { useDispatch } from 'react-redux';
import {addCart, delCart} from '../slices/listsSlice'
import { useSelector } from 'react-redux';
export const CatalogList = ({ sortList }) => {
    const itemsPerPage = window.innerWidth > 1000 ? 6 : 3;
    const [page, setPage] = useState(1);

    const totalPages = Math.ceil(sortList.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;
    const paginatedList = sortList.slice(startIndex, endIndex);
    const cart = useSelector(state=> state.cart.cart);
    const dispatch = useDispatch();
    const handlePrevious = () => setPage((prev) => Math.max(prev - 1, 1));
    const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

    return (
        <div>
            <div className='catalog__content'>
                {paginatedList.length > 0 ? (
                    paginatedList.map((elem) => (
                        <div className="catalog__element" key={elem.id}>
                            <Link to={`/product?name=${elem.title}`} className='link'><img src={elem.imageUrl} alt={elem.title} /></Link>
                            <div className='catalog__title'>
                                <div className='catalog__name'>
                                    <Link to={`/product?name=${elem.title}`} className='link'>
                                        <h1>{elem.title}</h1>
                                    </Link>
                                    <h3>{elem.artist}</h3>
                                </div>
                                <h2>{elem.price}$</h2>
                            </div>
                            <button onClick={(e) => {
                                
                                if (e.target.innerText === "В корзине") {
                                    dispatch(delCart(elem.title))
                                }
                                else {
                                dispatch(addCart(paginatedList.filter((obj) => obj.title === elem.title)))
                                }
                                }}> {cart.some((obj) => obj.title === elem.title) ? "В корзине" : "В корзину"}</button>
                        </div>
                    ))
                ) : (
                    <div>Не найдено</div>
                )}
            </div>
            <div className='catalog__pagination'>
            <div>
                <button onClick={handlePrevious} disabled={page === 1}>{'<'}</button>
                <span> Страница {page} из {totalPages} </span>
                <button onClick={handleNext} disabled={page === totalPages}>{'>'}</button>
            </div>
            </div>
        </div>
    );
};
