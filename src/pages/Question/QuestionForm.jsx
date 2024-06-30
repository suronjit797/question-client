import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, InputNumber, Select, Space, Switch, Upload } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
const { Option } = Select;

const initData = {
  type: "mcq",
  question: "asasd",
  options: ["a", "v", "b", "s", "d"],
  answerIndex: 3,
  answerText: "a",
  uploader: "667ff284c9191d4994ff7275",
  subject: "math",
  paper: "first",
  chapter: "algebra",
  topics: "667ff284c9191d4994ff7275",
  tags: ["a"],
  institution: "a",
  year: "333",
  difficulty: "medium",
  institutions: [{ name: "", year: null }],
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

  // state destructure
  const { type, solutionsImage, questionImage, subject, paper, optionType } = formData;

  // effect
  useEffect(() => {
    if (subject && paper) {
      const chapters = allChapters.find((c) => c.subject === subject && c.paper === paper)?.chapters || [];
      setChapterOptions(chapters.map((c) => ({ label: <span className="capitalize">{c}</span>, value: c })));
    }
  }, [paper, subject]);

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
              label="Subject"
              name="subject"
              rules={[
                {
                  required: true,
                  message: "Please select the subject",
                },
              ]}
            >
              <Select
                placeholder="Select Subject"
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
                  message: "Please select the paper",
                },
              ]}
            >
              <Select
                placeholder="Select Paper"
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
                  message: "Please select the chapter",
                },
              ]}
            >
              <Select placeholder="Select Chapter" options={chapterOptions} />
            </Form.Item>

            <Form.Item name="topics" label="Topics" rules={[{ required: true, message: "Please input the topics" }]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Type"
              name="type"
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
              layout="horizontal"
            >
              <Upload name="questionImage" listType="picture" beforeUpload={() => false} maxCount={5}>
                <Button disabled={questionImage?.length >= 5} icon={<UploadOutlined />}>
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
                        name={`option${item}`}
                        label={`Option ${item}`}
                        rules={[{ required: true, message: `Please input the option ${item}` }]}
                        getValueFromEvent={normFile}
                        layout="horizontal"
                      >
                        <Upload
                          name="questionImage"
                          listType="picture"
                          beforeUpload={() => false}
                          maxCount={5}
                          multiple={false}
                        >
                          <Button disabled={questionImage?.length >= 5} icon={<UploadOutlined />}>
                            Upload
                          </Button>
                        </Upload>
                      </Form.Item>
                    ))}
                  </>
                ) : (
                  <>
                    {[1, 2, 3, 4].map((item) => (
                      <Form.Item
                        key={item}
                        name={`option${item}`}
                        label={`Option ${item}`}
                        rules={[{ required: true, message: `Please input the option ${item}` }]}
                      >
                        <Input placeholder={`Enter option ${item}`} />
                      </Form.Item>
                    ))}
                  </>
                )}
                <Form.Item
                  name="answerIndex"
                  label="Answer Index"
                  rules={[{ required: true, message: "Please input the answer index" }]}
                >
                  {/* <Input type="number" /> */}
                  <Select
                    placeholder="Select answer index"
                    options={[1, 2, 3, 4].map((item) => ({ label: `Option ${item}`, value: item }))}
                  />
                </Form.Item>

                {/* <Form.Item
                  label="Options"
                  name="options"
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
                </Form.Item> */}
              </>
            ) : (
              <>
                <Form.Item
                  name="answerText"
                  label="Answer Text"
                  rules={[{ required: true, message: "Please input the answer text" }]}
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
                  message: "Please input the tags",
                },
              ]}
            >
              <Select mode="tags" maxTagCount="responsive" placeholder="Add tags" />
            </Form.Item>
            {/* 
            <Form.Item
              name="institution"
              label="Institution"
              rules={[{ required: true, message: "Please input the institution" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="year" label="Year">
              <Input type="number" />
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
                          rules={[{ required: true, message: "Please input the institution name" }]}
                        >
                          <Input placeholder="Institution Name" />
                        </Form.Item>
                      </div>
                      <Form.Item
                        {...restField}
                        name={[name, "year"]}
                        rules={[{ required: true, message: "Please input the year" }]}
                      >
                        <InputNumber placeholder="Year" min={1900} max={2100} />
                      </Form.Item>
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

            <Form.Item
              name="solutionsImage"
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
