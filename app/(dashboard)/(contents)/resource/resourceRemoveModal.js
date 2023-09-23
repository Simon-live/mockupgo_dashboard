import { toastError, toastSuccess } from '@components/toast';
import AdvancedModal from '@components/advancedModal';
// Services
import resourceService from '@services/contents/resourceService';

const ResourceRemovingModal = ({
  visibility,
  setVisibility,
  data,
  onComplete,
}) => {
  const { title, _id: id } = data;

  const handleRemove = async (id) => {
    try {
      const res = await resourceService.remove({ id });
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
      title="Delete Resource"
      description={
        <>
          You're now deleting the resource{' '}
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

export default ResourceRemovingModal;
