import './catalog.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSorted, sortListByName, sortList as sortByPrice, sortByArtist, sortByGenre, sortByYear } from '../slices/listsSlice';

export const Catalog = () => {
    const dispatch = useDispatch();
    const list = useSelector(state => state.catalog.catalog);
    const sortList = useSelector(state => state.sorted.sorted);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [range, setRange] = useState(50);
    const [year, setYear] = useState(''); 
    const uniqueGenres = [...new Set(list.map(item => item.genre))];

    useEffect(() => {
        dispatch(setSorted(list));
    }, [list, dispatch]);

    useEffect(() => {
        const filteredList = list.filter(item =>
            (selectedGenres.length === 0 || selectedGenres.includes(item.genre)) &&
            item.price < range
        );
        dispatch(setSorted(filteredList));
    }, [selectedGenres, range, list, dispatch]);

    const handleFilterChange = (genre) => {
        setSelectedGenres(prev =>
            prev.includes(genre)
                ? prev.filter(g => g !== genre)
                : [...prev, genre]
        );
    };

    const Search = (obj) => {
        if (obj.length === 0) {
            const filteredByGenreAndPrice = list.filter(item =>
                (selectedGenres.length === 0 || selectedGenres.includes(item.genre)) &&
                item.price < range &&
                item.year < year
            );
            dispatch(setSorted(filteredByGenreAndPrice));
            return;
        }

        const searchsort = list.filter(item => 
            (selectedGenres.length === 0 || selectedGenres.includes(item.genre)) &&
            item.title.includes(obj) &&
            item.price < range &&
            item.year < year
        );
        dispatch(setSorted(searchsort));
    };

    const rangeChange = (obj) => {
        setRange(obj);
        const filteredList = list.filter(item =>
            (selectedGenres.length === 0 || selectedGenres.includes(item.genre)) &&
            item.price < obj &&
            item.year < year
        );
        dispatch(setSorted(filteredList));
    };

    const yearFilter = (obj) => {
        setYear(obj); 
        const filteredList = list.filter(elem => 
            (selectedGenres.length === 0 || selectedGenres.includes(elem.genre)) &&
            elem.price < range && 
            elem.year < obj
        );
        dispatch(setSorted(filteredList));
    };

    return (
        <div className="catalog">
            <div className='catalog__filters'>
                <input placeholder='Поиск...' onChange={(e) => { Search(e.target.value) }} />
                <input 
                    type="range"
                    value={range} 
                    onChange={(e) => { rangeChange(e.target.value) }} 
                />
                <p>Цена до: {range}$</p>
                <p>Сортировать по: </p>
                <button onClick={() => {dispatch(sortByPrice())}}>Цене</button>
                <button onClick={() => {dispatch(sortListByName())}}>Названию</button>
                <button onClick={() => {dispatch(sortByArtist())}}>Исполнителю</button>
                <button onClick={() => {dispatch(sortByGenre())}}>Жанру</button>
                <button onClick={() => {dispatch(sortByYear())}}>Году выпуска</button>
                <p>Жанр:</p>
                {uniqueGenres.map((genre) => (
                    <div key={genre}>
                        <input 
                            type="checkbox" 
                            className="checkbox"
                            checked={selectedGenres.includes(genre)}
                            onChange={() => handleFilterChange(genre)} 
                        />
                        <label>{genre}</label>
                    </div>
                ))}
                <p>Релизы до: </p>
                <input 
                    type="number" 
                    placeholder='Укажите год' 
                    value={year} 
                    onChange={(e) => { yearFilter(e.target.value) }} 
                />
            </div>
            <div className='catalog__content'>
                {sortList.length > 0 ?
                    sortList.map((elem) => (
                        <div className="catalog__element" key={elem.id}>
                            <img src={elem.imageUrl} alt={elem.title} />
                            <h1>{elem.title}</h1>
                            <h2>{elem.artist}</h2>
                            <h3>{elem.price}</h3>
                            <h4>{elem.genre}</h4>
                            <h5>{elem.year}</h5>
                        </div>
                    )) : <div>Не найдено</div>
                }
            </div>
        </div>
    );
};