import React, { useState } from 'react';
import { Button, CssBaseline } from '@mui/material';
import { NavLink } from 'react-router-dom';

import { navItems, habitacionesDropdown } from '@/components/Navbar/NavItems';
import '@/components/Navbar/Navbar.css';
import Logotipo from '@/assets/logotipo-hc.png';
import Dropdown from '@/components/Navbar/Dropdown';

const Navbar = () => {
  const [dropdown, setDropdown] = useState(false);

  return (
    <section className='navbar-fluid'>
      <CssBaseline />
      <nav className='navbar'>
        <NavLink to='/' className='navbar-link'>
          <img className='logotipo-hc' src={Logotipo} alt='Logotipo Hotel Central' />
        </NavLink>

        <ul className='navbar-items'>
          {navItems.map(item => {
            if (item.title === 'Habitaciones') {
              return (
                <li
                  key={item.id}
                  className={item.cName}
                  onMouseEnter={() => setDropdown(true)}
                  onMouseLeave={() => setDropdown(false)}
                >
                  <NavLink to={item.path}>{item.title}</NavLink>
                  {dropdown && <Dropdown habitacionesDropdown={habitacionesDropdown} />}
                </li>
              );
            }

            return (
              <li key={item.id} className={item.cName}>
                <NavLink to={item.path}>{item.title}</NavLink>
              </li>
            );
          })}
        </ul>
        <Button>Perfil</Button>
      </nav>
    </section>
  );
};

export default Navbar;
