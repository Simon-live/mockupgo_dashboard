import { Children, useState } from 'react';
import Link from 'next/link';
import copy from 'copy-to-clipboard';
import { toastSuccess } from '@components/toast';
import config from '@config/default.json';
import Icon from '@components/icon';
import SpringButton from '@components/springButton';
import ResourceRemovingModal from './resourceRemoveModal';

const DataRecord = ({ tableHeader, item, index, getData }) => {
  const [removeModalVisibility, setRemoveModalVisibility] = useState(false);

  return (
    <>
      <tr className="text-slate-800 text-sm whitespace-nowrap">
        {/* Serial */}
        <td className="p-4 text-slate-600 border-b-[1px] border-slate-100">
          {index + 1}
        </td>
        {Children.toArray(
          tableHeader.map((col) => {
            if (col.value)
              switch (col.value) {
                case 'thumbnail':
                  return (
                    <td className="p-4 text-slate-600 border-b-[1px] border-slate-100">
                      <div
                        className="bg-slate-100 w-32 h-24 bg-center bg-cover rounded-xl"
                        style={{
                          backgroundImage: `url(${config.contentPath}/${item.thumbnail.file_name})`,
                        }}
                      ></div>
                    </td>
                  );
                case 'title':
                  return (
                    <td className="p-4 border-b-[1px] border-slate-100">
                      <div className="flex flex-col gap-1 max-w-xl whitespace-normal">
                        <span className="font-medium text-sm">
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
                  );
                case 'price':
                  return (
                    <td className="p-4 text-slate-800 border-b-[1px] border-slate-100">
                      <span className="font-medium">
                        {item.price === 0 ? 'Free' : '$' + item.price}
                      </span>
                    </td>
                  );
                case 'supplier':
                  return (
                    <td className="p-4 text-slate-600 border-b-[1px] border-slate-100">
                      <div className="inline-flex rounded-full px-4 py-1 items-center justify-center bg-slate-100 gap-2">
                        <span>{item.supplier.ref.name}</span>
                        <Icon
                          onClick={() =>
                            window.open(item.supplier.ref.url, '_blank')
                          }
                          icon="fa-solid fa-arrow-up-right-from-square"
                          className="text-xs text-slate-400 cursor-pointer hover:text-theme-blue transition-all"
                        />
                      </div>
                    </td>
                  );
                case 'collection_id':
                  return (
                    <td className="p-4 text-slate-600 border-b-[1px] border-slate-100">
                      <div
                        className={`inline-flex rounded-full ${
                          item.collection_id
                            ? 'bg-theme-blue/5 text-theme-blue'
                            : 'bg-slate-100 text-slate-400'
                        } text-xs flex items-center px-2 py-1`}
                      >
                        <Icon
                          icon="fa-solid fa-circle"
                          className="mr-1 text-[0.5rem]"
                        />
                        {item.collection_id ? 'Collection' : 'Single'}
                      </div>
                    </td>
                  );
                case 'create_date':
                  return (
                    <td className="p-4 text-slate-600 border-b-[1px] border-slate-100">
                      <Icon icon="fa-solid fa-calendar-days" className="mr-2" />
                      {new Date(item.create_date).toLocaleString()}
                    </td>
                  );
                case 'is_published':
                  return (
                    <td className="p-4 text-slate-600 border-b-[1px] border-slate-100">
                      <div
                        className={`inline-flex rounded-full ${
                          item.is_published
                            ? 'bg-emerald-50 text-emerald-300'
                            : 'bg-slate-100 text-slate-400'
                        } text-xs flex items-center justify-center px-2 py-1`}
                      >
                        <Icon
                          icon="fa-solid fa-circle"
                          className="mr-1 text-[0.5rem]"
                        />
                        {item.is_published ? 'Published' : 'Draft'}
                      </div>
                    </td>
                  );
                default:
                  break;
              }
          }),
        )}
        {/* Buttons */}
        <td className="p-4 text-slate-600 border-b-[1px] border-slate-100">
          <div className="gap-2 flex">
            {/* Edit */}
            <SpringButton className="w-8 h-8 text-teal-400 bg-teal-400/10 btn-icon text-xs">
              <Link href={`/resource/${item._id}`} className="text-sm">
                <Icon icon="fa-solid fa-pen" />
              </Link>
            </SpringButton>
            {/* Delete */}
            <SpringButton
              onClick={() => setRemoveModalVisibility(!removeModalVisibility)}
              className="w-8 h-8 text-theme-pink bg-theme-pink/10 btn-icon text-xs"
            >
              <Icon icon="fa-solid fa-trash" />
            </SpringButton>
          </div>
        </td>
      </tr>

      {/* Remove Modal */}
      <ResourceRemovingModal
        visibility={removeModalVisibility}
        setVisibility={setRemoveModalVisibility}
        data={item}
        onComplete={getData}
      />
    </>
  );
};

export default DataRecord;
