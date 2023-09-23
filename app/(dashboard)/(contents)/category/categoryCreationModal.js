import { useState } from 'react';
import { toastError, toastSuccess } from '@components/toast';
import AdvancedModal from '@components/advancedModal';
import IconSelector from '@components/iconSelector';
// Services
import categoryService from '@services/contents/categoryService';

const CategoryCreationModal = ({ visibility, setVisibility, onComplete }) => {
  const [titleField, setTitleField] = useState('');
  const [digestField, setDigestField] = useState('');
  const [icon, setIcon] = useState('fa-solid fa-box');

  // Reset All States
  const reset = () => {
    setTitleField('');
    setDigestField('');
    setIcon('fa-solid fa-box');
  };

  const handleCreate = async (title, digest, icon) => {
    try {
      const res = await categoryService.create({
        title,
        ...(digest && { digest }),
        ...(icon && { icon }),
      });
      if (onComplete) onComplete();
      reset();
      setVisibility(!visibility);
      toastSuccess(res.data.message);
    } catch (error) {
      reset();
      toastError(error.response.data.message);
    }
  };

  return (
    <AdvancedModal
      visibility={visibility}
      title="New Category"
      description="You're now creating a new category, please type the attribute below."
      onCancel={() => {
        setVisibility(!visibility);
        reset();
      }}
      onConfirm={() => handleCreate(titleField, digestField, icon)}
      isDisabled={titleField === ''}
    >
      <div className="space-y-3">
        {/* Icon Selector and title */}
        <div className="flex gap-3">
          <IconSelector icon={icon} onSelect={setIcon} />
          <input
            className="w-full p-3 bg-slate-100 rounded-xl text-sm placeholder:font-light placeholder:text-slate-300"
            type="text"
            placeholder="Type title here"
            value={titleField}
            onChange={(e) => setTitleField(e.target.value)}
          />
        </div>
        {/* Digest Input */}
        <input
          className="w-full p-3 bg-slate-100 rounded-xl text-sm placeholder:font-light placeholder:text-slate-300"
          type="text"
          placeholder="Type digest here (Optional)"
          value={digestField}
          onChange={(e) => setDigestField(e.target.value)}
        />
      </div>
    </AdvancedModal>
  );
};

export default CategoryCreationModal;
