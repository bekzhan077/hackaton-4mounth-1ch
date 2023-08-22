import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import CartContext from "./contexts/CartContext";
import PinContext from "./contexts/PinContext";
import Toastify from "./components/Toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "./contexts/AuthContext";
import UserContext from "./contexts/UserContext";
import CommentContext from "./contexts/CommentContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthContext>
      <UserContext>
        <CommentContext>
          <CartContext>
            <PinContext>
              <Toastify />
              <App />
            </PinContext>
          </CartContext>
        </CommentContext>
      </UserContext>
    </AuthContext>
  </BrowserRouter>
);
