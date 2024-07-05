import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Form, Input, Select, Switch, Upload, Divider, Spin } from "antd";
import { useEffect, useState, useRef } from "react";
import QuestionPreviewModal from "./QuestionPreviewModal";
import PropTypes from "prop-types";
import { allChapters, institutionOption, subjectOption } from "../../utils/SelectOption";
import { getAllTopicFn } from "../../transtackQuery/topicApis";
import Swal from "sweetalert2";

const yearOptions = [];
for (let i = 1990; i <= new Date().getFullYear(); i++) {
  yearOptions.push({ label: i + "", value: i });
}
for (let i = 1990; i <= new Date().getFullYear(); i++) {
  yearOptions.push({ label: `${i - 1}-${i}`, value: `${i - 1}-${i}` });
}

const finishFailed = (values) => {
  console.log("error", values);
};

const initData = {};

const QuestionForm = ({ mode = "create", data = {} }) => {
  const [form] = Form.useForm();
  const inputRef = useRef(null);

  const {
    data: topicData,
    isError: isTopicError,
    error: topicError,
    isFetching: isTopicFetching,
  } = useQuery({
    queryKey: ["topic"],
    queryFn: getAllTopicFn,
  });

  // state
  const [formData, setFormData] = useState(initData);
  const [chapterOptions, setChapterOptions] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [topicOptions, setTopicOptions] = useState([]);
  const [topicName, setTopicName] = useState("");

  // effect
  useEffect(() => {
    if (mode === "edit" && data) {
      setFormData(data);
      form.setFieldsValue(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, data]);

  useEffect(() => {
    console.log({ topicData });
    if (Array.isArray(topicData)) {
      const data = topicData.map((t) => ({ label: t.topic, value: t._id }));
      setTopicOptions(data);
    }
  }, [topicData]);

  // state destructure
  const { type, subject, paper, optionType, question, solution } = formData;

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
    // setItems([...items, topicName || `New item ${index++}`]);
    setTopicName("");
    inputRef.current?.focus();
  };

  const handleFinish = async (values) => {
    console.log("Form Values:", values);
    setIsModalOpen(true);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  // const normSingleFile = (e) => {
  //   console.log(e);
  //   if (Array.isArray(e)) {
  //     return e[0];
  //   }
  //   return e?.fileList[0];
  // };

  const handlerValueChange = (item, all) => {
    console.log(item);
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
    <Spin spinning={isTopicFetching}>
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
                  filterOption={(input, option) => {
                    console.log({ input, option });
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
                <Input.TextArea
                  rows={4}
                  onChange={(e) => console.log({ e: String.raw`${e.target.value}` })}
                  placeholder="Enter Question Text"
                />
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
                          getValueFromEvent={normFile}
                          layout="horizontal"
                          className="imageOption"
                        >
                          <Upload
                            listType="picture"
                            fileList={
                              formData.options[`option${item}`]
                                ? Array.isArray(formData.options[`option${item}`])
                                  ? formData.options[`option${item}`]
                                  : [formData.options[`option${item}`]]
                                : undefined
                            }
                            beforeUpload={() => false}
                            maxCount={1}
                            multiple={false}
                          >
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
                            rules={[{ required: true, message: "Select the year" }]}
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
                rules={[{ required: true, message: "Select the difficulty" }]}
              >
                <Select
                  placeholder="Select difficulty"
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
                {mode === "create" ? "Create" : "Update"}
              </Button>
            </Form.Item>
          </Form>
        </div>
        {isModalOpen && (
          <QuestionPreviewModal {...{ isModalOpen, setIsModalOpen, data: { ...data, ...formData }, mode }} />
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
