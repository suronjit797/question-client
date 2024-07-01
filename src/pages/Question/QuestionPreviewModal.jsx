import {  Modal, Tag } from "antd";
import PropTypes from "prop-types";

const optionNumber = {
  option1: "a",
  option2: "b",
  option3: "c",
  option4: "d",
};

const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (e) {
    return false;
  }
};

const QuestionPreviewModal = ({ isModalOpen, setIsModalOpen, data }) => {
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
  } = data;
  const optionsItems = Object.keys(options);
  return (
    <>
      <Modal title="Preview" open={isModalOpen} onOk={handleClose} onCancel={handleClose}>
        <div>
          {institutions?.map((ins, ind) => (
            <h3 key={ind} className="text-md font-semibold text-center">
              {ins?.name} {ins?.year ? `(${ins?.year})` : ""}
            </h3>
          ))}
          {institutions.length > 0 && <hr className="my-3" />}

          <div className="grid grid-cols-2 gap-x-4 justify-between capitalize">
            <div>
              <span className="font-bold">Subject:</span> {subject} {paper ? `(${paper})` : ""}
            </div>
            <div>
              <span className="font-bold">Chapter:</span> {chapter}
            </div>
            <div>
              <span className="font-bold">Topics:</span> {topics}
            </div>
            <div>
              <span className="font-bold">Type:</span> {type}
            </div>
          </div>
          <hr className="my-3" />
          <div className="mb-2">
            {/* question image */}
            <div className=" my-3">
              {/* <h2 className="font-bold my-2">Question Image:</h2> */}
              <div className="flex gap-2 w-auto h-auto">
                {question?.images?.map((item, index) => {
                  return (
                    <div key={index} className=" m-auto">
                      <img src={item.thumbUrl ? item.thumbUrl : item} alt="Question Photo" className="w-1/5" />
                    </div>
                  );
                })}
              </div>
              <div className="font-bold">{question?.text}</div>
            </div>
            {/* <div>
              {typeof questionImage === "string" ? (
                <img src={questionImage} alt="question image" />
              ) : (
                <img src={questionImage[0].thumbUrl} alt={questionImage[0].uid} />
              )}
            </div> */}
          </div>
          {type === "mcq" ? (
            <div className="grid grid-cols-2 gap-5">
              {Array.isArray(optionsItems) &&
                optionsItems?.map((item, key) => (
                  <div key={key}>
                    <div className="flex items-center gap-4">
                      <div> {optionNumber[item]}. </div>
                      {typeof options[item] === "string" && isValidUrl(options[item]) ? (
                        <img src={options[item]} alt={item} />
                      ) : (
                        <div>
                          {typeof options[item] === "string" ? (
                            <div> {options[item]} </div>
                          ) : (
                            <img src={options[item]?.thumbUrl} alt={options[item]?.uid} />
                          )}
                        </div>
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
            <h2 className="font-bold mb-2">Question Image:</h2>
            <div className="flex gap-2 w-auto h-auto">
                {question?.images?.map((item, index) => {
                  return (
                    <div key={index} className=" m-auto">
                      <img src={item.thumbUrl ? item.thumbUrl : item} alt="Question Photo" className="w-1/5" />
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
};

export default QuestionPreviewModal;
