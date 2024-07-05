import { BlockMath } from "react-katex";
import "./PrintMath.css";
import "katex/dist/katex.min.css";
import PropTypes from "prop-types";

function PrintMath({ text = "" }) {
  return (
    <div className="custom_math">
      {text.split("$").map((part, index) => {
        // console.log({ part });
        if (index % 2 === 0) {
          return <span key={index}>{part}</span>;
        } else {
          const correctedMath = part.replace(/\\\\/g, "\\");
          console.log({correctedMath})
          return <BlockMath key={index} math={correctedMath} />;
        }
      })}
    </div>
  );
}

PrintMath.propTypes = {
  text: PropTypes.string.isRequired,
};

export default PrintMath;
