'use client';
import { useState, Children, useEffect, useRef } from 'react';
import Icon from '@components/icon';
import SpringButton from '@components/springButton';

const Dropdownbox = ({
  className,
  title,
  placeholder = '轻点下拉选择',
  icon,
  data = [],
  isDefault = false, // 是否默认显示第一个数据项
  onSelect,
}) => {
  const [visibility, setVisibility] = useState(false);
  const inputRef = useRef(null);

  const handleDropDown = () => {
    setVisibility(!visibility);
  };

  const handleSelect = (item) => {
    onSelect(item);
    inputRef.current.value = item.name || item.title;
    setVisibility(!visibility);
  };

  useEffect(() => {
    // 根据data和isDefault的变化自动更新input显示内容
    inputRef.current.value = isDefault
      ? data[0]
        ? data[0].name || data[0].title
        : ''
      : '';
  }, [isDefault]);

  return (
    <div className={`${className} grid gap-2 relative`}>
      {title && <span className="text-sm pl-1 text-slate-800">{title}</span>}
      <div
        onClick={() => handleDropDown()}
        className="w-full px-2 bg-slate-50 rounded-xl text-sm flex items-center overflow-hidden cursor-pointer"
      >
        {/* 如果有icon参数，则显示icon */}
        {icon && <Icon className="ml-2 text-slate-600 text-xs" icon={icon} />}
        <input
          ref={inputRef}
          className="w-full py-2 px-3 bg-slate-50 rounded-xl text-sm cursor-pointer placeholder:text-slate-300"
          placeholder={placeholder}
          disabled
        />
        <SpringButton className="w-8 h-8 text-slate-600 bg-opacity-0 btn-icon text-sm">
          <Icon
            icon={`fa-solid fa-${visibility ? 'caret-up' : 'caret-down'}`}
          />
        </SpringButton>
      </div>

      {/* 下拉列表 */}
      <div
        className={`${
          visibility ? 'opacity-100 visible' : 'opacity-0 invisible'
        } w-full transition max-h-52 overflow-y-scroll p-4 bg-white space-y-2 rounded-xl shadow-[0_8px_25px_0] shadow-slate-500/10 absolute z-50 -bottom-2 translate-y-full`}
      >
        {data.length > 0 ? (
          <ul className="space-y-1">
            {Children.toArray(
              data.map((item) => (
                <li
                  onClick={() => handleSelect(item)}
                  className={`${
                    item._id === 'new'
                      ? 'bg-theme-pink !text-white hover:!bg-theme-pink/60'
                      : 'text-slate-600'
                  } w-full py-2 px-4 overflow-hidden text-ellipsis rounded-xl text-sm space-x-1 hover:bg-slate-50 cursor-pointer transition`}
                >
                  <Icon
                    className={`text-xs ${
                      item._id === 'new' ? 'text-white/50' : 'text-slate-400'
                    }`}
                    icon="fa-solid fa-hashtag"
                  />
                  <span>{item.name || item.title}</span>
                </li>
              )),
            )}
          </ul>
        ) : (
          <span className="inline-block w-full text-center text-xs text-slate-400">
            No Data Found
          </span>
        )}
      </div>
    </div>
  );
};

export default Dropdownbox;
