import { Form, Input, Select } from "antd";
import { allChapters, subjectOption } from "../../../utils/SelectOption";

const SearchForm = ({ params, setParams }) => {
  return (
    <div className=" grid grid-cols-2 px-3 py-2 gap-4">
      <Form.Item
        name="subject"
        label="Subject"
        rules={[
          {
            required: true,
            message: "Input the subject",
          },
        ]}
      >
        <Select
          showSearch
          placeholder="Select a subject"
          filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
          value={params.subject}
          onChange={(e) => setParams((pre) => ({ ...pre, subject: e }))}
          options={subjectOption}
        />
      </Form.Item>
      <Form.Item
        name="answerIndex"
        label="Chapter"
        rules={[
          {
            required: false,
            message: "Input the answer index",
          },
        ]}
      >
        <Select
          showSearch
          placeholder="Select a person"
          filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
          value={params.chapter}
          onChange={(e) => setParams((pre) => ({ ...pre, chapter: e }))}
          options={allChapters}
        />
      </Form.Item>
      <Form.Item
        name="answerIndex"
        label="Topic"
        rules={[
          {
            required: false,
            message: "Input the answer index",
          },
        ]}
      >
        <Select
          showSearch
          placeholder="Select a person"
          filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
          value={params.topic}
          onChange={(e) => setParams((pre) => ({ ...pre, topic: e }))}
          options={subjectOption}
        />
      </Form.Item>
      <Form.Item
        name="paper"
        label="Paper"
        rules={[
          {
            required: false,
            message: "Input the answer index",
          },
        ]}
      >
        <Select
          showSearch
          placeholder="Select a person"
          filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
          value={params.paper}
          onChange={(e) => setParams((pre) => ({ ...pre, paper: e }))}
          options={subjectOption}
        />
      </Form.Item>
      <Form.Item
        name="answerIndex"
        label="Search"
        rules={[
          {
            required: false,
            message: "Input the answer index",
          },
        ]}
      >
        <Input placeholder="" value={params.query} 
        onChange={(e) => setParams((pre) => ({ ...pre, query: e.target.value }))} />
      </Form.Item>
    </div>
  );
};

export default SearchForm;
