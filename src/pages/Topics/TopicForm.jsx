import { Form, Select, Input, Button, Spin } from "antd";
import { useEffect, useState } from "react";
import { allChapters, subjectOption } from "../../utils/SelectOption";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { createTopicFn, updateTopicFn } from "../../transtackQuery/topicApis";
import PropTypes from "prop-types";

const initData = {};


const TopicForm = ({ mode = "create", data = {} }) => {
  // react query
  const {
    mutate: createTopic,
    isError,
    error,
    isPending,
  } = useMutation({ mutationKey: "createTopic", mutationFn: createTopicFn });

  const {
    mutate: updateTopic,
    isError: updateIsError,
    error: updateError,
    isPending: isUpdatePending,
    isSuccess: isUpdateSuccess,
  } = useMutation({ mutationKey: "updateTopic", mutationFn: updateTopicFn });

  // third party packages
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // state
  const [chapterOptions, setChapterOptions] = useState();
  const [formData, setFormData] = useState(initData);

  const { subject, paper } = formData;

  // effect
  useEffect(() => {
    if (mode === "edit" && data) {
      setFormData("updateId", data);
      form.setFieldsValue(data);
    }
  }, [mode, data]);

  useEffect(() => {
    if (subject && paper) {
      const chapters = allChapters.find((c) => c.subject === subject && c.paper === paper)?.chapters || [];
      setChapterOptions(chapters.map((c) => ({ label: <span className="capitalize">{c}</span>, value: c })));
    }
  }, [paper, subject]);

  // handler
  const handleFinish = async (values) => {
    if (mode === "create") {
      createTopic(values);
    } else {
      console.log({ values });
      updateTopic({ id: data._id, body: values });
    }
  };

  const finishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handlerValueChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  // others
  if (isError || updateIsError) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response.data?.message || updateError.response.data?.message || "Error Happen",
    });
  }

  if (isUpdateSuccess) {
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Topic Updated Successfully",
    });
    navigate("/topic");
  }

  return (
    <Spin spinning={isPending || isUpdatePending}>
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
    </Spin>
  );
};

TopicForm.propTypes = {
  mode: PropTypes.string,
  data: PropTypes.object,
};


export default TopicForm;
