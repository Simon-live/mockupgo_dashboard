'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import NavMenu from '@components/navMenu';
import nestRouter from '@config/router.json';
// Service
import authService from '@services/authService';

const DashboardLayout = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await authService.checkAuth();
        setAuth(true);
      } catch (error) {
        router.push('/login');
      }
    };
    checkAuth();
  }, [pathname]);

  return (
    <>
      {auth && (
        <div className="w-full h-full flex flex-col lg:flex-row relative bg-slate-50">
          <NavMenu data={nestRouter.data} />
          <div className="p-6 lg:py-8 lg:px-12 relative w-full h-full bg-slate-50 overflow-y-scroll">
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardLayout;
