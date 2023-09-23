import { toastError, toastSuccess } from '@components/toast';
import AdvancedModal from '@components/advancedModal';
// Service
import crawlerService from '@services/contents/crawlerService';

const CrawlerDataRemovingModal = ({
  visibility,
  setVisibility,
  onComplete,
  data,
}) => {
  const { _id: id, title, trash } = data;

  const handleRemove = async (id) => {
    try {
      const res = await crawlerService.trashData({ id });
      onComplete();
      toastSuccess(res.data.message);
    } catch (error) {
      toastError(error.response.data.message);
    }
    setVisibility(!visibility);
  };

  return (
    <AdvancedModal
      visibility={visibility}
      title={trash?"Restore Data":"Delete Data"}
      description={
        <>
          You're now manipulating the crawler data{' '}
          <span className="underline underline-offset-4 decoration-2 decoration-theme-pink">
            {title}
          </span>
          , please confirm again.
        </>
      }
      onCancel={() => setVisibility(!visibility)}
      onConfirm={() => handleRemove(id)}
    />
  );
};

export default CrawlerDataRemovingModal;
