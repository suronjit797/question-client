import { Modal, Tag } from "antd";
import PropTypes from "prop-types";
import PrintMath from "../../components/PrintMath/PrintMath";
import { useMutation } from "@tanstack/react-query";
import { createQuestionFn, updateQuestionFn } from "../../transtackQuery/questionApis";
// import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const optionNumber = {
  option1: "a",
  option2: "b",
  option3: "c",
  option4: "d",
};

const QuestionPreviewModal = ({ isModalOpen, setIsModalOpen, data, mode = "create", form, setFormData }) => {
  const navigate = useNavigate();

  const handleReset = (excludeFields = []) => {
    const fieldsToReset = form.getFieldsValue();
    const resetValues = {};

    Object.keys(fieldsToReset).forEach((key) => {
      if (!excludeFields.includes(key)) {
        resetValues[key] = undefined;
      }
    });
    setFormData(resetValues);
    form.setFieldsValue(resetValues);
  };
  // fetch
  const {
    mutate,
    isError,
    error,
    isSuccess: createSuccess,
  } = useMutation({
    mutationKey: "createQuestion",
    mutationFn: createQuestionFn,
  });

  const {
    mutate: update,
    isError: isUpdateError,
    error: updateError,
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
    const formData = { ...data };
    if (mode === "create") {
      mutate(formData);
    } else {
      update({ id: data._id, body: formData });
    }
  };

  if (createSuccess) {
    setIsModalOpen(false);
    handleReset(["subject", "paper", "chapter", "topics"]);
  }
  if (updateSuccess) {
    setIsModalOpen(false);
    navigate("/question");
  }

  if (isError || isUpdateError) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response?.data?.message || updateError.response?.data?.message || "Error Happen",
    });
  }

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
                        Array.isArray(options[item]) && (
                          <img src={options[item][0]?.thumbUrl} alt={options[item][0]?.uid} />
                        )
                      )}
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <></>
          )}

          <hr className="my-3" />

          <div className="flex items-center gap-1">
            <span className="font-bold">Answer:</span>
            {type === "mcq" ? (
              <span>
                {optionType ? (
                  optionNumber[answerIndex]
                ) : (
                  <div className="flex items-center gap-2">
                    <p>{optionNumber[answerIndex]}.</p>
                    <p>
                      <PrintMath text={data.options[answerIndex]} />{" "}
                    </p>
                  </div>
                )}
              </span>
            ) : (
              <PrintMath text={answerText} />
            )}
          </div>

          <div className="capitalize">
            <span className="font-bold">Difficulty:</span> {difficulty}
          </div>
          <div>
            <span className="font-bold">Tags: </span>
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
  form: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default QuestionPreviewModal;
