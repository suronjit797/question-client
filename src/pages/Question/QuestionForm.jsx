import { UploadOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, Select, Upload } from "antd";
import axios from "axios";
import { useState } from "react";
const { Option } = Select;

const initData = {
  type: "written",
  question: "asasd",
  options: ["a", "v", "b", "s", "d"],
  answerIndex: "3",
  answerText: "a",
  uploader: "667ff284c9191d4994ff7275",
  subject: "math",
  paper: "first",
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
  const [formData, setFormData] = useState({});
  const { type, solutionsImage, questionImage } = formData;

  const { mutate, isError, error } = useMutation({
    mutationKey: "createQuestion",
    mutationFn: createQuestion,
  });

  const handleFinish = async (values) => {
    console.log("Form Values:", values);

    // return;
    // const formData = new FormData();

    // // Append simple fields to formData
    // formData.append("type", values.type);
    // formData.append("question[text]", values.question);
    // formData.append("answerIndex", values.answerIndex);
    // formData.append("answerText", values.answerText);
    // formData.append("uploader", values.uploader);
    // formData.append("subject", values.subject);
    // formData.append("paper", values.paper);
    // formData.append("topics", values.topics);
    // formData.append("institution", values.institution);
    // formData.append("year", values.year);
    // formData.append("difficulty", values.difficulty);
    // formData.append("options", values.options);
    // formData.append("tags", values.tags);

    // values.questionImage?.forEach((file, index) => {
    //   formData.append(`questionImage`, file.originFileObj);
    // });
    // values.solutionsImage?.forEach((file, index) => {
    //   formData.append(`solutionsImage`, file.originFileObj);
    // });

    // try {
    //   mutate(formData);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div className="container p-11 my-auto">
      <div className="max-w-[450px] mx-auto">
        <Form
          form={form}
          onFinish={handleFinish}
          onFinishFailed={finishFailed}
          layout="vertical"
          initialValues={initData}
          onValuesChange={(_, all) => setFormData(all)}
        >
          {/* <div className="grid grid-cols-2 gap-6"> */}
          <div>
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
                options={[
                  { label: "MCQ", value: "mcq" },
                  { label: "Written", value: "written" },
                ]}
              />
            </Form.Item>

            <Form.Item
              name="question"
              label="Question Text"
              rules={[{ required: true, message: "Please input the question text" }]}
            >
              <Input placeholder="Enter Question Text" />
            </Form.Item>

            <Form.Item
              name="questionImage"
              label="Question Image"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload name="questionImage" listType="picture" beforeUpload={() => false} maxCount={5}>
                <Button disabled={questionImage?.length >= 5} icon={<UploadOutlined />}>
                  Upload
                </Button>
              </Upload>
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
                  <Select mode="tags" placeholder="Add options" maxCount="4" />
                </Form.Item>
                <Form.Item
                  name="answerIndex"
                  label="Answer Index"
                  rules={[{ required: true, message: "Please input the answer index" }]}
                >
                  <Input type="number" />
                </Form.Item>
              </>
            )}

            <Form.Item
              name="answerText"
              label="Answer Text"
              rules={[{ required: true, message: "Please input the answer text" }]}
            >
              <Input placeholder="Enter Answer Text" />
            </Form.Item>

            <Form.Item
              name="solutionsImage"
              label="Solutions Image"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload name="solutionsImage" listType="picture" beforeUpload={() => false} maxCount={5}>
                <Button disabled={solutionsImage?.length >= 5} icon={<UploadOutlined />}>
                  Upload
                </Button>
              </Upload>
            </Form.Item>

            <Form.Item
              name="uploader"
              label="Uploader"
              rules={[{ required: true, message: "Please input the uploader" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="subject"
              label="Subject"
              rules={[
                {
                  required: true,
                  message: "Please input the subject",
                },
              ]}
            >
              <Select
                placeholder="Add Subject"
                options={["physics", "chemistry", "math"].map((item) => ({
                  label: <span className="capitalize">{item}</span>,
                  value: item,
                }))}
              />
            </Form.Item>

            <Form.Item
              name="paper"
              label="Subject"
              rules={[
                {
                  required: true,
                  message: "Please input the paper",
                },
              ]}
            >
              <Select
                placeholder="Add Paper"
                options={["first", "second"].map((item) => ({
                  label: <span className="capitalize">{item}</span>,
                  value: item,
                }))}
              />
            </Form.Item>

            <Form.Item name="topics" label="Topics" rules={[{ required: true, message: "Please input the topics" }]}>
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
              <Select mode="tags" maxCount={5} placeholder="Add tags" />
            </Form.Item>

            <Form.Item
              name="institution"
              label="Institution"
              rules={[{ required: true, message: "Please input the institution" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="year" label="Year">
              <Input type="number" />
            </Form.Item>

            <Form.Item
              name="difficulty"
              label="Difficulty"
              rules={[{ required: true, message: "Please select the difficulty" }]}
            >
              <Select
                placeholder="Select difficulty"
                options={["easy", "medium", "hard"].map((item) => ({
                  label: <span className="capitalize">{item}</span>,
                  value: item,
                }))}
              />
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

export default QuestionForm;
