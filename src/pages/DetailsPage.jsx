import React, { useState } from "react";
import { useEffect } from "react";
import { usePinContext } from "../contexts/PinContext";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import EditPinPage from "./EditPinPage";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuthContext } from "../contexts/AuthContext";
import { useCommentContext } from "../contexts/CommentContext";
import Details from "../components/Details";

const DetailsPage = () => {
  const { detail, getOneDetail } = usePinContext();
  const { isAdmin, user } = useAuthContext();
  const { comment, getComment, addComment } = useCommentContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const [userVal, setUserVal] = useState(null);

  const [item, setItem] = useState(null);

  useEffect(() => {
    setUserVal();
  }, [user]);

  useEffect(() => {
    getOneDetail(id);
  }, []);

  useEffect(() => {
    if (detail) {
      setItem(detail);
    }
  }, [detail]);

  return (
    <div>
      <Details item={item} />
    </div>
  );
};

export default DetailsPage;
