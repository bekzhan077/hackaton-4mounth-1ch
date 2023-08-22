import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { COMMENTSAPI } from "../utils/consts";
import { notify } from "../components/Toastify";

const commentContext = createContext();
export const useCommentContext = () => useContext(commentContext);
const CommentContext = ({ children }) => {
  const [comment, setComment] = useState([]);

  async function getComment() {
    try {
      const { data } = await axios.get(COMMENTSAPI);
      setComment(data);
    } catch (error) {
      notify(`${error.response.status}: ${error.response.statusText}`, "error");
    }
  }

  async function addComment(newComment) {
    try {
      await axios.post(COMMENTSAPI, newComment);
      getComment();
    } catch (error) {
      notify(`${error.response.status}: ${error.response.statusText}`, "error");
    }
  }

  const value = {
    comment,
    getComment,
    addComment,
  };
  return (
    <commentContext.Provider value={value}>{children}</commentContext.Provider>
  );
};

export default CommentContext;
