import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const createUser = (body) => {
  // console.log(body);
  return axios.post("/users/register", body);
};
const Register = () => {
  const navigate = useNavigate();

  const { mutate, isError } = useMutation({
    mutationKey: "creatUser",
    mutationFn: createUser,
  });

  if (isError) {
    return <h1>Error</h1>;
  }
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
    console.log(body);
    navigate("/login");
  };

  return (
    <div className=" bg-[url('https://img.freepik.com/free-photo/international-day-education-cartoon-style_23-2151007381.jpg?t=st=1719589659~exp=1719593259~hmac=9f83db871293174a1758ce51e64425e42eb5cc4dab9f7e812a701e077086b506&w=826')] h-screen bg-cover bg-center grid grid-cols-7 min-h-screen text-white p-6 overflow-hidden ">
      <div className=" col-span-4"></div>
      <div className=" col-span-3  p-10 bg-black bg-opacity-15 rounded-xl ">
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
            label=" Name"
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
            <Input.Password placeholder="Input password" />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
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
      </div>
    </div>
  );
};

export default Register;
