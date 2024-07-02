import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, InputNumber, Select, Switch, Upload } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import QuestionPreviewModal from "./QuestionPreviewModal";
import PropTypes from "prop-types";

const yearOptions = [];
for (let i = 1990; i <= new Date().getFullYear(); i++) {
  yearOptions.push(
    { label: i + "", value: i }
    // <Select.Option key={i} value={i}>
    //   {i}
    // </Select.Option>
  );
}
for (let i = 1990; i <= new Date().getFullYear(); i++) {
  yearOptions.push(
    { label: `${i - 1}-${i}`, value: `${i - 1} - ${i}` }
    // <Select.Option key={i} value={i}>
    //   {i}
    // </Select.Option>
  );
}

const initData = {
  type: "mcq",
  question: {
    text: "Which one aa?",
    images: [
      {
        uid: "uid",
        name: "xx.png",
        thumbUrl:
          "https://img.freepik.com/free-photo/international-day-education-cartoon-style_23-2151007392.jpg?t=st=1719590954~exp=1719594554~hmac=aa679c72e2073faee48ca676f6e292e86a109a464ec63264f0b7ac35d77719fe&w=826",
      },
    ],
  },
  // solutions: [
  //   "https://img.freepik.com/free-photo/international-day-education-cartoon-style_23-2151007392.jpg?t=st=1719590954~exp=1719594554~hmac=aa679c72e2073faee48ca676f6e292e86a109a464ec63264f0b7ac35d77719fe&w=826",
  // ],
  solution: {
    text: "solution",
    images: [
      {
        uid: "uid",
        name: "xx.png",
        thumbUrl:
          "https://img.freepik.com/free-photo/international-day-education-cartoon-style_23-2151007392.jpg?t=st=1719590954~exp=1719594554~hmac=aa679c72e2073faee48ca676f6e292e86a109a464ec63264f0b7ac35d77719fe&w=826",
      },
    ],
  },
  answerIndex: "option1",
  answerText: "a",
  uploader: "667ff284c9191d4994ff7275",
  subject: "math",
  paper: "first",
  chapter: "algebra",
  topics: "667ff284c9191d4994ff7275",
  tags: ["a", "b", "c", "d", "e", "f", "g", "h"],
  institution: "a",
  year: "333",
  difficulty: "medium",
  options: {
    // option1: "http://localhost:5000/uploads/images/1719680816333-Screenshot_from_2024-06-29_15-43-04.png",
    option1: "aa",
    option2: "bb",
    option3: "cc",
    option4: "dd",
  },
  institutions: [
    { name: "RU", year: 2000 },
    { name: "DU", year: 2001 },
  ],
};

const allChapters = [
  { subject: "physics", paper: "first", chapters: ["kinematics", "dynamics", "thermodynamics"] },
  { subject: "physics", paper: "second", chapters: ["electromagnetism", "optics", "quantum mechanics"] },
  { subject: "chemistry", paper: "first", chapters: ["atomic structure", "periodic table", "chemical bonding"] },
  {
    subject: "chemistry",
    paper: "second",
    chapters: ["organic chemistry", "inorganic chemistry", "physical chemistry"],
  },
  { subject: "math", paper: "first", chapters: ["algebra", "calculus", "trigonometry"] },
  { subject: "math", paper: "second", chapters: ["statistics", "probability", "geometry"] },
];

const finishFailed = (values) => {
  console.log("error", values);
};

const createQuestion = (body) => {
  console.log({ body });
  return axios.post("/questions", body);
};

const QuestionForm = ({ mode = "create", data = {} }) => {
  const [form] = Form.useForm();
  // fetch
  const { mutate, isError, error } = useMutation({
    mutationKey: "createQuestion",
    mutationFn: createQuestion,
  });

  // state
  const [formData, setFormData] = useState(initData);
  const [chapterOptions, setChapterOptions] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // state destructure
  const { type, solutionsImage, subject, paper, optionType, question, solution } = formData;

  // effect
  useEffect(() => {
    if (subject && paper) {
      const chapters = allChapters.find((c) => c.subject === subject && c.paper === paper)?.chapters || [];
      setChapterOptions(chapters.map((c) => ({ label: <span className="capitalize">{c}</span>, value: c })));
    }
  }, [paper, subject]);

  const handleFinish = async (values) => {
    console.log("Form Values:", values);

    setIsModalOpen(true);

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

  const normSingleFile = (e) => {
    console.log(e);
    if (Array.isArray(e)) {
      return e[0];
    }
    return e?.fileList[0];
  };

  const handlerValueChange = (item, all) => {
    if (Object.keys(item)[0] === "optionType") {
      const opt = { option1: undefined, option2: undefined, option3: undefined, option4: undefined };
      form.setFieldsValue({ options: opt });
      setFormData({ ...all, options: opt });
    } else {
      setFormData(all);
    }
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
          {/* <div className="grid grid-cols-2 gap-6"> */}
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
                filterOption={(input, option) =>
                  (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                }
                showSearch={true}
                options={["physics", "chemistry", "math"].map((item) => ({
                  label: <span className="capitalize">{item}</span>,
                  value: item,
                }))}
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
                filterOption={(input, option) =>
                  (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                }
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

            <Form.Item name="topics" label="Topics" rules={[{ required: true, message: "Input the topics" }]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Type"
              name="type"
              rules={[
                {
                  required: true,
                  message: "Input the type",
                },
              ]}
            >
              <Select
                placeholder="Add options"
                filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
                showSearch={true}
                options={[
                  { label: "MCQ", value: "mcq" },
                  { label: "Written", value: "written" },
                ]}
              />
            </Form.Item>

            <Form.Item
              name={["question", "text"]}
              // name="question"
              label="Question Text"
              rules={[{ required: true, message: "Input the question text" }]}
            >
              <Input.TextArea rows={4} placeholder="Enter Question Text" />
            </Form.Item>

            <Form.Item
              name={["question", "images"]}
              label="Question Image"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              layout="horizontal"
            >
              <Upload listType="picture" beforeUpload={() => false} maxCount={5}>
                <Button disabled={question?.images?.length >= 5} icon={<UploadOutlined />}>
                  Upload
                </Button>
              </Upload>
            </Form.Item>

            {type === "mcq" ? (
              <>
                <Form.Item label="Options Type Image" name="optionType" layout="horizontal">
                  <Switch />
                </Form.Item>
                {optionType ? (
                  <>
                    {[1, 2, 3, 4].map((item) => (
                      <Form.Item
                        key={item}
                        // name={`option${item}`}
                        name={["options", `option${item}`]}
                        label={`Option ${item}`}
                        rules={[{ required: true, message: `Input the option ${item}` }]}
                        // getValueFromEvent={normFile}
                        getValueFromEvent={normSingleFile}
                        layout="horizontal"
                        className="imageOption"
                      >
                        <Upload listType="picture" beforeUpload={() => false} maxCount={1} multiple={false}>
                          {formData.options && formData.options[`option${item}`] ? (
                            ""
                          ) : (
                            <Button icon={<UploadOutlined />}>Upload</Button>
                          )}
                        </Upload>
                      </Form.Item>
                    ))}
                  </>
                ) : (
                  <>
                    {[1, 2, 3, 4].map((item) => (
                      <Form.Item
                        key={item}
                        // name={`option${item}`}
                        name={["options", `option${item}`]}
                        label={`Option ${item}`}
                        rules={[{ required: true, message: `Input the option ${item}` }]}
                      >
                        <Input placeholder={`Enter option ${item}`} />
                      </Form.Item>
                    ))}
                  </>
                )}
                <Form.Item
                  name="answerIndex"
                  label="Answer Index"
                  rules={[
                    {
                      required: true,
                      message: "Input the answer index",
                    },
                  ]}
                >
                  {/* <Input type="number" /> */}
                  <Select
                    placeholder="Select answer index"
                    filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
                    showSearch={true}
                    options={[1, 2, 3, 4].map((item) => ({ label: `Option ${item}`, value: `option${item}` }))}
                  />
                </Form.Item>

                {/* <Form.Item
                  label="Options"
                  name="options"
                  rules={[
                    {
                      required: true,
                      message: "Input the options",
                      type: "array",
                    },
                  ]}
                >
                  <Select mode="tags" placeholder="Add options" maxCount="4" />
                </Form.Item>
                <Form.Item
                  name="answerIndex"
                  label="Answer Index"
                  rules={[{ required: true, message: "Input the answer index" }]}
                >
                  <Input type="number" />
                </Form.Item> */}
              </>
            ) : (
              <>
                <Form.Item
                  name="answerText"
                  label="Answer Text"
                  rules={[{ required: true, message: "Input the answer text" }]}
                >
                  <Input placeholder="Enter Answer Text" />
                </Form.Item>
              </>
            )}

            <Form.Item
              label="Tags"
              name="tags"
              rules={[
                {
                  required: true,
                  message: "Input the tags",
                },
              ]}
            >
              <Select mode="tags" maxTagCount="responsive" placeholder="Add tags" />
            </Form.Item>
            {/* 
            <Form.Item
              name="institution"
              label="Institution"
              rules={[{ required: true, message: "Input the institution" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="year" label="Year">
              <Input type="number" />
            </Form.Item> */}

            {/* institutions name */}
            {/* <Form.Item
              name="institutions"
              label="Institutions"
              rules={[{ required: true, message: "Select the difficulty" }]}
            >
              <Select
                placeholder="Select difficulty"
                options={["DU", "RU", "BSMRSTU"].map((item) => ({
                  label: <span className="capitalize">{item}</span>,
                  value: item,
                }))}
              />
            </Form.Item> */}

            <Form.List name="institutions">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div className="flex gap-4 items-baseline" key={key}>
                      <div className="w-full">
                        <Form.Item
                          {...restField}
                          name={[name, "name"]}
                          rules={[{ required: true, message: "Select the institution name" }]}
                        >
                          <Select
                            placeholder="Select Institution"
                            filterOption={(input, option) =>
                              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                            }
                            showSearch={true}
                          >
                            {/* Add options here */}
                            <Select.Option value="BSMRSTU">BSMRSTU</Select.Option>
                            <Select.Option value="DU">DU</Select.Option>
                            <Select.Option value="RU">RU</Select.Option>
                            {/* Add more options as needed */}
                          </Select>
                        </Form.Item>
                      </div>
                      {/*  */}

                      {/*  */}
                      <div className=" min-w-32">
                        <Form.Item
                          {...restField}
                          name={[name, "year"]}
                          rules={[{ required: true, message: "Select the year" }]}
                        >
                          <Select
                            placeholder="Year"
                            options={yearOptions}
                            filterOption={(input, option) =>
                              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                            }
                            showSearch={true}
                          />
                        </Form.Item>
                      </div>
                      {fields.length > 1 && <MinusCircleOutlined onClick={() => remove(name)} />}
                    </div>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                      Add Institution
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <Form.Item
              name="difficulty"
              label="Difficulty"
              rules={[{ required: true, message: "Select the difficulty" }]}
            >
              <Select
                placeholder="Select difficulty"
                filterOption={(input, option) =>
                  (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                }
                showSearch={true}
                options={["easy", "medium", "hard"].map((item) => ({
                  label: <span className="capitalize">{item}</span>,
                  value: item,
                }))}
              />
            </Form.Item>

            {/* <Form.Item
              name="solutions"
              label="Solutions Image"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              layout="horizontal"
            >
              <Upload name="solutionsImage" listType="picture" beforeUpload={() => false} maxCount={5}>
                <Button disabled={solutionsImage?.length >= 5} icon={<UploadOutlined />}>
                  Upload
                </Button>
              </Upload>
            </Form.Item> */}
            <Form.Item
              name={["solution", "text"]}
              label="Solution Text"
              rules={[{ required: true, message: "Input the solution text" }]}
            >
              <Input.TextArea rows={4} placeholder="Enter solution Text" />
            </Form.Item>

            <Form.Item
              name={["solution", "images"]}
              label="Solution Image"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              layout="horizontal"
            >
              <Upload listType="picture" beforeUpload={() => false} maxCount={5}>
                <Button disabled={solution?.images?.length >= 5} icon={<UploadOutlined />}>
                  Upload
                </Button>
              </Upload>
            </Form.Item>
          </div>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      {isModalOpen && <QuestionPreviewModal {...{ isModalOpen, setIsModalOpen, data: formData }} />}
    </div>
  );
};

QuestionForm.propTypes = {
  mode: PropTypes.string,
  data: PropTypes.object,
};

export default QuestionForm;
