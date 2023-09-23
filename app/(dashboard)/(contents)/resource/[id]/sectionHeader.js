import Icon from '@components/icon';

const SectionHeader = ({ icon, title, children }) => {
  return (
    <div className="w-full py-4 px-6 bg-white rounded-xl my-6">
      <div className="w-full mb-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Icon
            className="text-theme-blue w-4 h-4"
            icon={icon || 'fa-solid fa-circle-info'}
          />
          <h1 className="font-medium text-lg">{title || '标题'}</h1>
        </div>
      </div>
      {children}
    </div>
  );
};

export default SectionHeader;
