import { toastError, toastSuccess } from '@components/toast';
import AdvancedModal from '@components/advancedModal';
// Service
import tagService from '@services/contents/tagService';

const TagRemovingModal = ({ visibility, setVisibility, onComplete, data }) => {
  const { title, _id: id } = data;

  const handleRemove = async (id) => {
    try {
      const res = await tagService.remove({ id });
      setVisibility(!visibility);
      toastSuccess(res.data.message);
    } catch (error) {
      toastError(error.response.data.message);
    }
    onComplete();
  };
  return (
    <AdvancedModal
      visibility={visibility}
      title="Delete Tag"
      description={
        <>
          You're now deleting the tag{' '}
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

export default TagRemovingModal;
