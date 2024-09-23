import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export const Search = ({ list }) => {
  const [search, setSearch] = useState('');

  return (
    <div className="componentContainer">
      <h1>Поиск:</h1>
      <div className="buttons">
        <Autocomplete
          value={search}
          onChange={(event, newValue) => {
            setSearch(newValue || ''); // Set to empty string if newValue is null
          }}
          inputValue={search}
          onInputChange={(event, newInputValue) => {
            setSearch(newInputValue);
          }}
          options={list.map((element) => element.name)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Введите..."
              variant="outlined"
              inputProps={{
                ...params.inputProps,
                style: {width: '200px'},
                autoComplete: 'new-password', // Ensures autocomplete dropdown always shows
              }}
            />
          )}
        />
      </div>
      <div className="product">
        {list.map((element, index) => {
          if (search.length === 0 || element.name.includes(search)) { // Handle empty search
            return (
              <div
                key={index}
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
                  alt={element.name}
                />
                <div className="productContent">
                  <div className="productTitle">
                    <div>{element.new === "true" ? "Новый!" : ""} </div>
                    <div style={{ fontSize: "24px" }}>{element.name} </div>
                    <div>В наличии: {element.amount} </div>
                    <div>{element.desc} </div>
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
          }
          return null;
        })}
      </div>
    </div>
  );
};
