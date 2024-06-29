import { Button, Form, Input } from "antd";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../redux/features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const loginFunction = async (newTodo) => {
  const { data } = await axios.post("/users/login", newTodo);
  return data;
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, isLogin, user } = useSelector((state) => state.auth);
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
      navigate("/");
    },
  });

  // navigate to home if login
  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, [isLogin]);

  const handleLogin = () => {
    mutation.mutate({
      email: "admin@admin.site",
      password: "admin##",
    });
  };

  return (
    <div className=" bg-[url('https://img.freepik.com/free-photo/international-day-education-cartoon-style_23-2151007392.jpg?t=st=1719590954~exp=1719594554~hmac=aa679c72e2073faee48ca676f6e292e86a109a464ec63264f0b7ac35d77719fe&w=826')] h-screen bg-cover bg-center grid grid-cols-7 min-h-screen text-white p-6 overflow-hidden ">
      <div className=" col-span-3 grid items-center grid-flow-row p-10 bg-black bg-opacity-15 rounded-xl ">
        <div className="text-4xl  items-center text-[#BDE4A7] font-semibold text-center mb-4">
          Log In
        </div>
        <Form
          name="register"
          onFinish={handleLogin}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input placeholder="Input Email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                min: 6,
                message: "min length 6",
              },
            ]}
          >
            <Input.Password placeholder="Input Password" />
          </Form.Item>

          <Form.Item>
            <Button
              className="btn btn-primary"
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
        <div className=" flex justify-around align-middle">
          <h1 className=" h-[2px] my-auto rounded w-[40%] bg-gray-500" /> or
          <h1 className=" h-[2px] rounded my-auto w-[40%] bg-gray-500" />
        </div>

        <Link
          to="/register"
          className=" w-full py-2 px-5 mx-auto text-xl text-center font-semibold rounded border-[#BDE4A7] border-2  hover:bg-[#BDE4A7] text-[#BDE4A7] hover:text-black space-x-word-10"
        >
          Register
        </Link>
      </div>
      <div className=" col-span-4"></div>
    </div>
  );
};

export default Login;
