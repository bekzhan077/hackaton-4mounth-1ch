import React, { createContext, useContext, useReducer, useState } from "react";
import { ACTION, API, LIMIT } from "../utils/consts";
import { useSearchParams } from "react-router-dom";
import { notify } from "../components/Toastify";
import axios from "axios";
import CartPage from "../pages/CartPage";

const pinContext = createContext();

export const usePinContext = () => useContext(pinContext);

const init = {
  pins: [],
  pin: null,
  pageTotalCount: 1,
};

function reducer(state, action) {
  switch (action.type) {
    case ACTION.pins:
      return { ...state, pins: action.payload };
    case ACTION.pin:
      return { ...state, pin: action.payload };
    case ACTION.pageTotalCount:
      return { ...state, pageTotalCount: action.payload };
    default:
      return state;
  }
}

const PinContext = ({ children }) => {
  const [searchPar, setSearchPar] = useSearchParams();
  const [state, dispatch] = useReducer(reducer, init);
  const [page, setPage] = useState(+searchPar.get("_page") || 1);
  const [detail, setDetail] = useState(null);

  const currentParams = Object.fromEntries([...searchPar]);

  async function getPins() {
    try {
      const { data, headers } = await axios.get(
        `${API}${window.location.search}`
      );
      const totalCount = Math.ceil(headers["x-total-count"] / LIMIT);

      dispatch({
        type: ACTION.pageTotalCount,
        payload: totalCount,
      });

      dispatch({
        type: ACTION.pins,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      notify(`${error.response.status}: ${error.response.statusText}`, "error");
    }
  }

  async function getOnePin(id) {
    try {
      const { data } = await axios.get(`${API}/${id}`);
      dispatch({
        type: ACTION.pin,
        payload: data,
      });
    } catch (error) {
      notify(`${error.response.status}: ${error.response.statusText}`, "error");
    }
  }

  async function deletePin(id) {
    try {
      await axios.delete(`${API}/${id}`);
      getPins();
      notify("Deleted", "error");
    } catch (error) {
      notify(`${error.response.status}: ${error.response.statusText}`, "error");
    }
  }

  async function editPin(id, newData) {
    try {
      await axios.patch(`${API}/${id}`, newData);
      notify("Edited");
    } catch (error) {
      console.log(error);
      notify(`${error.response.status}: ${error.response.statusText}`, "error");
    }
  }

  async function addPin(newPin) {
    try {
      await axios.post(API, newPin);
      notify("Added", "default");
    } catch (error) {
      console.log(error);
      notify(`${error.response.status}: ${error.response.statusText}`, "error");
    }
  }

  async function getOneDetail(id) {
    const { data } = await axios(`${API}/${id}`);
    setDetail(data);
  }

  const value = {
    pins: state.pins,
    pin: state.pin,
    pageTotalCount: state.pageTotalCount,
    getPins,
    addPin,
    deletePin,
    getOnePin,
    editPin,
    page,
    setPage,
    detail,
    getOneDetail,
    currentParams,
  };
  return <pinContext.Provider value={value}>{children}</pinContext.Provider>;
};

export default PinContext;
