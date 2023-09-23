import SpringButton from '@components/springButton';
import Icon from '@components/icon';
import config from '@config/default.json';

const PreviewItem = ({ details, onDelete }) => {
  const switchable = details.type === 'switchable_img';
  return (
    <div className="col-span-3 space-y-2">
      <div className="h-40 bg-slate-200 overflow-hidden rounded-xl relative">
        {/* 分割线 */}
        <div
          className={`${
            switchable ? 'opacity-100 visible' : 'opacity-0 invisible'
          } w-1 -translate-x-1/2 h-full absolute top-0 left-1/2 bg-white z-10`}
        ></div>
        {/* 白模图 */}
        {details.data[1] ? (
          <div
            onClick={(e) => e?.currentTarget?.firstElementChild?.click()}
            className={`${
              switchable ? 'opacity-100 visible' : 'opacity-0 invisible'
            } transition rounded-xl bg-slate-100 w-full h-full absolute right-0 bg-cover bg-right`}
            style={{
              backgroundImage: `url(${config.contentPath}/${details.data[1].file_name})`,
              clipPath: 'inset(0 0 0 50%)',
            }}
          ></div>
        ) : (
          ''
        )}

        {/* 主图 */}
        <div
          onClick={(e) => e?.currentTarget?.firstElementChild?.click()}
          className="bg-slate-100 w-full h-full bg-center bg-cover rounded-xl"
          style={{
            backgroundImage: `url(${config.contentPath}/${details.data[0].file_name})`,
          }}
        ></div>
      </div>
      <div className="pl-2 flex justify-between items-center">
        {/* Text */}
        <div className="overflow-hidden">
          <h1 className="-mb-2 text-sm whitespace-nowrap text-ellipsis">
            {switchable ? 'Switchable image' : 'Image'}
          </h1>
          <span className="text-xs text-slate-300 whitespace-nowrap text-ellipsis">
            {switchable
              ? '2 images with switchable mask'
              : '1 image without mask'}
          </span>
        </div>
        {/* Delete Button */}
        <SpringButton
          onClick={() => onDelete()}
          className="w-8 h-8 text-xs btn-icon text-theme-pink bg-theme-pink/10"
        >
          <Icon icon="fa-solid fa-trash" />
        </SpringButton>
      </div>
    </div>
  );
};

export default PreviewItem;
