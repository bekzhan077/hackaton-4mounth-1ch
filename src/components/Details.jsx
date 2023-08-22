import React, { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { usePinContext } from "../contexts/PinContext";
import { useCommentContext } from "../contexts/CommentContext";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useCartContext } from "../contexts/CartContext";
import { useUserContext } from "../contexts/UserContext";
import { notify } from "./Toastify";
import PinList from "./PinList";

const Details = ({ item }) => {
  const { isAdmin, user } = useAuthContext();
  const { safe, getSafe, isAlreadyIsCart, addFotosToSafe, deleteFotoFromSafe } =
    useCartContext();
  const { users } = useUserContext();
  const { deletePin, pin } = usePinContext();
  const { comment, getComment, addComment } = useCommentContext();
  const [userInfo, setUserInfo] = useState({});
  const [commentValue, setCommentValue] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setUserInfo(user);
  }, [user]);

  useEffect(() => {
    getComment();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!commentValue.trim()) {
      return;
    }

    const newComment = {
      commentId: id,
      comment: commentValue,
      userEmail: userInfo.email,
      userPhoto: userInfo.photoURL,
      userName: userInfo.displayName,
    };
    addComment(newComment);

    setCommentValue("");
  }

  function handleChange(e) {
    setCommentValue(e.target.value);
  }

  function handleclick() {
    setTimeout(() => {
      deletePin(id);
    }, 50);
  }

  return (
    <div className="detailPage_mainContainer">
      {item && (
        <div className="detailPage_container">
          <div className="detailPage_container_part1">
            <img src={item.image} />
          </div>
          <div className="detailPage_container_part2">
            <div className="detailPage_container_part2__top">
              <div className="detailPage_container_part2__top_part1">
                <img
                  src="https://www.svgrepo.com/show/124304/three-dots.svg"
                  alt=""
                />
                <img
                  src="https://img.icons8.com/?size=512&id=11504&format=png"
                  alt=""
                />
                <img
                  src="https://img.icons8.com/?size=512&id=24816&format=png"
                  alt=""
                />
              </div>
              <div className="detailPage_container_part2__top_part2">
                <button className="detailPage_container_part2__top_part2__button1">
                  Профи...
                </button>
                {isAlreadyIsCart(item.id) ? (
                  <button
                    onClick={() => deleteFotoFromSafe(item.id)}
                    aria-label="add to shopping cart"
                    className="card_btn_save card_btn_save__detail"
                  >
                    Удалить
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      addFotosToSafe(item);
                    }}
                    aria-label="add to shopping cart"
                    className="card_btn_save card_btn_save__detail"
                  >
                    Сохранить
                  </button>
                )}
              </div>
            </div>
            <h2
              className="detailPage_container_part2__top_part2_h2
            "
              style={{
                textAlign: "start",
              }}
            >
              {item.title}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="scrollbar">
                {comment
                  .filter((item) => id === item.commentId)
                  .map((item, index) => (
                    <div className="comments_comment" key={index}>
                      <div style={{ display: "flex" }}>
                        <div>
                          {user && (
                            <img
                              style={{
                                borderRadius: "50%",
                                width: "50px",
                                height: "50px",
                                marginTop: "8px",
                              }}
                              src={item.userPhoto}
                              alt="userPhoto"
                            />
                          )}
                        </div>
                        <h3 style={{ margin: "auto 0", marginLeft: "5px" }}>
                          {user && item.userName}
                        </h3>
                      </div>
                      {!user ? "" : <p>{item.comment}</p>}
                    </div>
                  ))}
              </div>
              <div className="input_contaienr">
                <input
                  value={commentValue}
                  onChange={handleChange}
                  type="text"
                  name="comment"
                  className="input__email"
                  placeholder="Оставьте комментарий"
                />
              </div>
            </form>

            <div className="detailPage_container_part3_bottom">
              {isAdmin() && (
                <NavLink to="/">
                  <button
                    onClick={() => {
                      handleclick();
                    }}
                    className="delete-button"
                  >
                    <svg className="delete-svgIcon" viewBox="0 0 448 512">
                      <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                    </svg>
                  </button>
                </NavLink>
              )}

              {isAdmin() && (
                <button
                  className="edit-button"
                  onClick={() => navigate(`/edit/${id}`)}
                >
                  <svg className="edit-svgIcon" viewBox="0 0 512 512">
                    <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
