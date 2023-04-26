import { useColorModeValue,Box } from "@chakra-ui/react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const FrameBox = motion(Box)
const TransitionEffect = () => {
  return (
    <>
      <FrameBox
        initial={{ x: "0%", width: "50%", opacity: 1 }}
        animate={{ x: "0%", width: "0%", opacity: 0 }}
        // exit={{ x: ["0%", "100%"], width: ["0%", "100%"] }}
        transition={{ duration: 0.8, ease: "easeIn" }}
        className="fixed top-0 bottom-0   h-screen z-30  "
        bg={useColorModeValue('black', 'white')}
        
      ></FrameBox>
      <FrameBox
        initial={{ x: "0%", width: "50%", opacity: 1 }}
        animate={{ x: "0%", width: "0%", opacity: 0 }}
        // exit={{ x: ["0%", "100%"], width: ["0%", "100%"] }}
        transition={{ duration: 0.8, ease: "easeInOut", opacity: { duration:4 } }}
        className="fixed top-0 bottom-0  right-0 h-screen z-20 "
        bg={useColorModeValue('black', 'white')}

      ></FrameBox>
      {/* <motion.div
        initial={{ x: "100%", width: "100%" }}
        animate={{ x: "0%", width: "0%" }}
        exit={{ x: ["0%", "100%"], width: ["0%", "100%"] }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed top-0 bottom-0 right-full w-screen h-screen z-30  bg-primary "
      ></motion.div>
      <motion.div
        initial={{ x: "100%", width: "100%" }}
        animate={{ x: "0%", width: "0%" }}
        transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
        className="fixed top-0 bottom-0 right-full w-screen h-screen z-20  bg-light "
      ></motion.div>
      <motion.div
        initial={{ x: "100%", width: "100%" }}
        animate={{ x: "0%", width: "0%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed top-0 bottom-0 right-full w-screen h-screen z-10  bg-dark "
      ></motion.div> */}
    </>
  );
};

export default TransitionEffect;
