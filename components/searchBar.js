import Icon from '@components/icon';
import SpringButton from '@components/springButton';

const SearchBar = ({ onType, fieldData, getData, setPage }) => {
  return (
    <div className="w-full py-6 px-6 bg-white rounded-xl mb-6">
      <div className="flex justify-between gap-6">
        <div className="flex w-full px-2 items-center bg-slate-50 rounded-xl">
          <Icon
            className="ml-2 text-slate-600 text-xs"
            icon="fa-solid fa-magnifying-glass"
          />
          <input
            className="w-full p-2 bg-slate-50 rounded-xl text-sm"
            type="text"
            value={fieldData}
            onChange={(e) => onType(e.target.value)}
          />
        </div>
        <div className="flex gap-2 justify-end">
          <SpringButton
            onClick={() => {
              setPage(1);
              getData();
              onType('');
            }}
            className="btn-primary"
          >
            <span className="text-white">Search</span>
          </SpringButton>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
