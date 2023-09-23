import { useRouter } from 'next/navigation';
import Icon from '@components/icon';
import SpringButton from '@components/springButton';

const PageHeader = ({
  title = 'Default Title',
  digest = 'No digest here',
  onBack,
  children,
}) => {
  const router = useRouter();

  return (
    <section className="hidden lg:grid grid-cols-2 mb-8">
      <div className="col-auto space-y-2">
        <h1 className="font-semibold text-4xl">{title}</h1>
        <p className="text-sm text-slate-400">{digest}</p>
      </div>
      <div className="col-auto flex justify-end gap-4">
        {onBack && (
          <SpringButton
            onClick={() => router.back()}
            className="btn w-10 h-10 bg-white"
          >
            <Icon icon="fa-solid fa-arrow-left" />
          </SpringButton>
        )}
        {children}
      </div>
    </section>
  );
};

export default PageHeader;
