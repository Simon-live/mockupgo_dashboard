import { Children, useState } from 'react';
import copy from 'copy-to-clipboard';
import { toastSuccess } from '@components/toast';
import Icon from '@components/icon';
import SpringButton from '@components/springButton';
import CollectionEditingModal from './collectionEditingModal';
import CollectionRemovingModal from './collectionRemovingModal';

const DataRecord = ({ tableHeader, item, index, getData }) => {
  const [editModalVisibility, setEditModalVisibility] = useState(false);
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
              case 'title':
                return (
                  <td className="p-4 border-b-[1px] border-slate-100">
                    <div className="flex flex-col gap-1 max-w-xl whitespace-normal">
                      <span className="font-medium text-sm capitalize">
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
              case 'date':
                return (
                  <td className="p-4 text-slate-600 border-b-[1px] border-slate-100">
                    <Icon icon="fa-solid fa-calendar-days" className="mr-2" />
                    {new Date(item.date).toLocaleString()}
                  </td>
                );
              case 'related_item':
                return (
                  <td className="p-4 text-slate-600 border-b-[1px] border-slate-100">
                    {item.related_item}
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
          <SpringButton
              onClick={() => setEditModalVisibility(!editModalVisibility)}
              className="w-8 h-8 text-teal-400 bg-teal-400/10 btn-icon text-xs"
            >
              <Icon icon="fa-solid fa-pen" />
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

    {/* Edit Modal */}
    <CollectionEditingModal visibility={editModalVisibility}
        setVisibility={setEditModalVisibility}
        data={item}
        onComplete={getData} />
          {/* Remove Modal */}
          <CollectionRemovingModal visibility={removeModalVisibility}
        setVisibility={setRemoveModalVisibility}
        data={item}
        onComplete={getData} />
    </>
  );
};

export default DataRecord;
