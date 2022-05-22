import React, { useState } from 'react';
import { Button, CssBaseline } from '@mui/material';
import { NavLink } from 'react-router-dom';

import Dropdown from '@/components/Navbar/Dropdown';
import { navItems, cajaDropdown, habitacionesDropdown } from '@/components/Navbar/NavItems';
import Logotipo from '@/assets/logotipo-hc.png';
import '@/components/Navbar/Navbar.css';

const Navbar = () => {
  const [dropdownHabitaciones, setDropdownHabitaciones] = useState(false);
  const [dropdownCaja, setDropdownCaja] = useState(false);

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
                  onMouseEnter={() => setDropdownHabitaciones(true)}
                  onMouseLeave={() => setDropdownHabitaciones(false)}
                >
                  <NavLink to={item.path}>{item.title}</NavLink>
                  {dropdownHabitaciones && <Dropdown dropdownItem={habitacionesDropdown} />}
                </li>
              );
            }

            if (item.title === 'Caja') {
              return (
                <li
                  key={item.id}
                  className={item.cName}
                  onMouseEnter={() => setDropdownCaja(true)}
                  onMouseLeave={() => setDropdownCaja(false)}
                >
                  <NavLink to={item.path}>{item.title}</NavLink>
                  {dropdownCaja && <Dropdown dropdownItem={cajaDropdown} />}
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
