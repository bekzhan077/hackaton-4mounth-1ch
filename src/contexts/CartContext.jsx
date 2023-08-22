import React, { createContext, useContext, useState } from "react";
import { notify } from "../components/Toastify";

const cartContext = createContext();

export function useCartContext() {
  return useContext(cartContext);
}

const initState = {
  pins: [],
};

function getDataFromLs() {
  let data = JSON.parse(localStorage.getItem("cart"));
  if (!data) {
    data = {
      pins: [],
    };
  }

  return data;
}

const CartContext = ({ children }) => {
  const [safe, setSafe] = useState(initState);

  function getSafe() {
    const data = getDataFromLs();

    setSafe(data);
  }

  function addFotosToSafe(pin) {
    const data = getDataFromLs();
    data.pins.push({ ...pin });
    localStorage.setItem("cart", JSON.stringify(data));
    getSafe();
    notify("Pin added");
  }
  function isAlreadyIsCart(id) {
    const data = getDataFromLs();
    const isInCart = data.pins.some((item) => item.id === id);
    return isInCart;
  }

  function deleteFotoFromSafe(id) {
    const data = getDataFromLs();
    data.pins = data.pins.filter((item) => item.id !== id);

    localStorage.setItem("cart", JSON.stringify(data));
    getSafe();
    notify("Pin removed");
  }

  const value = {
    isAlreadyIsCart,
    addFotosToSafe,
    getSafe,
    safe,
    deleteFotoFromSafe,
  };
  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
};

export default CartContext;
