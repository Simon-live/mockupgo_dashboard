'use client';
import { useState, Children } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion, AnimatePresence } from 'framer-motion';
import SpringButton from '@components/springButton';
import iconList from './iconList';

const IconSelector = ({ icon, onSelect }) => {
  // 搜索
  const [searchField, setSearchField] = useState('');
  // 弹出标记
  const [bubble, setBubble] = useState(false);
  return (
    <div className="relative h-auto">
      <SpringButton
        onClick={() => setBubble(!bubble)}
        className="btn-icon h-full px-6 bg-slate-100 text-slate-400"
      >
        <FontAwesomeIcon icon={icon} />
      </SpringButton>
      <AnimatePresence>
        {bubble && (
          <motion.div
            key="bubble"
            style={{
              scale: 1,
              opacity: 1,
            }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{
              type: 'spring',
              duration: 0.25,
            }}
            className="absolute w-64 h-64 z-50 mt-4 top-full left-0 flex flex-col items-right"
          >
            <div className="w-2 h-2 -m-1 ml-3 bg-white rotate-45"></div>
            <div className="py-2 px-3 bg-white shadow-2xl shadow-slate-400/80 rounded-lg text-slate-600 text-xs font-light overflow-hidden overflow-y-scroll">
              <div className="grid grid-cols-5 gap-2">
                {/* 图标搜索框 */}
                <input
                  className="col-span-5 p-3 my-2 bg-slate-50 rounded-xl text-sm placeholder:text-slate-300"
                  type="text"
                  placeholder="Search icons"
                  value={searchField}
                  onChange={(e) => setSearchField(e.target.value)}
                />
                {Children.toArray(
                  iconList
                    .filter(
                      (i) =>
                        i.toLowerCase().indexOf(searchField.toLowerCase()) > -1,
                    )
                    .map((e) => (
                      <SpringButton
                        onClick={() => {
                          onSelect(e);
                          setBubble(!bubble);
                          setSearchField('');
                        }}
                        className="col-span-1 w-10 h-10 btn-icon bg-slate-50"
                      >
                        <FontAwesomeIcon icon={e} />
                      </SpringButton>
                    )),
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IconSelector;
