'use client';
import { useState } from 'react';
import _ from 'lodash';
import { toastError } from '@components/toast';
import Icon from '@components/icon';
import SpringButton from '@components/springButton';
import Modal from '@components/modal';
import config from '@config/default.json';
// Service
import resourceService from '@services/contents/resourceService';

const ContentUploadModal = ({ visibility, onPopup, handleSubmit }) => {
  const [switchMode, setMode] = useState(false);
  const [image, setImage] = useState({});
  const [switchableImage, setSwitchableImage] = useState({});

  const handleUpload = async (e, setImg) => {
    const data = new FormData();
    data.append('file', e.target.files[0]);
    try {
      const res = await resourceService.upload(data);
      setImg(_.pick(res.data.data, ['_id', 'file_name']));
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const reset = () => {
    setMode(false);
    setImage({});
    setSwitchableImage({});
    onPopup(!visibility);
  };

  const handleConfirm = () => {
    if (switchMode && !_.isEmpty(image) && !_.isEmpty(switchableImage)) {
      handleSubmit({
        type: 'switchable_img',
        data: [image, switchableImage],
      });
      reset();
    } else if (!switchMode && !_.isEmpty(image)) {
      handleSubmit({
        type: 'img',
        data: [image],
      });
      reset();
    } else {
      toastError('Invalid image');
    }
  };

  return (
    <Modal {...{ visibility }}>
      <div className="space-y-4 mb-6">
        <h1 className="text-3xl font-semibold uppercase">
          Upload Img
        </h1>
        <div className="bg-slate-50 px-4 py-2 rounded-lg">
          <p className="text-slate-400 text-xs -leading-1 text-left whitespace-normal">
            Type the title, digest and icon of the new category below, noticing
            that the existed title is not allowed.
          </p>
        </div>
      </div>
      <div className="relative mb-6 overflow-hidden rounded-xl">
        {/* 占位符 */}
        <div className="absolute z-50 pointer-events-none w-full h-full flex justify-around items-center text-slate-400">
          <div
            className={`${
              _.isEmpty(image) ? 'opacity-100 visible' : 'opacity-0 invisible'
            } w-1/2 flex flex-col items-center gap-2`}
          >
            <Icon className="text-3xl" icon="fa-solid fa-image" />
            <span className="text-xs">Select image</span>
          </div>
          {switchMode ? (
            <div
              className={`${
                _.isEmpty(switchableImage)
                  ? 'opacity-100 visible'
                  : 'opacity-0 invisible'
              } w-1/2 flex flex-col items-center gap-2`}
            >
              <Icon className="text-3xl" icon="fa-solid fa-image" />
              <span className="text-xs">Select image</span>
            </div>
          ) : (
            ''
          )}
        </div>
        {/* 分割线 */}
        <div
          className={`${
            switchMode ? 'opacity-100 visible' : 'opacity-0 invisible'
          } w-1 -translate-x-1/2 h-full absolute top-0 left-1/2 bg-white z-50`}
        ></div>
        {/* 白模图 */}
        <div
          onClick={(e) => e?.currentTarget?.firstElementChild?.click()}
          className={`${
            switchMode ? 'opacity-100 visible' : 'opacity-0 invisible'
          } transition rounded-xl bg-slate-50 w-full h-48 absolute right-0 bg-cover bg-right`}
          style={{
            backgroundImage: `url(${config.contentPath}/${switchableImage.file_name})`,
            clipPath: 'inset(0 0 0 50%)',
          }}
        >
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            className="hidden"
            onChange={(e) => handleUpload(e, setSwitchableImage)}
          />
        </div>
        {/* 主图 */}
        <div
          onClick={(e) => e?.currentTarget?.firstElementChild?.click()}
          className="bg-slate-50 w-full h-48 bg-center bg-cover rounded-xl"
          style={{
            backgroundImage: `url(${config.contentPath}/${image.file_name})`,
          }}
        >
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            className="hidden"
            onChange={(e) => handleUpload(e, setImage)}
          />
        </div>
      </div>
      {/* Switch Button */}
      <div className="w-full space-y-4">
        <div className="w-full rounded-xl px-4 py-3 bg-slate-50 flex justify-between">
          <div className="text-sm flex items-center gap-2 text-slate-800">
            <Icon icon="fa-solid fa-table-columns" />
            <span>Switchable Mode</span>
          </div>
          <div className="relative flex items-center cursor-pointer ">
            <input
              id="switch"
              onClick={() => setMode(!switchMode)}
              defaultChecked={switchMode}
              type="checkbox"
              className="hidden peer"
            />
            <span className="absolute left-[2px] w-4 h-4 rounded-full bg-slate-400 transition-all peer-checked:left-[calc(1rem-2px)] peer-checked:bg-teal-400 pointer-events-none"></span>
            <label
              htmlFor="switch"
              className="w-8 h-5 rounded-xl bg-slate-200 peer-checked:bg-white cursor-pointer transition-all"
            ></label>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-6">
        {/* Cancel Button */}
        <SpringButton
          onClick={() => reset()}
          className="col-span-1 btn py-3 font-medium"
        >
          Cancel
        </SpringButton>
        {/* Confirm Button */}
        <SpringButton
          onClick={() => handleConfirm()}
          disabled={
            switchMode
              ? _.isEmpty(image) || _.isEmpty(switchableImage)
              : _.isEmpty(image)
          }
          className="col-span-1 btn-primary py-3 font-medium"
        >
          Confirm
        </SpringButton>
      </div>
    </Modal>
  );
};

export default ContentUploadModal;
