import Icon from '@components/icon';
const NotFound = () => {
  return (
    <div className="w-full h-full pb-20 text-slate-300 grid place-items-center">
      <div className="text-center space-y-4">
        <Icon className="text-[4rem] opacity-75" icon="fa-solid fa-bomb" />
        <h1 className="font-semibold">404 NOT FOUND</h1>
      </div>
    </div>
  );
};

export default NotFound;
