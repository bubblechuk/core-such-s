import { useState } from "react";
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addList, sortListByName, sortList, sortListByQuantity, sortListByDiscount, Discount1 } from './slices/listsSlice';
export const Catalog = ({list}) => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState(list);
  dispatch(Discount1())
  const handleAddState = (item) => {
    dispatch(addList({
      id: Date.now(),
        name: item.name,
        price: parseInt(item.price),
        amount: parseInt(item.amount),
        weight: parseInt(item.weight),
        file: item.file,
        desc: item.desc,
        new: item.new,
        dsc: parseInt(item.dsc),
        cart: true,
        buyer: 0,
    }));
  }
  const Name = () => {
    dispatch(sortListByName())
  }
  const List = () => {
    dispatch(sortList())
  }
  const Quantity = () => {
    dispatch(sortListByQuantity())
  }
  const Discount = () => {
    dispatch(sortListByDiscount())
  }
  return (
    <div className="componentContainer">
      <h1>Каталог:</h1>
      <div className="buttons">
        <label>Соритровка по: </label>
        <button onClick={Name}>Имени</button>
        <button onClick={List}>Цене</button>
        <button onClick={Quantity}>Количеству </button>
        <button onClick={Discount}>Скидке</button>
      </div>
      <div className="product">
        {list.map((element, index) => {
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
                  <div>В наличии: {element.amount} </div>
                  <div>{element.desc} </div>
                  <div>Весит: {element.weight}</div>
                  <div><input type="button" value="В корзину!" onClick={() => handleAddState(element)}/></div>
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