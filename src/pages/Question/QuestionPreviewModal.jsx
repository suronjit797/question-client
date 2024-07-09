import { Modal, Tag } from "antd";
import PropTypes from "prop-types";
import PrintMath from "../../components/PrintMath/PrintMath";
import { useMutation } from "@tanstack/react-query";
import { createQuestionFn, updateQuestionFn } from "../../transtackQuery/questionApis";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";

const optionNumber = {
  option1: "a",
  option2: "b",
  option3: "c",
  option4: "d",
};

const QuestionPreviewModal = ({ isModalOpen, setIsModalOpen, data, mode = "create" }) => {
  // const navigate = useNavigate();
  // fetch
  const {
    mutate,
    // isError,
    // error,
    isSuccess: createSuccess,
  } = useMutation({
    mutationKey: "createQuestion",
    mutationFn: createQuestionFn,
  });

  const {
    mutate: update,
    //  isError:isUpdateError,
    // error,
    isSuccess: updateSuccess,
  } = useMutation({
    mutationKey: "updateQuestion",
    mutationFn: updateQuestionFn,
  });

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const {
    subject,
    paper,
    chapter,
    topics,
    type,
    question,
    options,
    answerIndex,
    optionType,
    tags,
    institutions,
    difficulty,
    answerText,
    solution,
  } = data;
  const optionsItems = Object?.keys(options || {});

  const handleOk = () => {
    const formData = new FormData();
    const { question, solution, tags, options, optionType, institutions, ...rest } = data;

    formData.append("optionType", Boolean(optionType));

    Object.keys(rest)?.forEach((key, value) => {
      if (rest[key] !== undefined && rest[key] !== null) {
        console.log({ key, value, v: rest[key] });
        formData.append(key, rest[key]);
      }
    });

    if (question?.text) {
      formData.append("question[text]", question.text);
    }
    if (solution?.text) {
      formData.append("solution[text]", solution.text);
    }

    if (question?.images) {
      question.images?.forEach((image, index) => {
        if (image.originFileObj) {
          formData.append(`question.images`, image.originFileObj);
        } else {
          formData.append(`question[images][${index}][uid]`, image.uid);
          formData.append(`question[images][${index}][name]`, image.name);
          formData.append(`question[images][${index}][thumbUrl]`, image.thumbUrl);
          formData.append(`question[images][${index}][size]`, image.size);
          formData.append(`question[images][${index}][type]`, image.type);
        }
      });
    }
    if (solution?.images) {
      solution.images?.forEach((image, index) => {
        if (image.originFileObj) {
          formData.append(`solution.images`, image.originFileObj);
        } else {
          formData.append(`solution[images][${index}][uid]`, image.uid);
          formData.append(`solution[images][${index}][name]`, image.name);
          formData.append(`solution[images][${index}][thumbUrl]`, image.thumbUrl);
          formData.append(`solution[images][${index}][size]`, image.size);
          formData.append(`solution[images][${index}][type]`, image.type);
        }
      });
    }
    if (tags) {
      tags?.forEach((tag, index) => {
        formData.append(`tags[${index}]`, tag);
      });
    }

    if (data?.options) {
      Object.keys(data?.options || {})?.forEach((key) => {
        console.log(options[key], key, data);
        if (!options[key]) {
          console.log("");
        } else if (typeof options[key] === "string") {
          formData.append(`options[${key}]`, options[key]);
        } else if (options[key][0]?.originFileObj) {
          formData.append(`options.${key}`, options[key][0].originFileObj);
        } else {
          formData.append(`options[${key}][uid]`, options[key].uid);
          formData.append(`options[${key}][name]`, options[key].name);
          formData.append(`options[${key}][thumbUrl]`, options[key].thumbUrl);
          formData.append(`options[${key}][size]`, options[key].size);
          formData.append(`options[${key}][type]`, options[key].type);
        }
      });
    }
    if (Array.isArray(institutions)) {
      institutions?.forEach((institution, index) => {
        formData.append(`institutions[${index}][name]`, institution.name);
        formData.append(`institutions[${index}][year]`, institution.year);
      });
    }
    console.log({ mode });
    if (mode === "create") {
      mutate(formData);
    } else {
      update({ id: data._id, body: formData });
    }
    if (createSuccess || updateSuccess) {
      setIsModalOpen(false);
    }
  };

  // if (isError) {
  //   Swal.fire({
  //     icon: "error",
  //     title: "Oops...",
  //     text: error.response.data?.message || "Error Happen",
  //   });
  // }

  // if (createSuccess) {
  //   Swal.fire({
  //     icon: "success",
  //     title: "Success",
  //     text: "Question Created Successfully",
  //   });
  //   navigate("/questionForm");
  // }

  return (
    <>
      <Modal title="Preview" open={isModalOpen} onOk={handleOk} onCancel={handleClose} centered className="my-4">
        <div>
          {institutions?.map((ins, ind) => (
            <h3 key={ind} className="text-md font-semibold text-center">
              {ins?.name} {ins?.year ? `(${ins?.year})` : ""}
            </h3>
          ))}
          {institutions?.length > 0 && <hr className="my-3" />}

          <div className="grid grid-cols-2 gap-x-4 justify-between capitalize">
            <div>
              <span className="font-bold">Subject:</span> {subject} {paper ? `(${paper})` : ""}
            </div>
            <div>
              <span className="font-bold">Chapter:</span> {chapter}
            </div>
            <div>
              <span className="font-bold">Topics:</span> {typeof topics === "string" ? topics : topics?.topic}
            </div>
            <div>
              <span className="font-bold">Type:</span> {type}
            </div>
          </div>

          <hr className="my-3" />

          <div className="mb-2">
            {/* question image */}
            <div className=" my-3">
              <h2 className="font-bold my-2">Question Image:</h2>
              <div className="flex gap-2 w-auto h-auto">
                {question?.images?.map((item, index) => {
                  return (
                    <div key={index} className="w-1/5">
                      <img src={item.thumbUrl} alt="Question Photo" />
                    </div>
                  );
                })}
              </div>
              <div className="font-bold">
                <PrintMath text={question?.text} />
              </div>
            </div>
          </div>
          {type === "mcq" ? (
            <div className="grid grid-cols-2 gap-5">
              {Array.isArray(optionsItems) &&
                optionsItems?.map((item, key) => (
                  <div key={key}>
                    <div className="grid grid-flow-col items-center gap-4">
                      <div> {optionNumber[item]}. </div>

                      {typeof options[item] === "string" ? (
                        <PrintMath text={options[item]} />
                      ) : (
                        <img src={options[item]?.thumbUrl} alt={options[item]?.uid} />
                      )}
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <></>
          )}

          <hr className="my-3" />

          <div>
            <span className="font-bold">Answer:</span>
            {type === "mcq" ? (
              <span>
                {optionType ? optionNumber[answerIndex] : `${optionNumber[answerIndex]}. ${data.options[answerIndex]}`}
              </span>
            ) : (
              <span>{answerText}</span>
            )}
          </div>

          <div className="capitalize">
            <span className="font-bold">Difficulty:</span> {difficulty}
          </div>
          <div>
            <span className="font-bold">Tags:</span>
            {Array.isArray(tags) &&
              tags?.map((tag, ind) => (
                <Tag color="geekblue" key={ind}>
                  {tag}
                </Tag>
              ))}
          </div>

          <hr className="my-3" />

          <div>
            <h2 className="font-bold mb-2">Solutions:</h2>
            <h2 className=" mb-2">
              <PrintMath text={solution?.text || ""} />
            </h2>
            <div className="flex gap-2 w-auto h-auto">
              {solution?.images?.map((item, index) => {
                return (
                  <div key={index} className="w-1/5">
                    <img src={item.thumbUrl} alt="Solution Photo" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

QuestionPreviewModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired,
};

export default QuestionPreviewModal;
