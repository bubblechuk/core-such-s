import './catalog.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSorted, sortListByName, sortList as sortByPrice, sortByArtist, sortByGenre, sortByYear } from '../slices/listsSlice';
import { CatalogList } from './CatalogList';
export const Catalog = () => {
    const dispatch = useDispatch();
    const list = useSelector(state => state.catalog.catalog);
    const sortList = useSelector(state => state.sorted.sorted);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [filters, setFilters] = useState(false);
    const [range, setRange] = useState(50);
    const [year, setYear] = useState(''); 
    const uniqueGenres = [...new Set(list.map(item => item.genre))];
    const page = 1;
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
                (year === '' || item.year < year) 
            );
            dispatch(setSorted(filteredByGenreAndPrice));
            return;
        }
    
        const searchsort = list.filter(item => 
            (selectedGenres.length === 0 || selectedGenres.includes(item.genre)) &&
            item.title.includes(obj) &&
            item.price < range &&
            (year === '' || item.year < year) 
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
                        <div className="scroll__filter" onClick={() => {setFilters(!filters)}}>Свернуть</div>
            <div className='catalog__filters' id={`${filters?"filter_up":"filter_down"}`}>
                <input id="search" placeholder='Поиск...' onChange={(e) => { Search(e.target.value) }} />
                <input id="range"
                    type="range"
                    value={range} 
                    onChange={(e) => { rangeChange(e.target.value) }} 
                />
                <p>Цена до: {range}$</p>
                <div id='filters'>
                    <p style={{textAlign: "center"}}>Сортировать по</p>
                    <br/>
                    <button onClick={() => {dispatch(sortByPrice())}}>Цене</button>
                    <button onClick={() => {dispatch(sortListByName())}}>Названию</button>
                    <button onClick={() => {dispatch(sortByArtist())}}>Исполнителю</button>
                    <button onClick={() => {dispatch(sortByGenre())}}>Жанру</button>
                    <button onClick={() => {dispatch(sortByYear())}}>Году выпуска</button>
                </div>
                <div id='genre'>
                <p>Жанр</p>
                {uniqueGenres.map((genre) => (
                    <div className='genres' key={genre}>
                        <input 
                            type="checkbox" 
                            className="checkbox"
                            checked={selectedGenres.includes(genre)}
                            onChange={() => handleFilterChange(genre)} 
                        />
                        <label>{genre}</label>
                    </div>
                ))}
                </div>
                <div id="year">
                <p>Релизы до: </p>
                <input 
                    type="number" 
                    placeholder='Укажите год' 
                    value={year} 
                    onChange={(e) => { yearFilter(e.target.value) }} 
                />
                </div>
            </div>
                <CatalogList sortList={sortList} page={page}/>
            </div>
    );
};