import { useState, useEffect } from 'react';
import { toastError, toastSuccess } from '@components/toast';
import AdvancedModal from '@components/advancedModal';
// Services
import collectionService from '@services/contents/collectionService';

const CollectionEditingModal = ({
  visibility,
  setVisibility,
  data,
  onComplete,
}) => {
  const { title, _id: id } = data;
  const [titleField, setTitleField] = useState("");

  useEffect(() => setTitleField(title), [visibility]);

  const handleEdit = async (title, id) => {
    try {
      const res = await collectionService.update(id, { title });
      onComplete();
      setTitleField('');
      setVisibility(!visibility);
      toastSuccess(res.data.message);
    } catch (error) {
      setTitleField('');
      toastError(error.response.data.message);
    }
  };

  return (
    <AdvancedModal
      visibility={visibility}
      title="Edit Collection"
      description={
        <>
          You're now editing the collection{' '}
          <span className="underline underline-offset-4 decoration-2 decoration-theme-pink">
            {title}
          </span>
          , please type the new attribute below.
        </>
      }
      onCancel={() => {
        setVisibility(!visibility);
      }}
      isDisabled={titleField === ''}
      onConfirm={() => handleEdit(titleField, id)}
    >
      <input
        className="w-full p-3 bg-slate-100 rounded-xl text-sm placeholder:font-light placeholder:text-slate-300"
        type="text"
        value={titleField}
        onChange={(e) => setTitleField(e.target.value)}
      />
    </AdvancedModal>
  );
};

export default CollectionEditingModal;
