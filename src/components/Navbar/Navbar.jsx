import React, { useState } from 'react';
import { Button, CssBaseline } from '@mui/material';
import { NavLink } from 'react-router-dom';

import Dropdown from '@/components/Navbar/Dropdown';
import { navItems, cajaDropdown, habitacionesDropdown } from '@/components/Navbar/NavItems';
import Logotipo from '@/assets/logotipo-hc.png';
import '@/components/Navbar/Navbar.css';

const Navbar = () => {
  const [dropdownReservas, setDropdownReservas] = useState(false);
  const [dropdownCotizar, setDropdownCotizar] = useState(false);
  const [dropdownCaja, setDropdownCaja] = useState(false);
  const [dropdownReportes, setDropdownReportes] = useState(false);
  const [dropdownHabitaciones, setDropdownHabitaciones] = useState(false);

  return (
    <section className='navbar-fluid'>
      <CssBaseline />
      <nav className='navbar'>
        <NavLink to='/' className='navbar-link'>
          <img className='logotipo-hc' src={Logotipo} alt='Logotipo Hotel Central' />
        </NavLink>

        <ul className='navbar-items'>
          {navItems.map(item => {
            if (item.title === 'Home') {
              return (
                <li key={item.id} className={item.cName}>
                  <NavLink to={item.path}>{item.title}</NavLink>
                </li>
              );
            }

            if (item.title === 'Reservas') {
              return (
                <li
                  key={item.id}
                  className={item.cName}
                  onMouseEnter={() => setDropdownReservas(true)}
                  onMouseLeave={() => setDropdownReservas(false)}
                >
                  <NavLink to={item.path}>{item.title}</NavLink>
                </li>
              );
            }

            if (item.title === 'Cotizar') {
              return (
                <li
                  key={item.id}
                  className={item.cName}
                  onMouseEnter={() => setDropdownCotizar(true)}
                  onMouseLeave={() => setDropdownCotizar(false)}
                >
                  <NavLink to={item.path}>{item.title}</NavLink>
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

            if (item.title === 'Reportes') {
              return (
                <li
                  key={item.id}
                  className={item.cName}
                  onMouseEnter={() => setDropdownReportes(true)}
                  onMouseLeave={() => setDropdownReportes(false)}
                >
                  <NavLink to={item.path}>{item.title}</NavLink>
                </li>
              );
            }

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
          })}
        </ul>
        <Button>Perfil</Button>
      </nav>
    </section>
  );
};

export default Navbar;
