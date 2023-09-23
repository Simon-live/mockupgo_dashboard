import { motion } from 'framer-motion';

const Modal = ({ visibility, children }) => {
  return (
    <div
      className={`w-full h-full grid place-items-center fixed z-10 top-0 left-0 bg-slate-900/30 backdrop-blur-sm transition-all duration-200 ${
        visibility ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
    >
      {visibility ? (
        <motion.div
          onClick={(e) => e.stopPropagation()}
          layout
          className="px-8 py-6 max-w-md rounded-3xl bg-white flex flex-col gap-8"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
        >
          {children}
        </motion.div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Modal;
