import { toastError, toastSuccess } from '@components/toast';
import AdvancedModal from '@components/advancedModal';
// Service
import categoryService from '@services/contents/categoryService';

const CategoryRemovingModal = ({
  visibility,
  setVisibility,
  onComplete,
  data,
}) => {
  const { _id: id, title } = data;

  const handleRemove = async (id) => {
    try {
      const res = await categoryService.remove({ id });
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
      title="Delete Category"
      description={
        <>
          You're now deleting the category{' '}
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

export default CategoryRemovingModal;
