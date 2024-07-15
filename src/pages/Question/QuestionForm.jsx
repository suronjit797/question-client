import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Form, Input, Select, Switch, Upload, Divider, Spin, message } from "antd";
import { useEffect, useState, useRef } from "react";
import QuestionPreviewModal from "./QuestionPreviewModal";
import PropTypes from "prop-types";
import { allChapters, institutionOption, subjectOption } from "../../utils/SelectOption";
import { getAllTopicFn } from "../../transtackQuery/topicApis";
import Swal from "sweetalert2";
import axios from "axios";

const currentYear = new Date().getFullYear();
const yearOptions = [];

for (let i = currentYear; i >= 1990; i--) {
  yearOptions.push({ label: i + "", value: i + "" });
}
for (let i = currentYear; i >= 1990; i--) {
  yearOptions.push({ label: `${i - 1}-${i}`, value: `${i - 1}-${i}` });
}

const initData = {};

const QuestionForm = ({ mode = "create", data = {} }) => {
  // state
  const [formData, setFormData] = useState(initData);
  const [chapterOptions, setChapterOptions] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [topicOptions, setTopicOptions] = useState([]);
  const [topicName, setTopicName] = useState("");
  const { type, subject, paper, chapter, optionType, question, options, solution } = formData;

  const [form] = Form.useForm();
  const inputRef = useRef(null);

  const customUpload = ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append("photos", file);

    axios
      .post("/upload", formData)
      .then((response) => {
        // onSuccess(response.data, file);]
        if (response.data) {
          onSuccess(response.data, file);
        } else {
          throw new Error("No response data");
        }
      })
      .catch((error) => {
        onError(error);
        message.error("Upload failed");
      });
  };

  const {
    data: topics,
    isError: isTopicError,
    error: topicError,
    isFetching: isTopicFetching,
  } = useQuery({
    queryKey: ["topic", subject, paper, chapter],
    queryFn: () => getAllTopicFn({ subject, paper, chapter, limit: 100 }),
    refetchOnWindowFocus: false,
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const topicData = topics?.data || [];

  // effect
  useEffect(() => {
    if (mode === "edit" && data) {
      setFormData({ ...data, topics: data.topics?._id });
      form.setFieldsValue({ ...data, topics: data.topics?._id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, data]);

  useEffect(() => {
    if (Array.isArray(topicData)) {
      const data = topicData.map((t) => ({ label: t.topic, value: t._id }));
      setTopicOptions(data);
    }
  }, [topicData]);

  // state destructure

  // effect
  useEffect(() => {
    if (subject && paper) {
      const chapters = allChapters.find((c) => c.subject === subject && c.paper === paper)?.chapters || [];
      setChapterOptions(chapters.map((c) => ({ label: <span className="capitalize">{c}</span>, value: c })));
    }
  }, [paper, subject]);

  const addTopicItem = (e) => {
    e.preventDefault();
    setTopicOptions((pre) => [...pre, { label: topicName, value: topicName }]);
    form.setFieldsValue({ topics: topicName });
    setTopicName("");
    inputRef.current?.focus();
  };

  const handleFinish = async () => {
    setIsModalOpen(true);
  };

  const normFile = ({ fileList }) => {
    if (Array.isArray(fileList)) {
      return fileList.map((item) => item.response?.data).filter((item) => item !== undefined);
    }
    return fileList.response?.data ? [fileList.response?.data] : [];
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

  // others
  // if (isError || updateIsError) {
  if (isTopicError) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      // text: topicError.response.data?.message || updateError.response.data?.message || "Error Happen",
      text: topicError.response.data?.message || "Error Happen",
    });
  }

  return (
    <Spin spinning={false}>
      <div className="container mt-28 p-11 my-auto">
        <div className="max-w-[450px] mx-auto questionFrom">
          <Form
            form={form}
            name="createQuestion"
            onFinish={handleFinish}
            layout="vertical"
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
                  filterOption={(input, option) => {
                    return (option?.value ?? "")?.toLowerCase()?.includes(input?.toLowerCase());
                  }}
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
                  filterOption={(input, option) => (option?.value ?? "")?.toLowerCase()?.includes(input?.toLowerCase())}
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
                  filterOption={(input, option) => (option?.value ?? "")?.toLowerCase()?.includes(input?.toLowerCase())}
                  showSearch={true}
                  options={chapterOptions}
                />
              </Form.Item>

              <Form.Item name="topics" label="Topics" rules={[{ required: true, message: "Input the topics" }]}>
                <Select
                  placeholder="Select Topic"
                  filterOption={(input, option) => (option?.value ?? "")?.toLowerCase()?.includes(input?.toLowerCase())}
                  showSearch={true}
                  options={topicOptions}
                  loading={isTopicFetching}
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider
                        style={{
                          margin: "8px 0",
                        }}
                      />
                      <div className="w-full gap-2 mb-2 px-1 flex items-center">
                        <Input
                          placeholder="Please enter topic name"
                          ref={inputRef}
                          value={topicName}
                          onChange={(e) => setTopicName(e.target.value)}
                          onKeyDown={(e) => e.stopPropagation()}
                          className="w-full"
                        />
                        <Button type="primary" disabled={!topicName} icon={<PlusOutlined />} onClick={addTopicItem}>
                          New Topic
                        </Button>
                      </div>
                    </>
                  )}
                />
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
                  placeholder="Select Question Type"
                  filterOption={(input, option) => (option?.value ?? "")?.toLowerCase()?.includes(input?.toLowerCase())}
                  showSearch={true}
                  options={[
                    { label: "MCQ", value: "mcq" },
                    { label: "Written", value: "written" },
                  ]}
                />
              </Form.Item>

              <Form.Item
                name={["question", "text"]}
                label="Question Text"
                rules={[{ required: true, message: "Input the question text" }]}
              >
                <Input.TextArea rows={4} placeholder="Enter Question Text" />
              </Form.Item>

              <Form.Item
                name={["question", "images"]}
                label="Question Image"
                getValueFromEvent={normFile}
                layout="horizontal"
              >
                <Upload
                  fileList={question?.images}
                  onChange={({ fileList }) => {
                    form.setFieldsValue({ question: { ...question, images: fileList } });
                    setFormData({ ...formData, question: { ...question, images: fileList } });
                  }}
                  customRequest={customUpload}
                  listType="picture"
                  maxCount={5}
                >
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
                          name={["options", `option${item}`]}
                          label={`Option ${item}`}
                          rules={[{ required: true, message: `Input the option ${item}` }]}
                          getValueFromEvent={normFile}
                          layout="horizontal"
                          className="imageOption"
                        >
                          <Upload
                            customRequest={customUpload}
                            listType="picture"
                            maxCount={1}
                            fileList={options[`option${item}`]}
                            onChange={({ fileList }) => {
                              form.setFieldsValue({ options: { ...options, [`option${item}`]: fileList } });
                              setFormData({ ...formData, options: { ...options, [`option${item}`]: fileList } });
                            }}
                          >
                            {formData.options && formData.options[`option${item}`]?.length ? (
                              ""
                            ) : (
                              <Button icon={<UploadOutlined />}>Upload</Button>
                            )}
                          </Upload>
                          {/* <Upload
                            customRequest={customUpload}
                            listType="picture"
                            fileList={formData.options[`option${item}`]}
                            maxCount={1}
                            multiple={false}
                          >
                            {formData.options && formData.options[`option${item}`] ? (
                              ""
                            ) : (
                              <Button icon={<UploadOutlined />}>Upload</Button>
                            )}
                          </Upload> */}
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
                          // rules={[{ required: true, message: `Input the option ${item}` }]}
                        >
                          <Input placeholder={`Enter option ${item}`} />
                        </Form.Item>
                      ))}
                    </>
                  )}
                  <Form.Item
                    name="answerIndex"
                    label="Answer Index"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Input the answer index",
                    //   },
                    // ]}
                  >
                    <Select
                      placeholder="Select answer index"
                      filterOption={(input, option) =>
                        (option?.value ?? "")?.toLowerCase()?.includes(input?.toLowerCase())
                      }
                      showSearch={true}
                      options={[1, 2, 3, 4].map((item) => ({ label: `Option ${item}`, value: `option${item}` }))}
                    />
                  </Form.Item>
                </>
              ) : (
                <>
                  <Form.Item
                    name="answerText"
                    label="Answer Text"
                    // rules={[{ required: true, message: "Input the answer text" }]}
                  >
                    <Input placeholder="Enter Answer Text" />
                  </Form.Item>
                </>
              )}

              <Form.Item
                label="Tags"
                name="tags"
                // rules={[
                //   {
                //     required: true,
                //     message: "Input the tags",
                //   },
                // ]}
              >
                <Select mode="tags" maxTagCount="responsive" placeholder="Add Tags" />
              </Form.Item>

              <Form.List name="institutions">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <div className="flex gap-4 items-baseline" key={key}>
                        <div className="w-full">
                          <Form.Item
                            {...restField}
                            name={[name, "name"]}
                            // rules={[{ required: true, message: "Select the institution name" }]}
                          >
                            <Select
                              placeholder="Select Institution"
                              filterOption={(input, option) =>
                                (option?.value ?? "")?.toLowerCase()?.includes(input?.toLowerCase())
                              }
                              showSearch={true}
                              options={institutionOption}
                            ></Select>
                          </Form.Item>
                        </div>
                        {/*  */}

                        {/*  */}
                        <div className=" min-w-32">
                          <Form.Item
                            {...restField}
                            name={[name, "year"]}
                            // rules={[{ required: true, message: "Select the year" }]}
                          >
                            <Select
                              placeholder="Year"
                              options={yearOptions}
                              filterOption={(input, option) =>
                                (option?.value ?? "")?.toLowerCase()?.includes(input?.toLowerCase())
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
                // rules={[{ required: true, message: "Select the difficulty" }]}
              >
                <Select
                  placeholder="Select Difficulty"
                  filterOption={(input, option) => (option?.value ?? "")?.toLowerCase()?.includes(input?.toLowerCase())}
                  showSearch={true}
                  options={["easy", "medium", "hard"].map((item) => ({
                    label: <span className="capitalize">{item}</span>,
                    value: item,
                  }))}
                />
              </Form.Item>

              <Form.Item
                name={["solution", "text"]}
                label="Solution Text"
                // rules={[{ required: true, message: "Input the solution text" }]}
              >
                <Input.TextArea rows={4} placeholder="Enter Solution Text" />
              </Form.Item>

              <Form.Item
                name={["solution", "images"]}
                label="Solution Image"
                getValueFromEvent={normFile}
                layout="horizontal"
              >
                <Upload
                  fileList={solution?.images}
                  onChange={({ fileList }) => {
                    form.setFieldsValue({ solution: { ...solution, images: fileList } });
                    setFormData({ ...formData, solution: { ...solution, images: fileList } });
                  }}
                  customRequest={customUpload}
                  listType="picture"
                  maxCount={5}
                >
                  <Button disabled={solution?.images?.length >= 5} icon={<UploadOutlined />}>
                    Upload
                  </Button>
                </Upload>
              </Form.Item>
            </div>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {mode === "create" ? "Create" : "Update"}
              </Button>
            </Form.Item>
          </Form>
        </div>
        {isModalOpen && (
          <QuestionPreviewModal
            {...{ isModalOpen, setIsModalOpen, data: { ...data, ...formData }, setFormData, mode, form }}
          />
        )}
      </div>
    </Spin>
  );
};

QuestionForm.propTypes = {
  mode: PropTypes.string,
  data: PropTypes.object,
};

export default QuestionForm;
