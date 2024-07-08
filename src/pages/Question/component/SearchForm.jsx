import { Form, Input, Select } from "antd";
import { allChapters, subjectOption } from "../../../utils/SelectOption";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const initData = {};

const SearchForm = ({ params, setParams }) => {
  const [chapterOptions, setChapterOptions] = useState();
  const { subject, paper } = params;


  useEffect(() => {
    if (subject && paper) {
      const chapters = allChapters.find((c) => c.subject === subject && c.paper === paper)?.chapters || [];
      console.log(chapters)
      setChapterOptions(chapters.map((c) => ({ label: <span className="capitalize">{c}</span>, value: c })));
    }
  }, [paper, subject]);

  return (
    <div className=" ">
      <Form initialValues={initData}>
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
              placeholder="Select a Paper"
              filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
              value={params.paper}
              onChange={(e) => setParams((pre) => ({ ...pre, paper: e }))}
              options={["first", "second"].map((item) => ({
                label: <span className="capitalize">{item}</span>,
                value: item,
              }))}
            />
          </Form.Item>
          <Form.Item
            name="chapter"
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
              placeholder="Select a Chapter"
              filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
              value={params.chapter}
              onChange={(e) => setParams((pre) => ({ ...pre, chapter: e }))}
              options={chapterOptions}
            />
          </Form.Item>
          <Form.Item
            name="topic"
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
              placeholder="Select a Topic"
              filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
              value={params.topic}
              onChange={(e) => setParams((pre) => ({ ...pre, topic: e }))}
              options={subjectOption}
            />
          </Form.Item>

          <Form.Item
            name="search"
            label="Search"
            rules={[
              {
                required: false,
                message: "Input the answer index",
              },
            ]}
          >
            <Input
              placeholder="Search"
              value={params.query}
              onChange={(e) => setParams((pre) => ({ ...pre, query: e.target.value }))}
            />
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

SearchForm.propTypes = {
  params: PropTypes.object,
  setParams: PropTypes.object,
};

export default SearchForm;
