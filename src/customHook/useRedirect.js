import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLoginStatus } from "../services/authService";
import { SET_LOGIN } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";

export default function useRedirect(path) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const redirectUser = async () => {
      const isLoggedIn = await getLoginStatus();
      dispatch(SET_LOGIN(isLoggedIn));

      if (!isLoggedIn) {
        toast.info("PLease Log in to continiue");
        navigate(path);
        return;
      }
    };
    redirectUser();
  }, [navigate, path, dispatch]);
}
