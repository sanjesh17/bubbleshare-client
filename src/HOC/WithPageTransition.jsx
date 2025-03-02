import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

// HOC that applies a consistent transition for all page navigations
const withPageTransition = (WrappedComponent) => {
  const WithPageTransition = (props) => {
    const location = useLocation();

    // Animation variants for a smooth transition
    const pageVariants = {
      initial: {
        opacity: 0,
        y: 20,
      },
      animate: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.3,
          ease: "easeOut",
        },
      },
      exit: {
        opacity: 0,
        y: -20,
        transition: {
          duration: 0.2,
          ease: "easeIn",
        },
      },
    };

    return (
      <AnimatePresence mode="wait" initial={true}>
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          className="w-full h-full absolute"
        >
          <WrappedComponent {...props} />
        </motion.div>
      </AnimatePresence>
    );
  };

  // Add display name for better debugging
  const wrappedComponentName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";
  WithPageTransition.displayName = `withPageTransition(${wrappedComponentName})`;

  return WithPageTransition;
};

export default withPageTransition;
