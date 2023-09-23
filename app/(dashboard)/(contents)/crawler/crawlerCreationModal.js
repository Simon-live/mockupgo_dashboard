import { useState, useEffect } from 'react';
import { toastError, toastSuccess } from '@components/toast';
import AdvancedModal from '@components/advancedModal';
import Dropdownbox from '@components/dropdownBox';
// Service
import crawlerService from '@services/contents/crawlerService';
import supplierService from '@services/contents/supplierService';

const CrawlerCreationModal = ({ visibility, setVisibility, onComplete }) => {
  const [supplier, setSupplier] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  useEffect(() => {
    const getSupplier = () => {
      supplierService
        .retrieve()
        .then((res) => {
          let supplier = res.data.data.result;
          setSupplier(supplier);
        })
        .catch((error) => {
          toastError(error.response.data.message);
        });
    };
    getSupplier();
  }, [visibility]);

  const handleCreate = async (id) => {
    try {
      const res = await crawlerService.create({ id });
      setVisibility(!visibility);
      onComplete();
      toastSuccess(res.data.message);
    } catch (error) {
      toastError(error.response.data.message);
    }
  };

  return (
    <AdvancedModal
      visibility={visibility}
      title="Deployed Crawler"
      description="You're now deploying a new crawler, select a crawler from the supplier list below."
      onCancel={() => setVisibility(!visibility)}
      onConfirm={() => handleCreate(selectedSupplier._id)}
      isDisabled={!selectedSupplier}
    >
      {/* Supplier */}
      <Dropdownbox
        className="col-span-6 md:col-span-2"
        placeholder="Dropdown and select a supplier"
        data={supplier}
        onSelect={(item) => setSelectedSupplier(item)}
      />
    </AdvancedModal>
  );
};

export default CrawlerCreationModal;
