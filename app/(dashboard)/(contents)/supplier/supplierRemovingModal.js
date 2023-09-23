import { toastError, toastSuccess } from '@components/toast';
import AdvancedModal from '@components/advancedModal';
// Service
import supplierService from '@services/contents/supplierService';

const SupplierRemovingModal = ({
  visibility,
  setVisibility,
  onComplete,
  data,
}) => {
  const { name, _id: id } = data;

  const handleRemove = async (id) => {
    try {
      const res = await supplierService.remove({ id });
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
      title="Delete Supplier"
      description={
        <>
          You're now deleting the supplier{' '}
          <span className="underline underline-offset-4 decoration-2 decoration-theme-pink">
            {name}
          </span>
          , please confirm again.
        </>
      }
      onCancel={() => setVisibility(!visibility)}
      onConfirm={() => handleRemove(id)}
    />
  );
};

export default SupplierRemovingModal;
