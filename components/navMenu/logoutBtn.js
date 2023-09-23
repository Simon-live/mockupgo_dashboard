import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toastError, toastSuccess } from '@components/toast';
import Icon from '@components/icon';
import SpringButton from '@components/springButton';
// Service
import authService from '@services/authService';

const LogoutBtn = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const res = await authService.logout();
      router.push('/login');
      toastSuccess(res.data.message);
    } catch (error) {
      toastError(error?.response?.data?.message);
    }
  };

  return (
    <motion.div
      layout
      whileTap={{ scale: 0.8 }}
      className="group transition-colors hover:bg-theme-pink rounded-xl cursor-pointer text-sm"
    >
      <SpringButton
        onClick={() => handleLogout()}
        className="block leading-6 whitespace-nowrap py-2 pl-4 pr-32 space-x-2 group-hover:text-white"
      >
        <Icon className="w-4" icon="fa-solid fa-right-from-bracket" />
        <span className="text-slate-400 group-hover:text-white">Logout</span>
      </SpringButton>
    </motion.div>
  );
};

export default LogoutBtn;
