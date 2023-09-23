import { toastError, toastSuccess } from '@components/toast';
import AdvancedModal from '@components/advancedModal';
// Service
import crawlerService from '@services/contents/crawlerService';

const CrawlerRemovingModal = ({
  visibility,
  setVisibility,
  onComplete,
  data,
}) => {
  const { _id: id, supplier } = data;

  const handleRemove = async (id) => {
    try {
      const res = await crawlerService.remove({ id });
      onComplete();
      setVisibility(!visibility);
      toastSuccess(res.data.message);
    } catch (error) {
      toastError(error.response.data.message);
    }
  };
  return (
    <AdvancedModal
      visibility={visibility}
      title="Delete Crawler"
      description={
        <>
          You're now deleting the crawler{' '}
          <span className="underline underline-offset-4 decoration-2 decoration-theme-pink">
            {supplier.name}
          </span>
          , please confirm again.
        </>
      }
      onCancel={() => setVisibility(!visibility)}
      onConfirm={() => handleRemove(id)}
    />
  );
};

export default CrawlerRemovingModal;
