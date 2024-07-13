import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useGetUserProfileQuery } from "../../redux/api/Apis/userApi";
import Spinner from "../Spinner/Spinner";
import PropTypes from "prop-types";


const AdminAuth = ({ children }) => {
  const navigate = useNavigate();

  const { data, isLoading, status } = useGetUserProfileQuery({});

  useEffect(() => {
    if (status === "fulfilled" && data?.data?.role !== "manager") {
      navigate("/error");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (!isLoading && status === "fulfilled") {
    return <>{children}</>;
  }
  return <Spinner />;
};

AdminAuth.propTypes = {
  children: PropTypes.object,
};
export default AdminAuth;
