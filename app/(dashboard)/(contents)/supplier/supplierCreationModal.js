import { useState } from 'react';
import { toastError, toastSuccess } from '@components/toast';
import AdvancedModal from '@components/advancedModal';
import IconSelector from '@components/iconSelector';
// Service
import supplierService from '@services/contents/supplierService';

const SupplierCreationModal = ({ visibility, setVisibility, onComplete }) => {
  const [nameField, setName] = useState('');
  const [digestField, setDigest] = useState('');
  const [urlField, setURL] = useState('');
  const [icon, setIcon] = useState('fa-solid fa-copyright');

  // Reset All States
  const reset = () => {
    setName('');
    setDigest('');
    setURL('');
    setIcon('fa-solid fa-copyright');
  };

  // Async Data Request
  const handleCreate = async (name, digest, url, icon) => {
    try {
      const res = await supplierService.create({
        name,
        url,
        ...(digest && { digest }),
        ...(icon && { icon }),
      });
      setVisibility(!visibility);
      reset();
      onComplete();
      toastSuccess(res.data.message);
    } catch (error) {
      reset();
      toastError(error.response.data.message);
    }
  };

  return (
    <AdvancedModal
      visibility={visibility}
      title="New Supplier"
      description="You're now creating a new supplier, please type the attribute below."
      onCancel={() => {
        setVisibility(!visibility);
        reset();
      }}
      onConfirm={() => handleCreate(nameField, digestField, urlField, icon)}
      isDisabled={nameField === '' || urlField === ''}
    >
      <div className="space-y-3">
        {/* Icon Selector and title */}
        <div className="flex gap-3">
          <IconSelector icon={icon} onSelect={setIcon} />
          {/* Name Input */}
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

export default SupplierCreationModal;
