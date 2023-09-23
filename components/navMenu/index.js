'use client';
import { Children, useState, Fragment } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavMenuSection from './navMenuSection';
import CustomLogo from '@components/customLogo';
import SpringButton from '@components/springButton';

const NavMenu = ({ data }) => {
  // 折叠导航可视化标识
  const [visible, setVisible] = useState(true);
  // 导航选中项标题
  const [currentPage, setPage] = useState('');

  return (
    <Fragment>
      {/* 适配1024px以上大屏，常驻导航 */}
      <div className="hidden lg:block w-auto transition px-4 py-8 space-y-6 bg-white shadow-[0_0_16px_0] shadow-slate-100 overflow-y-scroll scroll-hidden">
        <div className="px-4 pb-8">
          <CustomLogo />
        </div>
        {Children.toArray(
          data.map((section) => <NavMenuSection data={section} />),
        )}
      </div>

      {/* 适配1024px以下小屏幕，折叠导航 */}

      {/* 顶栏 */}
      <div className="lg:hidden w-full sticky top-0 left-0 flex justify-between items-center px-6 py-4 bg-white">
        <div className="flex-none">
          <SpringButton
            onClick={() => setVisible(!visible)}
            className="btn-icon bg-slate-100 text-sm"
          >
            <FontAwesomeIcon icon="fa-solid fa-bars-progress" />
          </SpringButton>
        </div>
        <div className="flex-auto text-center">
          <h1 className="font-semibold">{currentPage}</h1>
        </div>
        <div className="flex-none">
          <SpringButton className="btn-icon bg-slate-100 text-sm">
            <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" />
          </SpringButton>
        </div>
      </div>

      {/* 折叠导航 */}
      <div
        onClick={() => setVisible(!visible)}
        className={`w-full h-full absolute z-10 top-0 left-0 bg-slate-900/30 backdrop-blur-sm transition-all duration-200 ${
          visible ? 'invisible opacity-0' : 'visible opacity-100'
        }`}
      >
        <motion.div
          layout
          transition={{
            type: 'spring',
            duration: 0.5,
          }}
          className={`h-full absolute top-0 p-8 overflow-hidden ${
            visible ? '-left-full' : 'left-0'
          }`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-auto max-w-xs h-full px-4 py-8 space-y-6 bg-white rounded-xl overflow-y-scroll scroll-hidden"
          >
            {Children.toArray(
              data.map((section) => <NavMenuSection data={section} />),
            )}
          </div>
        </motion.div>
      </div>
    </Fragment>
  );
};

export default NavMenu;
