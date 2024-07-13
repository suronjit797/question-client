import { motion } from "framer-motion";
import PropTypes from "prop-types";



const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.25, duration: 0.5, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};
PageTransition.propTypes = {
  children: PropTypes.object,
};
export default PageTransition;
