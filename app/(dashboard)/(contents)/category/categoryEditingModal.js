import { useState, useEffect } from 'react';
import { toastError, toastSuccess } from '@components/toast';
import AdvancedModal from '@components/advancedModal';
import IconSelector from '@components/iconSelector';
// Service
import categoryService from '@services/contents/categoryService';

const CategoryEditingModal = ({
  visibility,
  setVisibility,
  data,
  onComplete,
}) => {
  const { _id: id, title, icon: preIcon, digest } = data;

  const [titleField, setTitleField] = useState('');
  const [digestField, setDigestField] = useState('');
  const [icon, setIcon] = useState('');

  useEffect(() => {
    setTitleField(title);
    setDigestField(digest);
    setIcon(preIcon);
  }, [visibility]);

  const handleEdit = async (id, title, icon, digest) => {
    try {
      const res = await categoryService.update(id, {
        title,
        ...(icon && { icon }),
        ...(digest && { digest }),
      });
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
      title="Edit Category"
      description={
        <>
          You're now editing the category{' '}
          <span className="underline underline-offset-4 decoration-2 decoration-theme-pink">
            {title}
          </span>
          , please type the new attribute below.
        </>
      }
      onCancel={() => setVisibility(!visibility)}
      isDisabled={titleField === ''}
      onConfirm={() => handleEdit(id, titleField, icon, digestField)}
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

export default CategoryEditingModal;
