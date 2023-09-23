'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toastError, toastSuccess } from '@components/toast';
import SpringButton from '@components/springButton';
import CustomLogo from '@components/customLogo';
// Service
import authService from '@services/authService';

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await authService.login({ username, password });
      router.push('/');
      toastSuccess('Welcome back!');
    } catch (error) {
      toastError(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await authService.checkAuth();
        router.push('/');
      } catch (error) {
      }
    };
    checkAuth();
  }, []);

  return (
    <div
      className={`w-full h-full grid place-items-center bg-slate-100 transition-all duration-200 visible opacity-100`}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        layout
        className="p-8 max-w-md rounded-3xl bg-white flex flex-col gap-8"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
      >
        <div className="w-full flex flex-col justify-center items-center gap-2">
          <h1 className="text-2xl font-semibold capitalize">
            Sign to Dashboard
          </h1>
          <p className="text-slate-600 text-sm font-light text-left whitespace-normal">
            Access only for authorized user.
          </p>
        </div>
        <div className="space-y-3">
          <input
            className="w-full p-3 bg-slate-100 rounded-xl text-sm placeholder:font-light placeholder:text-slate-300"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="w-full p-3 bg-slate-100 rounded-xl text-sm placeholder:font-light placeholder:text-slate-300"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <SpringButton
            disabled={username === '' || password === ''}
            onClick={() => handleLogin()}
            className="w-full btn-primary py-3 font-medium"
          >
            Get Started
          </SpringButton>
        </div>
          <div className="flex gap-1 justify-center items-center"><span className="text-sm">Powered by</span><CustomLogo className="w-20" /><span className="text-sm">© 2023</span></div>
      </motion.div>
    </div>
  );
};

export default Login;
