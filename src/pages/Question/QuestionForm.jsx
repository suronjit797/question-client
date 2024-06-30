import { UploadOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, Radio, Select, Upload } from "antd";
import axios from "axios";
import { useState } from "react";
const { Option } = Select;

const initdata = {
  type: "written",
  question: "asasd",
  options: ["a", "v", "b", "s", "d"],
  answerIndex: "3",
  answerText: "a",
  uploader: "667ff284c9191d4994ff7275",
  subject: "667ff284c9191d4994ff7275",
  paper: "667ff284c9191d4994ff7275",
  topics: "667ff284c9191d4994ff7275",
  tags: ["a"],
  institution: "a",
  year: "333",
  difficulty: "medium",
};

const finishFailed = (values) => {
  console.log(error, values);
};

const createQuestion = (body) => {
  console.log({ body });
  return axios.post("/questions", body);
};

const QuestionForm = ({ mode = "create", data = {} }) => {
  const [form] = Form.useForm();
  const [type, setType] = useState("");
  const [sImage, setSImage] = useState("");
  const [qImage, setQimage] = useState("");

  const { mutate, isError, error } = useMutation({
    mutationKey: "createQuestion",
    mutationFn: createQuestion,
  });

  const handleFinish = async (values) => {
    console.log("Form Values:", values);
    
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div className="container p-11 my-auto">
      <Form
        form={form}
        onFinish={handleFinish}
        onFinishFailed={finishFailed}
        layout="vertical"
        initialValues={initdata}
      >
        <div className="grid grid-cols-2 gap-6">
          <Form.Item
            name="type"
            label="Type"
            rules={[
              {
                required: true,
                message: "Please input the type",
              },
            ]}
          >
            <Select
              placeholder="Add options"
              onChange={(value) => setType(value)}
              options={[
                { label: "MCQ", value: "mcq" },
                { label: "Written", value: "written" },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="question"
            label="Question Text"
            rules={[
              { required: true, message: "Please input the question text" },
            ]}
          >
            <Input placeholder="Enter Question Text" />
          </Form.Item>

          {type === "mcq" && (
            <>
              <Form.Item
                name="options"
                label="Options"
                rules={[
                  {
                    required: true,
                    message: "Please input the options",
                    type: "array",
                  },
                ]}
              >
                <Select
                  mode="tags"
                  placeholder="Add options"
                  maxCount="4"
                ></Select>
              </Form.Item>
              <Form.Item
                name="answerIndex"
                label="Answer Index"
                rules={[
                  { required: true, message: "Please input the answer index" },
                ]}
              >
                <Input type="number" />
              </Form.Item>
            </>
          )}

          <Form.Item
            name="answerText"
            label="Answer Text"
            rules={[
              { required: true, message: "Please input the answer text" },
            ]}
          >
            <Input placeholder="Enter Answer Text" />
          </Form.Item>

          <Form.Item
            name="uploader"
            label="Uploader ID"
            rules={[
              { required: true, message: "Please input the uploader ID" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="subject"
            label="Subject ID"
            rules={[{ required: true, message: "Please input the subject ID" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="paper"
            label="Paper ID"
            rules={[{ required: true, message: "Please input the paper ID" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="topics"
            label="Topics ID"
            rules={[{ required: true, message: "Please input the topics ID" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="tags"
            label="Tags"
            rules={[
              {
                required: true,
                message: "Please input the tags",
                type: "array",
              },
            ]}
          >
            <Select mode="tags" maxCount={5} placeholder="Add tags"></Select>
          </Form.Item>

          <Form.Item
            name="institution"
            label="Institution"
            rules={[
              { required: true, message: "Please input the institution" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="year" label="Year">
            <Input type="number" />
          </Form.Item>

          <Form.Item
            name="difficulty"
            label="Difficulty"
            rules={[
              { required: true, message: "Please select the difficulty" },
            ]}
          >
            <Select placeholder="Select difficulty">
              <Option value="easy">Easy</Option>
              <Option value="medium">Medium</Option>
              <Option value="hard">Hard</Option>
            </Select>
          </Form.Item>

          <div className="grid grid-cols-2 gap-6">
            <Form.Item
              name="questionImage"
              label="Question Image"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload
                name="questionImage"
                listType="picture"
                beforeUpload={() => false}
                maxCount={5}
                onChange={(value) => setQimage(value.fileList)}
              >
                <Button disabled={qImage.length >= 5} icon={<UploadOutlined />}>
                  Upload
                </Button>
              </Upload>
            </Form.Item>

            <Form.Item
              name="solutionsImage"
              label="Solutions Image"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload
                name="solutionsImage"
                listType="picture"
                beforeUpload={() => false}
                maxCount={5}
                onChange={(value) => setSImage(value.fileList)}
              >
                <Button disabled={sImage.length >= 5} icon={<UploadOutlined />}>
                  Upload
                </Button>
              </Upload>
            </Form.Item>
          </div>
        </div>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default QuestionForm;
