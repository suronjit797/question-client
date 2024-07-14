import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const createUser = (body) => {
  // console.log(body);
  return axios.post("/users/register", body);
};
const Register = () => {
  const navigate = useNavigate();

  const { mutate, isError, error } = useMutation({
    mutationKey: "creatUser",
    mutationFn: createUser,
    onSuccess:async(data) => {
      await Swal.fire({
        title: "Success!",
        text: data.response?.message||"You have successfully registered.",
        icon: "success",
        confirmButtonText: "OK",
      });

      navigate("/login");
    },
  });

  const postFormData = (value) => {
    // console.log(value)
    const { name, email, password } = value;
    const body = {
      name,
      email,
      role: "student",
      password,
    };
    mutate(body);
    // console.log(body);
    // navigate("/login");
  };

  if (isError) {
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response.data?.message || "Error happened",
    });
  }

  return (
    <div className=" bg-[url('/photo/photo1.webp')] h-screen bg-cover bg-opacity-50 backdrop-blur-xl bg-center md:grid md:grid-cols-7 min-h-screen text-white p-6 overflow-y-auto items-center ">
      <div className=" md:col-span-4"></div>
      <div className=" md:col-span-3 flex flex-col justify-center gap-4 p-14 md:h-full bg-black bg-opacity-35 rounded-xl ">
        <div className="text-4xl text-[#BDE4A7] font-semibold text-center mb-4">Registration</div>
        <Form
          className=" text-white"
          name="register"
          onFinish={postFormData}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label={<span style={{ fontSize: "16px", color: "white" }}>Name</span>}
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input placeholder="Input name" />
          </Form.Item>

          {/* <Form.Item
            label="role"
            name="role"
            rules={[
              {
                required: true,
                message: "Please input your role!",
              },
            ]}
          >
            <Select
              style={{
                width: "100%",
              }}
              options={[
                {
                  value: "admin",
                  label: "Admin",
                },
                {
                  value: "student",
                  label: "Student",
                },
                
              ]}
            />
          </Form.Item> */}

          <Form.Item
            name="email"
            label={<span style={{ fontSize: "16px", color: "white" }}>E-mail</span>}
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
            label={<span style={{ fontSize: "16px", color: "white" }}>Password</span>}
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
            <Input.Password placeholder="Input password" />
          </Form.Item>

          <Form.Item
            name="confirm"
            label={<span style={{ fontSize: "16px", color: "white" }}>Confirm Password</span>}
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(" Password does not match!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm password" />
          </Form.Item>

          <Form.Item>
            <Button className="btn btn-primary" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <div className="text-xl text-center font-semibold">
          Already Registered?{" "}
          <Link to="/login" className=" text-xl text-[#BDE4A7] font-semibold">
            Sing In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
