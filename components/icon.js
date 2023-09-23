'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Icon = ({ icon, ...props }) => {
  return <FontAwesomeIcon {...props} icon={icon} />;
};

export default Icon;
