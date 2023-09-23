'use client';
import { Children, useRef, useState } from 'react';
import _ from 'lodash';
import Icon from '@components/icon';
import { toastError } from '@components/toast';

const MultiComboBox = ({
  className,
  title,
  placeholder = '输入内容搜索',
  onNew,
  service,
  selectedData = [],
  onSelect,
  limit = 15,
}) => {
  const [data, setData] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const dropDownComponent = useRef(null);

  const fullMatches = _.find(data, (item) => {
    return item.title.toLowerCase() === searchField.toLowerCase();
  });

  // 过滤掉已经被选择的标签，把selectedData中的数据从data中移除
  let unselectedData = data.filter((item) => {
    return !_.find(selectedData, { _id: item._id });
  });

  const dropDownData =
    fullMatches
      ? [fullMatches]
      : onNew
      ? [{ _id: 'new', title: `Add "${searchField}"` }, ...unselectedData]
      : unselectedData;

  const getData = async (param) => {
    try {
      const res = await service({ search: param });
      setData(res.data.data.result);
      setCurrentIndex(0);
    } catch (error) {
      toastError(error.response.data.message);
    }
  };

  const handleSelect = (item) => {
    if (item._id === 'new') {
      if (onNew) {
        onNew(searchField);
        setSearchField('');
        setCurrentIndex(0);
      } else {
        toastError('这个选项需要新建哦～');
      }
    } else {
      if (selectedData.length >= limit) {
        toastError(`最多只能选${limit}个哦～`);
      } else {
        onSelect([...selectedData, item]);
        setSearchField('');
        setCurrentIndex(0);
      }
    }
  };

  // 按键滚动下拉列表
  const handleScroll = (index) => {
    setCurrentIndex(index);
    // 将下拉列表的选中项滚动到可视区域
    dropDownComponent.current.children[index].scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
      block: 'nearest',
    });
  };

  return (
    <div className={`${className} grid gap-2 relative`}>
      {title && <span className="text-sm pl-1 text-slate-800">{title}</span>}
      <div className="w-full p-3 bg-slate-50 rounded-xl text-sm flex flex-wrap gap-2 items-center whitespace-normal ">
        {/* 已选择标签，如果没有已选择的标签则不显示列表 */}
        {selectedData && selectedData.length !== 0 && (
          <ul className="flex flex-wrap gap-2">
            {Children.toArray(
              selectedData.map((i) => (
                <li className="bg-slate-100 text-slate-500 px-2 rounded space-x-2 flex items-center">
                  <span className="whitespace-nowrap font-medium">
                    {i.title}
                  </span>
                  <Icon
                    onClick={() =>
                      onSelect(
                        selectedData.filter((item) => {
                          return item._id !== i._id;
                        }),
                      )
                    }
                    className="text-slate-300 cursor-pointer hover:text-theme-pink transition"
                    icon="fa-solid fa-close"
                  />
                </li>
              )),
            )}
          </ul>
        )}
        {/* 标签搜索框 */}
        <input
          className="px-1 bg-slate-50 rounded-xl text-sm placeholder:text-slate-300"
          placeholder={placeholder}
          spellCheck="false"
          type="text"
          value={searchField}
          onChange={(e) => {
            setSearchField(e.currentTarget.value);
            setCurrentIndex(0);
            console.log(fullMatches)
            // 输入框为空时，不请求搜索结果
            if (e.currentTarget.value !== '') getData(e.currentTarget.value);
          }}
          onKeyDown={(e) => {
            switch (e.key) {
              case 'ArrowDown':
                // 向下选择，如果当前索引小于数据最大下标，则索引+1，否则索引为0，光标返回第一个
                handleScroll(
                  currentIndex < dropDownData.length - 1 ? currentIndex + 1 : 0,
                );
                break;
              case 'ArrowUp':
                // 向上选择，如果当前索引大于0，则索引-1，否则索引为最大下标，光标返回最后一个
                handleScroll(
                  currentIndex > 0 ? currentIndex - 1 : dropDownData.length - 1,
                );
                break;
              case 'Enter':
                // 避免数据不存在及搜索框为空时的报错
                if (dropDownData[currentIndex] && searchField !== '') {
                  handleSelect(dropDownData[currentIndex]);
                }
                break;
              case 'Backspace':
                // 按下退格键时，如果搜索框为空，则删除最后一个已选择的标签
                if (searchField === '') {
                  onSelect(_.dropRight(selectedData));
                }
                break;
              default:
                break;
            }
          }}
        />
      </div>

      {/* 下拉列表 */}
      {dropDownData && dropDownData.length !== 0 && searchField !== '' ? (
        <div className="w-1/2 max-h-52 overflow-y-scroll p-4 bg-white space-y-2 rounded-xl shadow-[0_8px_25px_0] shadow-slate-500/10 absolute z-50 -bottom-2 translate-y-full">
          {dropDownData.length > 0 ? (
            <ul className="space-y-1" ref={dropDownComponent}>
              {Children.toArray(
                dropDownData.map((item, index) => (
                  <li
                    onClick={() => handleSelect(item)}
                    className={`${
                      item._id === 'new'
                        ? 'bg-theme-pink !text-white hover:!bg-theme-pink/60'
                        : currentIndex === index
                        ? 'bg-slate-100'
                        : ''
                    } w-full py-2 px-4 overflow-hidden text-ellipsis rounded-xl text-sm space-x-1 hover:bg-slate-50 cursor-pointer transition`}
                  >
                    <Icon
                      className={`text-xs ${
                        item._id === 'new' ? 'text-white' : 'text-slate-400'
                      }`}
                      icon="fa-solid fa-hashtag"
                    />
                    <span>{item.title}</span>
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
      ) : null}
    </div>
  );
};

export default MultiComboBox;
