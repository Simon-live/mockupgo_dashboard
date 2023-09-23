const InputWithTitle = ({ className, title, children, ...props }) => {
  return (
    <div className={`${className} grid gap-2 relative`}>
      <span className="text-sm pl-1 text-slate-800">{title}</span>
      <input
        className="w-full py-2 px-4 bg-slate-50 rounded-xl text-sm placeholder:text-slate-300"
        placeholder="轻点输入内容"
        type="text"
        {...props}
      />
      {children}
    </div>
  );
};

export default InputWithTitle;
