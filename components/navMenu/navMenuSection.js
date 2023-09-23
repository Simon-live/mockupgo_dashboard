import React, { Children } from 'react';
import NavMenuLink from './navMenuLink';

const NavMenuSection = ({
  data = {
    title: 'Dashboard',
    data: [{ title: '首页', icon: 'fa-solid fa-house', path: '/' }],
  },
}) => {
  const { title, data: menu } = data;
  return (
    <section className="space-y-2">
      <h3 className="px-4 text-xs text-slate-300">{title}</h3>
      <ul className="space-y-2">
        {Children.toArray(menu.map((i) => <NavMenuLink {...i} />))}
      </ul>
    </section>
  );
};

export default NavMenuSection;
