import React, { useEffect } from "react";
import "../card.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { usePinContext } from "../contexts/PinContext";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { useCartContext } from "../contexts/CartContext";
const PinItem = ({ item, pinSize }) => {
  const { safe, getSafe, isAlreadyIsCart, addFotosToSafe, deleteFotoFromSafe } =
    useCartContext();
  const { deletePin } = usePinContext();
  const { isAdmin } = useAuthContext();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getSafe();
  }, []);
  return (
    <div className={`pin ${pinSize}`}>
      <img src={item.image} alt="" className="mainPic" />
      <div
        className="card_cover"
        onClick={() => navigate(`/detailPage/${item.id}`)}
      ></div>
      <div className="content2">
        {isAlreadyIsCart(item.id) ? (
          <button
            onClick={() => deleteFotoFromSafe(item.id)}
            aria-label="add to shopping cart"
            className="card_btn_save"
          >
            Удалить
          </button>
        ) : (
          <button
            onClick={() => {
              addFotosToSafe(item);
            }}
            aria-label="add to shopping cart"
            className="card_btn_save"
          >
            Сохранить
          </button>
        )}
      </div>
      <div className="content">
        <button
          onClick={() => navigate(`/detailPage/${item.id}`)}
          className="card_button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" />
          </svg>
        </button>
        {isAdmin() && (
          <button
            onClick={() => navigate(`/edit/${item.id}`)}
            className="card_button"
          >
            <svg
              className="card_deatils bi bi-three-dots"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <EditIcon />
            </svg>
          </button>
        )}
        {isAdmin() && (
          <button
            onClick={() => deletePin(item.id)}
            className="card_button card_button_item2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-three-dots card_deatils"
              viewBox="0 0 16 16"
            >
              <DeleteIcon />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default PinItem;
