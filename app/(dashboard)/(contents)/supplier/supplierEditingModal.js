import { useState, useEffect } from 'react';
import { toastError, toastSuccess } from '@components/toast';
import AdvancedModal from '@components/advancedModal';
import IconSelector from '@components/iconSelector';
// Service
import supplierService from '@services/contents/supplierService';

const SupplierEditingModal = ({
  visibility,
  setVisibility,
  data,
  onComplete,
}) => {
  const { name, url, _id: id, icon: preIcon, digest } = data;

  const [nameField, setName] = useState('');
  const [digestField, setDigest] = useState('');
  const [urlField, setURL] = useState('');
  const [icon, setIcon] = useState('');

  useEffect(() => {
    setName(name);
    setDigest(digest);
    setURL(url);
    setIcon(preIcon);
  }, [visibility]);

  const handleEdit = async (id, name, digest, url, icon) => {
    try {
      const res = await supplierService.update(id, {
        name,
        url,
        ...(digest && { digest }),
        ...(icon && { icon }),
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
      title="Edit Supplier"
      description={
        <>
          You're now editing the supplier{' '}
          <span className="underline underline-offset-4 decoration-2 decoration-theme-pink">
            {name}
          </span>
          , please type the new attribute below.
        </>
      }
      onCancel={() => setVisibility(!visibility)}
      isDisabled={nameField === ''}
      onConfirm={() => handleEdit(id, nameField, digestField, urlField, icon)}
    >
      <div className="space-y-3">
        {/* Icon Selector and Name */}
        <div className="flex gap-3">
          <IconSelector icon={icon} onSelect={setIcon} />
          <input
            className="w-full p-3 bg-slate-100 rounded-xl text-sm placeholder:font-light placeholder:text-slate-300"
            type="text"
            placeholder="Type name here"
            value={nameField}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {/* URL Input */}
        <input
          className="w-full p-3 bg-slate-100 rounded-xl text-sm placeholder:font-light placeholder:text-slate-300"
          type="text"
          placeholder="Type URL here"
          value={urlField}
          onChange={(e) => setURL(e.target.value)}
        />
        {/* Digest Input */}
        <input
          className="w-full p-3 bg-slate-100 rounded-xl text-sm placeholder:font-light placeholder:text-slate-300"
          type="text"
          placeholder="Type digest here (Optional)"
          value={digestField}
          onChange={(e) => setDigest(e.target.value)}
        />
      </div>
    </AdvancedModal>
  );
};

export default SupplierEditingModal;
