import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Radio, Select, Upload } from "antd";
const { Option } = Select;



const QuestionForm = () => {
    const [form] = Form.useForm();

    const handleFinish = (values) => {
      console.log("Form Values:", values);
      // process form values here
    };
  
    const normFile = (e) => {
      if (Array.isArray(e)) {
        return e;
      }
      return e?.fileList;
    };
  
    return (
      <div className="container p-11 my-auto">
        <Form form={form} onFinish={handleFinish} layout="vertical">
          <div className="grid grid-cols-2 gap-6">
            <Form.Item name="type" label="Type" rules={[{ required: true, message: "Please select the type" }]}>
              <Radio.Group>
                <Radio value="mcq">MCQ</Radio>
                <Radio value="written">Written</Radio>
              </Radio.Group>
            </Form.Item>
  
            <Form.Item
              name="question"
              label="Question Text"
              rules={[{ required: true, message: "Please input the question text" }]}
            >
              <Input.TextArea />
            </Form.Item>
  
            <Form.Item name="questionImage" label="Question Image" valuePropName="fileList" getValueFromEvent={normFile}>
              <Upload name="questionImage" listType="picture" beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
  
            <Form.Item
              name="options"
              label="Options"
              rules={[{ required: true, message: "Please input the options", type: "array" }]}
            >
              <Select mode="tags" placeholder="Add options"></Select>
            </Form.Item>
  
            <Form.Item
              name="answerIndex"
              label="Answer Index"
              rules={[{ required: true, message: "Please input the answer index" }]}
            >
              <Input type="number" />
            </Form.Item>
  
            <Form.Item
              name="answerText"
              label="Answer Text"
              rules={[{ required: true, message: "Please input the answer text" }]}
            >
              <Input.TextArea />
            </Form.Item>
  
            <Form.Item
              name="solutionsImage"
              label="Solutions Image"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload name="solutionsImage" listType="picture" beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
  
            <Form.Item
              name="uploader"
              label="Uploader ID"
              rules={[{ required: true, message: "Please input the uploader ID" }]}
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
  
            <Form.Item name="paper" label="Paper ID" rules={[{ required: true, message: "Please input the paper ID" }]}>
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
              rules={[{ required: true, message: "Please input the tags", type: "array" }]}
            >
              <Select mode="tags" placeholder="Add tags"></Select>
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
              <Select placeholder="Select difficulty">
                <Option value="easy">Easy</Option>
                <Option value="medium">Medium</Option>
                <Option value="hard">Hard</Option>
              </Select>
            </Form.Item>
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