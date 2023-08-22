import React, { useEffect } from "react";
import CartPage from "./CartPage";
import { useAuthContext } from "../contexts/AuthContext";
import { useCommentContext } from "../contexts/CommentContext";

const ProfilePage = () => {
  const { user } = useAuthContext();
  console.log(user);
  const { comment, getComment } = useCommentContext();

  //   useEffect(() => {
  //     getComment();
  //   }, []);

  return (
    <div className="container-profile">
      {user && (
        <img
          style={{ borderRadius: "50%", height: "190px" }}
          src={user.photoURL}
          width={50}
          alt=""
        />
      )}

      {user && <h1>{user.displayName}</h1>}
      {user && <h5>{user.email}</h5>}
      {user && <span>0 подписок</span>}

      <h2>Сохраненные</h2>

      {user && <CartPage />}
      {!user && (
        <div class="col-sm-12">
          <div
            class="alert fade alert-simple alert-info alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show"
            role="alert"
            data-brk-library="component__alert"
          >
            <button
              type="button"
              class="close font__size-18"
              data-dismiss="alert"
            >
              <span aria-hidden="true">
                <i class="fa fa-times blue-cross"></i>
              </span>
              <span class="sr-only">Close</span>
            </button>
            <i class="start-icon  fa fa-info-circle faa-shake animated"></i>
            <strong class="font__weight-semibold">Heads up!</strong> This alert
            needs your attention, but it's not super important.
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
