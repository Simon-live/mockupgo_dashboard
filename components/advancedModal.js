import Modal from '@components/modal';
import SpringButton from '@components/springButton';

const AdvancedModal = ({
  visibility,
  title,
  description,
  isDisabled,
  onCancel,
  onConfirm,
  children,
}) => {
  return (
    <Modal visibility={visibility}>
      <div className="flex flex-col gap-2">
        {title && <h1 className="text-2xl font-semibold uppercase">{title}</h1>}
        {description && (
          <p className="text-slate-600 text-sm font-light text-left whitespace-normal">
            {description}
          </p>
        )}
      </div>
      {children}
      <div className="flex items-center justify-between gap-4">
        {/* Cancel Button */}
        {onCancel && (
          <SpringButton
            onClick={() => onCancel()}
            className="w-full btn py-3 font-medium"
          >
            Cancel
          </SpringButton>
        )}
        {/* Confirm Button */}
        <SpringButton
          disabled={isDisabled === undefined ? false : isDisabled}
          onClick={() => onConfirm()}
          className="w-full btn-primary py-3 font-medium"
        >
          Confirm
        </SpringButton>
      </div>
    </Modal>
  );
};

export default AdvancedModal;
