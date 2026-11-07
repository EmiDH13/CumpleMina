/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

const SectionWrapper = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center overflow-clip">
      <div className="w-[450px] h-screen flex items-center justify-center overflow-clip">
        <motion.div
          className="w-[300px] h-[300px] relative mx-auto"
          initial={{ opacity: 0, visibility: "hidden" }}
          animate={{ opacity: 1, visibility: "visible" }}
          transition={{duration: 1.2}}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper;
