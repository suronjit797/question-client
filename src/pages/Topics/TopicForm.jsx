import { Form, Select, Input, Button } from "antd";
import { useEffect, useState } from "react";
import { allChapters, subjectOption } from "../../utils/SelectOption";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

const initData = {};
const createTopicFn = (body) => {
  console.log({ body });
  return axios.post("/topics", body);
};

const TopicForm = ({ mode = "create", data = {} }) => {
  const [form] = Form.useForm();
  const [chapterOptions, setChapterOptions] = useState();
  const [formData, setFormData] = useState(initData);
  const { subject, paper } = formData;

  useEffect(() => {
    if (mode === "edit" && data) {
      setFormData(data);
      form.setFieldsValue(data);
    }
  }, [mode, data]);

  useEffect(() => {
    if (subject && paper) {
      const chapters = allChapters.find((c) => c.subject === subject && c.paper === paper)?.chapters || [];
      setChapterOptions(chapters.map((c) => ({ label: <span className="capitalize">{c}</span>, value: c })));
    }
  }, [paper, subject]);

  const {
    mutate: createTopic,
    isError,
    error,
  } = useMutation({
    mutationKey: "createTopic",
    mutationFn: createTopicFn,
  });
  console.log({ error });
  if (isError) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response.data?.message || "Error Happen",
    });
  }

  const handleFinish = async (values) => {
    console.log("Success:", values);
    if (mode === "create") {
      createTopic(values);
    } else {
      // ! update
      createTopic(values);
    }
  };

  const finishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handlerValueChange = (changedValues, allValues) => {
    setFormData(allValues);

    console.log("Values changed:", changedValues, allValues);
  };

  return (
    <div className="container p-11 my-auto">
      <div className="max-w-[450px] mx-auto questionFrom">
        <Form
          form={form}
          name="createQuestion"
          onFinish={handleFinish}
          onFinishFailed={finishFailed}
          layout="vertical"
          initialValues={initData}
          onValuesChange={handlerValueChange}
          scrollToFirstError={true}
        >
          <div>
            <Form.Item
              label="Subject"
              name="subject"
              rules={[
                {
                  required: true,
                  message: "Select the subject",
                },
              ]}
            >
              <Select
                placeholder="Select Subject"
                filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
                showSearch={true}
                options={subjectOption}
              />
            </Form.Item>

            <Form.Item
              label="Paper"
              name="paper"
              rules={[
                {
                  required: true,
                  message: "Select the paper",
                },
              ]}
            >
              <Select
                placeholder="Select Paper"
                filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
                showSearch={true}
                options={["first", "second"].map((item) => ({
                  label: <span className="capitalize">{item}</span>,
                  value: item,
                }))}
              />
            </Form.Item>

            <Form.Item
              label="Chapter"
              name="chapter"
              rules={[
                {
                  required: true,
                  message: "Select the chapter",
                },
              ]}
            >
              <Select
                placeholder="Select Chapter"
                filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
                showSearch={true}
                options={chapterOptions}
              />
            </Form.Item>

            <Form.Item name="topic" label="Topics" rules={[{ required: true, message: "Input the topics" }]}>
              <Input placeholder="Select topic" />
            </Form.Item>
          </div>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default TopicForm;
