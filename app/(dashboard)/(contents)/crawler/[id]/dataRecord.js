import { useState } from 'react';
import copy from 'copy-to-clipboard';
import { toastSuccess } from '@components/toast';
import config from '@config/default.json';
import SpringButton from '@components/springButton';
import Icon from '@components/icon';
import ReviewComponent from './reviewComponent';
import CrawlerDataRemovingModal from './crawlerDataRemovingModal';

const DataRecord = ({ item, getData }) => {
  const [removeModalVisibility, setRemoveModalVisibility] = useState(false);
  return (
    <>
      <tr className="w-full text-sm whitespace-nowrap border-b-[1px] border-slate-100">
        {/* Thumbnail */}
        <td className="py-4">
          <div
            onClick={() => {
              copy(item.thumbnail.file_name);
              toastSuccess(`copy "${item.thumbnail.file_name}"`);
            }}
            className="bg-slate-100 w-36 h-20 bg-center bg-cover rounded-xl"
            style={{
              backgroundImage: `url(${config.contentPath}/${item.thumbnail.file_name})`,
            }}
          ></div>
        </td>
        {/* Title */}
        <td className="p-4">
          <div className="flex flex-col gap-1">
            <span className="max-w-[12rem] line-camp-2 whitespace-normal font-medium text-sm">
              {item.title}
            </span>
            <span className="text-slate-300 text-xs font-light whitespace-nowrap">
              ID:{item._id}
              <Icon
                onClick={() => {
                  copy(item._id);
                  toastSuccess('已复制到剪切板');
                }}
                icon="fa-solid fa-copy"
                className="rotate-90 text-[0.6rem] ml-1 text-slate-300 cursor-pointer hover:text-theme-blue transition-all"
              />
            </span>
          </div>
        </td>
        {/* Supplier */}
        <td className="py-4">
          <div className="inline-flex rounded-full px-4 py-1 items-center justify-center bg-slate-50 gap-2">
            <span>Website</span>
            <Icon
              onClick={() => window.open(item.url, '_blank')}
              icon="fa-solid fa-arrow-up-right-from-square"
              className="text-xs text-slate-400 cursor-pointer hover:text-theme-blue transition-all"
            />
          </div>
        </td>
        {/* Create Date */}
        <td className="p-4">
          <div className="text-slate-600">
            <Icon icon="fa-solid fa-calendar-days" className="mr-2" />
            {new Date(item.create_date).toLocaleString()}
          </div>
        </td>
        {/* storage */}
        <td className="py-4">
          <div
            className={`inline-flex rounded-full ${
              item.storage
                ? 'bg-emerald-50 text-emerald-300'
                : 'bg-slate-50 text-slate-400'
            } text-xs flex items-center justify-center px-2 py-1`}
          >
            <Icon icon="fa-solid fa-circle" className="mr-1 text-[0.5rem]" />
            {item.storage ? 'Stored' : 'Pending'}
          </div>
        </td>
        {/* Buttons */}
        <td className="p-4">
          <div className="gap-2 flex">
            {item.trash ? (
              <SpringButton
                onClick={() => setRemoveModalVisibility(!removeModalVisibility)}
                className="text-teal-400 bg-teal-400/10 btn-icon bg-slate-100 text-xs"
              >
                <Icon icon="fa-solid fa-rotate-right" />
              </SpringButton>
            ) : (
              <>
                <ReviewComponent {...{ item, getData }} />
                <SpringButton
                  onClick={() =>
                    setRemoveModalVisibility(!removeModalVisibility)
                  }
                  className="text-theme-pink bg-theme-pink/10 btn-icon bg-slate-100 text-xs"
                >
                  <Icon icon="fa-solid fa-trash" />
                </SpringButton>
              </>
            )}
          </div>
        </td>
      </tr>

      {/* Deleting Modal */}
      <CrawlerDataRemovingModal
        visibility={removeModalVisibility}
        setVisibility={setRemoveModalVisibility}
        data={item}
        onComplete={getData}
      />
    </>
  );
};

export default DataRecord;
