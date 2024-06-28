import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuth } from "../../redux/features/authSlice";

const loginFunction = async (newTodo) => {
  const { data } = await axios.post("/users/login", newTodo);
  return data;
};

const Login = ({}) => {
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: loginFunction,
    onSuccess: async (data) => {
      if (data?.token) {
        const token = `Bearer ${data.token}`;
        try {
          const { data: userData } = await axios.get("/users/profile", {
            headers: { Authorization: token },
          });
          if (userData.success) {
            dispatch(setAuth({ token, user: userData?.data }));
          }
        } catch (error) {
          console.log("User Login Failed");
        }
      }
    },
  });

  const handleLogin = () => {
    console.log("click", mutation);
    mutation.mutate({
      email: "admin@admin.site",
      password: "admin##",
    });
  };

  return (
    <>
      Login
      <button onClick={handleLogin}>login</button>
    </>
  );
};

export default Login;
