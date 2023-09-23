import { motion } from 'framer-motion';

const SideBar = ({ visibility, setVisibility, children }) => {
  return (
    <div
      onClick={() => setVisibility(!visibility)}
      className={`w-full h-full fixed z-10 top-0 left-0 bg-slate-900/30 backdrop-blur-sm transition-all duration-200 ${
        visibility ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
    >
      {/* 侧拉抽屉 */}
      <motion.div
        onClick={(e) => e.stopPropagation()}
        layout
        transition={{
          type: 'spring',
          damping: 21,
          stiffness: 140,
        }}
        className={`w-4/5 md:w-1/2 lg:w-1/3 min-w-lg h-full absolute top-0 overflow-hidden bg-white ${
          !visibility ? '-right-full' : 'right-0'
        }`}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default SideBar;
