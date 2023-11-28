import React, { useEffect, useState } from "react";
import useLocalStorage from "../../hook/useLocalStorage";

function Market() {
  const [fetchData, setFetchData] = useState([]);
  const [basket, setBasket] = useLocalStorage("basket", []);

  useEffect(() => {
    getFetch();
  }, []);

  async function getFetch() {
    const data = await fetch("https://northwind.vercel.app/api/products");
    const res = await data.json();
    setFetchData(res);
  }

  function addBasket(newItem) {
    if (!basket.find((x)=>x.id === newItem.id)) {
        newItem.count = 1
        setBasket([...basket, newItem]);
  
    }
    else{
        setBasket(basket.map(x=>{
            if (x.id===newItem.id) x.count++
            return x
        }))
    }
  }

  function removeBasket(newItem) {
    if(newItem.count > 1) {
        newItem.count--
        setBasket(basket.map((x)=>{
            if(x.id === newItem.id) return newItem
            else return x
        }))
    }
    else setBasket(basket.filter((x) => x !== newItem));
  }

    function allremoveBasket(newItem){
        setBasket(basket.filter((x) => x !== newItem));
    }

  return (
    <>
      <div>
        <h3>basket</h3>
        {basket.map((x) => {
          return (
            <ul key={x.id}>
              <li>{x.id}</li>
              <li>{x.name}</li>
              <li>count: {x.count}</li>
              <button onClick={() => addBasket(x)}>+</button>
              <button onClick={() => removeBasket(x)}>-</button>
              <button onClick={() => allremoveBasket(x)}>del</button>
            </ul>
          );
        })}
      </div>
      <hr />
      <div>
        <h3>data</h3>
        <ul>
          {fetchData.map((x) => {
            return (
              <ul key={x.id}>
                <li>{x.id}</li>
                <li>{x.name}</li>
                <button onClick={() => addBasket(x)}>add</button>
              </ul>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default Market;
