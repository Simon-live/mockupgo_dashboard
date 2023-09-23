import Icon from '@components/icon';
import SpringButton from '@components/springButton';

const Checkbox = ({ checked, onChange, label, className, icon }) => {
  return (
    <SpringButton className={`${className} grid gap-2 relative`}>
      <input
        type="checkbox"
        className="hidden peer"
        id={label}
        checked={checked}
        onChange={(e) => onChange(e)}
      />
      <label
        for={label}
        className="w-full py-2 px-4 text-slate-400 peer-checked:text-theme-blue bg-slate-50 peer-checked:bg-theme-blue/5 rounded-xl text-sm flex justify-between items-center gap-2 overflow-hidden cursor-pointer border-2 border-slate-50 peer-checked:border-theme-blue overflow-hidden"
      >
        <div className="space-x-2 whitespace-nowrap overflow-hidden">
          {icon && <Icon className="text-xs" icon={icon} />}
          <span className="whitespace-nowrap text-ellipsis">{label}</span>
        </div>
        <Icon
          className="text-xs"
          icon={`fa-solid fa-${checked ? 'eye' : 'eye-slash'}`}
        />
      </label>
    </SpringButton>
  );
};

export default Checkbox;
