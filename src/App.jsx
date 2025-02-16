import {
  motion,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

const gridContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const gridSquareVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const svgVariant = {
  hidden: {
    opacity: 0,
    pathLength: 0,
    fill: "rgba(252, 211, 77, 0)",
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    fill: "rgba(252, 211, 77, 1)",
  },
};

const App = () => {
  const { scrollYProgress: completionProgress } = useScroll();

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });
  const mainControls = useAnimation();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const paraOneValue = useTransform(scrollYProgress, [0, 1], ["-100%", "0%"]);

  const paraTwoValue = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView]);

  return (
    <div className="flex flex-col gap-10 overflow-x-hidden">
      <motion.section
        variants={gridContainerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-3 p-10 gap-10"
      >
        <motion.div
          variants={gridSquareVariants}
          className="bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10"
        >
          {/* Fade In */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "backOut", delay: 0.4 }}
            className="text-stone-100 text-center text-base font-bold"
          >
            Hello
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "backOut", delay: 0.4 }}
            className="text-stone-100 text-center text-base font-bold"
          >
            World
          </motion.div>
          {/* Fade In */}
        </motion.div>
        <motion.div
          variants={gridSquareVariants}
          className="bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10"
        >
          {/* Shape Shifting */}

          <motion.div
            className="w-1/3 h-1/3 bg-rose-500 shadow-md"
            animate={{
              scale: [1, 2, 2, 1],
              rotate: [0, 90, 90, 0],
              borderRadius: ["10%", "10%", "50%", "10%"],
            }}
            transition={{
              duration: 5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 1,
            }}
          />

          {/* Shape Shifting */}
        </motion.div>
        <motion.div
          variants={gridSquareVariants}
          className="bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10"
        >
          {/* Hover & Tap */}
          <motion.button
            whileTap={{ scale: 0.6 }}
            whileHover={{ scale: 1.1, backgroundColor: "#fff", color: "#000" }}
            transition={{ bounceDamping: 10, bounceStiffness: 600 }}
            className="bg-emerald-600 w-1/2 py-4 rounded-lg text-2xl text-gray-100 font-light tracking-wide"
          >
            Click Me
          </motion.button>
          {/* Hover & Tap */}
        </motion.div>
        <motion.div
          variants={gridSquareVariants}
          className="bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10"
        >
          {/* Drag */}
          <motion.div
            className="w-1/3 h-1/3 bg-orange-500 shadow-md rounded-lg cursor-grab"
            drag
            dragConstraints={{
              top: -125,
              bottom: 125,
              right: 125,
              left: -125,
            }}
            dragTransition={{
              bounceDamping: 10,
              bounceStiffness: 600,
            }}
          />
          {/* Drag */}
        </motion.div>
        <motion.div
          variants={gridSquareVariants}
          className="bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10"
        >
          {/* Scroll Progress */}
          <motion.div className="w-40 aspect-square bg-gray-50/20 rounded-xl">
            <motion.div
              className="w-full bg-gray-400 rounded-xl h-full origin-bottom"
              style={{ scaleY: completionProgress }}
            />
          </motion.div>
          {/* Scroll Progress */}
        </motion.div>
        <motion.div
          variants={gridSquareVariants}
          className="bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10"
        >
          {/* SVG Animation */}
          <motion.svg
            xmlns="http://www.w3.org.2000/svg"
            viewBox="0 0 24 24"
            className="w-1/2 stroke-amber-500 stroke-[0.5]"
          >
            <motion.path
              d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
              variants={svgVariant}
              initial="hidden"
              animate="visible"
              transition={{
                default: {
                  duration: 2,
                  ease: "easeInOut",
                  delay: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 1,
                },
                fill: {
                  duration: 2,
                  ease: "easeIn",
                  delay: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 1,
                },
              }}
            />
          </motion.svg>
          {/* SVG Animation */}
        </motion.div>
      </motion.section>
      {/* Page Scrolling */}
      <section className="flex flex-col gap-10 mb-10" ref={containerRef}>
        <motion.h1
          animate={mainControls}
          initial="hidden"
          variants={{
            hidden: { opacity: 0, y: 75 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ delay: 0.3 }}
          className="text-5xl tracking-wide text-slate-100 text-center"
        >
          Just Keep Scrolling
        </motion.h1>
        <motion.p style={{translateX: paraOneValue}} className="text-slate-100 font-thin text-4xl w-1/2 mx-auto">
          This is a basic tutorial on how to get up and running with Framer
          Motion with some TailwindCSS. If you enjoyed this video, please leave
          a like and also subscribe.
        </motion.p>
        <motion.p style={{translateX: paraTwoValue}} className="text-slate-100 font-thin text-4xl w-1/2 mx-auto">
          Have fun playing with Framer Motion. It is a very powerful library,
          when used properly. Add some life to your websites.
        </motion.p>
      </section>
      {/* Page Scrolling */}
    </div>
  );
};

export default App;
