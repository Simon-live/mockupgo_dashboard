import { useState } from 'react';
import { toastError, toastSuccess } from '@components/toast';
import AdvancedModal from '@components/advancedModal';
// Service
import tagService from '@services/contents/tagService';

const TagCreationModal = ({ visibility, setVisibility, onComplete }) => {
  const [titleField, setTitleField] = useState('');

  const handleCreate = async (title) => {
    try {
      const res = await tagService.create({ title });
      setVisibility(!visibility);
      setTitleField('');
      if (onComplete) onComplete();
      toastSuccess(res.data.message);
    } catch (error) {
      setTitleField('');
      toastError(error.response.data.message);
    }
  };
  return (
    <AdvancedModal
      visibility={visibility}
      title="New Tag"
      description="You're now creating a new tag, please type the attribute below."
      onCancel={() => {
        setVisibility(!visibility);
        setTitleField('');
      }}
      onConfirm={() => handleCreate(titleField)}
      isDisabled={titleField === ''}
    >
      <input
        className="w-full p-3 bg-slate-100 rounded-xl text-sm placeholder:font-light placeholder:text-slate-300"
        type="text"
        placeholder="Type title here"
        value={titleField}
        onChange={(e) => setTitleField(e.target.value)}
      />
    </AdvancedModal>
  );
};

export default TagCreationModal;
