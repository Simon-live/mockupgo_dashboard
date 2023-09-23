'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LogoutBtn from './logoutBtn';

const NavMenuLink = ({ path, icon, title }) => {
  const asPath = usePathname();

  let isActive = asPath === path || asPath.startsWith(path + '/');
  let style = isActive
    ? 'text-white bg-theme-blue'
    : 'text-slate-600 lg:hover:bg-theme-blue/5';

  return (
    <motion.div
      layout
      whileTap={{ scale: 0.8 }}
      className={`transition-colors rounded-xl cursor-pointer text-sm  ${style}`}
    >
      {title !== 'Logout' ? (
        <Link
          href={path}
          className="block leading-6 whitespace-nowrap py-2 pl-4 pr-32 space-x-2"
        >
          <FontAwesomeIcon className="w-4" icon={icon} />
          <span className={`${!isActive && 'text-slate-400'}`}>{title}</span>
        </Link>
      ) : (
        <LogoutBtn />
      )}
    </motion.div>
  );
};

export default NavMenuLink;
