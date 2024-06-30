import { Button, Modal, Tag } from "antd";
import PropTypes from "prop-types";

const optionNumber = {
  option1: "a",
  option2: "b",
  option3: "c",
  option4: "d",
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
    option1,
    option2,
    option3,
    option4,
    answerIndex,
    optionType,
    tags,
    institutions,
    difficulty,
    answerText,
  } = data;
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
          <div className="font-bold">{question}</div>
          {type === "mcq" ? (
            <div className="grid grid-cols-2 gap-5">
              <div className="flex items-center gap-2">
                <div>a.</div>
                {optionType && Array.isArray(option1) ? (
                  <div>
                    {" "}
                    <img src={option1[0].thumbUrl} alt={option1[0].uid} />
                  </div>
                ) : (
                  <div> {option1} </div>
                )}{" "}
              </div>
              <div className="flex items-center gap-2">
                <div>b.</div>
                {optionType && Array.isArray(option2) ? (
                  <div>
                    {" "}
                    <img src={option2[0].thumbUrl} alt={option2[0].uid} />
                  </div>
                ) : (
                  <div> {option2} </div>
                )}{" "}
              </div>
              <div className="flex items-center gap-2">
                <div>c.</div>
                {optionType && Array.isArray(option3) ? (
                  <div>
                    {" "}
                    <img src={option3[0].thumbUrl} alt={option3[0].uid} />
                  </div>
                ) : (
                  <div> {option3} </div>
                )}{" "}
              </div>
              <div className="flex items-center gap-2">
                <div>d.</div>
                {optionType && Array.isArray(option4) ? (
                  <div>
                    {" "}
                    <img src={option4[0].thumbUrl} alt={option4[0].uid} />
                  </div>
                ) : (
                  <div> {option4} </div>
                )}{" "}
              </div>
            </div>
          ) : (
            <></>
          )}
          <hr className="my-3" />
          <div>
            <span className="font-bold">Answer:</span>{" "}
            {type === "mcq" ? (
              <span>
                {optionType ? optionNumber[answerIndex] : `${optionNumber[answerIndex]}. ${data[answerIndex]}`}
              </span>
            ) : (
              <span>{answerText}</span>
            )}
          </div>
          <div className="capitalize">
            <span className="font-bold">Difficulty:</span> {difficulty}
          </div>
          <div>
            <span className="font-bold">Tags:</span>{" "}
            {Array.isArray(tags) &&
              tags?.map((tag, ind) => (
                <Tag color="geekblue" key={ind}>
                  {tag}
                </Tag>
              ))}
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
