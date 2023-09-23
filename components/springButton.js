'use client';
import { motion } from 'framer-motion';

const SpringButton = ({ className, ...props }) => {
  return (
    <motion.button
      disabled={props.disable}
      className={`disabled:opacity-50 disabled:cursor-default ${className}`}
      whileTap={props.disabled ? '' : { scale: 0.85 }}
      {...props}
    />
  );
};

export default SpringButton;
