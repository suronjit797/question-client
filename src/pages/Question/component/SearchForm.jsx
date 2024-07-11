import { Form, Input, Select } from "antd";
import { allChapters, subjectOption } from "../../../utils/SelectOption";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import { getAllTopicFn } from "../../../transtackQuery/topicApis";

const initData = {};

const SearchForm = ({ params, setParams }) => {
  const [form] = Form.useForm();
  const [chapterOptions, setChapterOptions] = useState();
  const [topicOptions, setTopicOptions] = useState([]);

  const { subject, paper, chapter } = params;

  const {
    data: topics,
    isError: isTopicError,
    error: topicError,
    isFetching: isTopicFetching,
  } = useQuery({
    queryKey: ["topic", subject, paper, chapter],
    queryFn: () => getAllTopicFn({ subject, paper, chapter, limit: 100 }),
  });

  useEffect(() => {
    const topicData = topics?.data || [];
    if (Array.isArray(topicData)) {
      const data = topicData.map((t) => ({ label: t.topic, value: t._id }));
      setTopicOptions(data);
    }
  }, [topics]);

  useEffect(() => {
    if (subject && paper) {
      const chapters = allChapters.find((c) => c.subject === subject && c.paper === paper)?.chapters || [];
      console.log(chapters);
      setChapterOptions(chapters.map((c) => ({ label: <span className="capitalize">{c}</span>, value: c })));
    }
  }, [paper, subject]);

  const changeHandler = (name, value) => {
    if (["subject", "paper", "chapter"].includes(name)) {
      setParams((pre) => ({ ...pre, [name]: value, topic: undefined }));
      form.setFieldsValue({ topic: undefined });
    } else {
      setParams((pre) => ({ ...pre, [name]: value }));
    }
  };

  return (
    <div className=" ">
      <Form form={form} name="QuestionSearch" layout="vertical" initialValues={initData}>
        <div className=" grid grid-cols-2 px-3 py-2 gap-4">
          <Form.Item name="subject" label="Subject">
            <Select
              showSearch
              placeholder="Select a Subject"
              filterOption={(input, option) => (option?.value ?? "").toLowerCase().includes(input.toLowerCase())}
              value={params.subject}
              onChange={(e) => changeHandler("subject", e)}
              options={subjectOption}
            />
          </Form.Item>
          <Form.Item name="paper" label="Paper">
            <Select
              showSearch
              placeholder="Select a Paper"
              filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
              value={params.paper}
              onChange={(e) => changeHandler("paper", e)}
              options={["১ম পত্র", "২য় পত্র"].map((item) => ({
                label: item,
                value: item,
              }))}
            />
          </Form.Item>
          <Form.Item name="chapter" label="Chapter">
            <Select
              showSearch
              placeholder="Select a Chapter"
              filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
              value={params.chapter}
              onChange={(e) => changeHandler("chapter", e)}
              options={chapterOptions}
            />
          </Form.Item>
          <Form.Item name="topic" label="Topic">
            <Select
              showSearch
              placeholder="Select a Topic"
              filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
              value={params.topic}
              onChange={(e) => changeHandler("topic", e)}
              options={topicOptions}
            />
          </Form.Item>
          <Form.Item label="Tags" name="tags">
            <Select mode="tags" value={params.tags} maxTagCount="responsive" placeholder="Add Tags" />
          </Form.Item>

          <Form.Item name="search" label="Search">
            <Input placeholder="Search" value={params.query} onChange={(e) => changeHandler("query", e.target.value)} />
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
