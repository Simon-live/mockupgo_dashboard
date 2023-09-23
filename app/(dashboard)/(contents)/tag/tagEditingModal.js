import { useState, useEffect } from 'react';
import { toastError, toastSuccess } from '@components/toast';
import AdvancedModal from '@components/advancedModal';
// Service
import tagService from '@services/contents/tagService';

const TagEditingModal = ({ visibility, setVisibility, data, onComplete }) => {
  const { title, _id: id } = data;

  const [titleField, setTitleField] = useState('');

  useEffect(() => setTitleField(title), [visibility]);

  const handleEdit = async (title, id) => {
    try {
      const res = await tagService.update(id, { title });
      onComplete();
      setVisibility(!visibility);
      setTitleField('');
      toastSuccess(res.data.message);
    } catch (error) {
      setTitleField('');
      toastError(error.response.data.message);
    }
  };
  return (
    <AdvancedModal
      visibility={visibility}
      title="Edit Tag"
      description={
        <>
          You're now editing the tag{' '}
          <span className="underline underline-offset-4 decoration-2 decoration-theme-pink">
            {title}
          </span>
          , please type the new attribute below.
        </>
      }
      onCancel={() => setVisibility(!visibility)}
      isDisabled={titleField === ''}
      onConfirm={() => handleEdit(titleField, id)}
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

export default TagEditingModal;
