import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from "react-hook-form";
import { Catalog } from "./Catalog";
import { Search } from './Search'
import { connect } from 'react-redux';
import {useEffect} from 'react'
import {addProduct} from './slices/listsSlice'
export const SortTable = () => {
  const products = useSelector(state => state.products.products);
  console.log(products);
  const dispatch = useDispatch();
  const [table, setTable] = useState([]);
  const { register, handleSubmit, reset, control } = useForm({
    mode: "onblur",
  });
  const onSubmit = (data) => {
    dispatch(addProduct({
      id: Date.now(),
      name: data.name,
      price: parseInt(data.price),
      amount: parseInt(data.amount),
      weight: parseInt(data.weight),
      file: data.file,
      desc: data.desc,
      new: data.new,
      dsc: parseInt(data.dsc),
      cart: true,
    }));
    reset();
  };
  
  return (
    <div className="componentContainer">
      <h1>Добавление товара: </h1>
      <div className="container">
        <div className="Form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("name", {
                required: true,
                minLength: 3,
                // pattern: /^[\p{L}]+$/u,
              })}
              placeholder="Наименование..."
            ></input>
            <input
              {...register("price", { required: true, pattern: /^[0-9]+$/ })}
              placeholder="Стоимость..."
            ></input>
            <input
              {...register("amount", { required: true, pattern: /^[0-9]+$/ })}
              placeholder="Количество..."
            ></input>
            <input
              {...register("weight", { required: true, pattern: /^[0-9]+$/ })}
              placeholder="Масса (кг)"
            ></input>
            <label>Изображение</label>
            <Controller
              control={control}
              name="file"
              rules={{ required: true }}
              render={({ field }) => (
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={(e) => field.onChange(e.target.files)}
                />
              )}
            />
            <textarea
              {...register("desc", { required: true })}
              placeholder="Описание..."
            ></textarea>
            <label>Новинка?</label>
            <input
              {...register("new", { required: true })}
              id="radio"
              type="radio"
              name="new"
              value={true}
            ></input>
            <label>Да</label>
            <input
              {...register("new", { required: true })}
              id="radio"
              type="radio"
              name="new"
              value={false}
            ></input>
            <label>Нет</label>
            <input
              {...register("dsc", { required: true, pattern: /^[0-9]+$/ })}
              placeholder="Скидка..."
            ></input>
            <input type="submit" value="Добавить"></input>
          </form>
        </div>
        <div className="table">
          <table>
            <tr>
              <td>Наименование</td>
              <td>Цена</td>
              <td>Количество</td>
              <td>Масса</td>
              <td>Изображение</td>
              <td>Описание</td>
              <td>Новинка</td>
              <td>Скидка</td>
            </tr>
            {products.map((element) => {
              return (
                <tr>
                  <td>{element.name}</td>
                  <td>{element.price}</td>
                  <td>{element.amount}</td>
                  <td>{element.weight}</td>
                  <td>
                    <img
                      className="tableImage"
                      src={URL.createObjectURL(element.file[0])}
                    />
                  </td>
                  <td>{element.desc}</td>
                  <td>{element.new == "true" ? "Новый" : "Обычный"}</td>
                  <td>{element.dsc}%</td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
      {products.length ? <Search list={products} /> : false}
      {products.length ? <Catalog list={products} /> : false}
    </div>
  );
};