import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import Icon from '@components/icon';
import SpringButton from '@components/springButton';

const DataRecord = ({ item }) => {
  const [showDetails, setShowDetails] = useState(false);
  let color;
  switch (item?.level) {
    case -1:
      color = 'text-theme-pink bg-theme-pink/10';
      break;
    case 0:
      color = 'text-orange-400 bg-orange-400/10';
      break;
    case 200:
      color = 'text-teal-400 bg-teal-400/10';
      break;
    default:
      color = 'text-slate-400 bg-slate-50';
      break;
  }

  return (
    <div className="w-full p-6 space-y-4 bg-white rounded-xl">
      {/* 固定数据行 */}
      <div layout className="flex justify-between items-center gap-4">
        <div className="flex gap-4 items-center">
          {/* Icon */}
          <div className={`w-10 h-10 btn-icon ${color}`}>
            <Icon icon="fa-solid fa-lightbulb" />
          </div>
          {/* infomation */}
          <div className="flex flex-col gap-1 max-w-xl whitespace-normal">
            <span className="font-medium text-sm">
              {item?.message}
              {item?.page && ' at page ' + item?.page}
            </span>
            <span className="text-slate-300 text-xs whitespace-nowrap">
              {new Date(item?.date).toLocaleString()}
            </span>
          </div>
        </div>
        {/* Buttons */}
        <div className="gap-2 flex">
          {item?.url && (
            <SpringButton className="btn-icon bg-slate-100 text-sm">
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <Icon icon="fa-solid fa-up-right-from-square" />
              </a>
            </SpringButton>
          )}
          <SpringButton
            onClick={() => setShowDetails(!showDetails)}
            className="btn h-10"
          >
            <span className="text-sm">
              <Icon
                icon={`fa-solid fa-caret-${showDetails ? 'up' : 'down'}`}
                className="mr-2"
              />
              Details
            </span>
          </SpringButton>
        </div>
      </div>
      {/* 下拉扩展内容 */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 100 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', damping: 18, stiffness: 160 }}
            className="w-full bg-slate-800 text-white text-sm rounded-lg overflow-x-auto overflow-y-hidden"
          >
            <pre className="p-6">{JSON.stringify(item, null, 2)}</pre>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DataRecord;
