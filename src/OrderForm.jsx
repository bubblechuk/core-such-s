import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removeList, cartList, buyerList, sumList } from './slices/listsSlice';
import {useEffect} from 'react'
import {useState} from 'react'
export const Cart = () => {
    const handleAmount = (item) => {
        const tovar = prompt("Сколько вы хотите данного товара (В наличии: " + item.amount + ")" );
        if (tovar > item.amount || tovar < 1) {alert("У нас нет столько товара!")}
        else { 
          dispatch(buyerList([item.id, tovar]));
        }
      }
    const dispatch = useDispatch();
    const lists = useSelector((state) => state.lists.lists);
    const remove = (id) => {
        dispatch(removeList(id));
    }
    const cartl = (id) => {
        dispatch(cartList(id));
    }
    return (
        <div className="componentContainer">
          <h1>Корзина:</h1>
          <div className="buttons">
          </div>
          <div className="product">
            {lists.map((element, index) => {
              console.log(element.file);
              return (
                <div
                  className="box"
                  style={
                    element.new === "true"
                      ? { borderColor: "red", backgroundColor: "red" }
                      : { borderColor: "black", backgroundColor: "gray" }
                  }
                >
                  <img
                    className="shopImage"
                    src={URL.createObjectURL(element.file[0])}
                  />
                  <div className="productContent">
                    <div className="productTitle">
                      <div>{element.new == "true" ? "Новый!" : ""} </div>
                      <div style={{ fontSize: "24px" }}>{element.name} </div>
                      <div>Вы выбрали: {element.buyer} </div>
                      <div><input type="button" value="Выбрать сколько" onClick={() => {handleAmount(element)}}/></div>
                      <div>{element.desc} </div>
                      <div>Весит: {element.weight}</div>
                      <div><input checked={element.cart==true?false:true} style={{width: "14px" }} type="checkbox" onClick={() => {cartl(element.id)}}/> <label>Не добавлять</label></div>
                      <input style={{width: '60px'}} type="button" value="Удалить" onClick={() => {remove(element.id)}}/>
                    </div>
                    <div className="productPrice">
                        
                      <div id="price">
                        {element.price - (element.price / 100) * element.dsc}
                      </div>
                      <div style={{ textDecoration: "line-through" }}>
                        {" "}
                        {element.price}{" "}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    };
export const OrderForm = () => {
    const [inputF, setInputF] = useState(false);
    const [num, setNum] = useState(0);
    const [sum, setSum] = useState(0);
    const handleAmount = (item) => {
        const tovar = prompt("Сколько вы хотите данного товара (В наличии: " + item.amount + ")" );
        if (tovar > item.amount || tovar < 1) {alert("У нас нет столько товара!")}
        else { 
          dispatch(buyerList([item.id, tovar]));
        }
      }
    const dispatch = useDispatch();
    const lists = useSelector((state) => state.lists.lists);
    
    useEffect(() => {
        let nums = 0;
        lists.forEach((element) => {
            if (element.cart === true) {
                nums += parseInt(element.buyer) * (element.price - (element.price / 100) * element.dsc);
            }
        });
        setSum(nums);
    }, [lists]);
    const remove = (id) => {
        dispatch(removeList(id));
    }
    const cartl = (id) => {
        dispatch(cartList(id));
    }
    const handleCour = () => {
        setInputF(false);
        if (sum<200) setNum(10);
        else setNum(0);
        
    }
    const handleMail = () => {
        setInputF(false);
        let i = 0;
        lists.map((element)=>{
            if (element.cart == true) {
                i+=element.weight;
            }
            
        })
        setNum(i*5);
    }
    const handleSam = () => {
        setInputF(!inputF);
        setNum(0);
    }
    return (
        <div className="prikol">
          <h1>Доставка: </h1>
          <h2>Итого: {sum + num} рублей</h2>
          <label>Выберите способ доставки: </label>
          <br/>
          <input type="radio" name="dost" style={{width: '15px'}} onClick={() => {handleCour()}}/> <label>Курьер</label>
          <br/>
          <input type="radio" name="dost" style={{width: '15px'}} onClick={() => {handleMail()}}/> <label>Почта</label>
          <br/>
          <input type="radio" name="dost" style={{width: '15px'}} onClick={() => {handleSam()}}/> <label>Самовывоз</label>
          <br/>
          <label>Адрес доставки: </label>
          <input disabled={inputF}/>
          <br/>
          <label>Способ оплаты</label>
          <br/>
          <input type="radio" name="opl" style={{width: '15px'}}/> <label>Наличные</label>
          <br/>
          <input type="radio" name="opl" style={{width: '15px'}}/> <label>Банковская карта</label>
          <br/>
          <input type="radio" name="opl" style={{width: '15px'}}/> <label>Банковский перевод</label>
          <br/>
          <input type="button" value="Переход в банкинг" onClick={() => {alert("Победа!")}}/>
        </div>
      );
}
export const Menu = () => {
    return <div>
    <Link to='catalog' className='link'>
      <button>Каталог</button>
    </Link>
    <Link to='cart' className='link'>
      <button>Корзина</button>
    </Link>
    <Link to='order' className='link'>
      <button>Форма доставки</button>
    </Link>
    </div>
}
