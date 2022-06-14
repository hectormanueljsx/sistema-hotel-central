import React, { useState } from 'react';
import { CssBaseline } from '@mui/material';
import { Link } from 'react-router-dom';

import Dropdown from '@/components/Navbar/Dropdown';
import {
  navItems,
  cajaDropdown,
  habitacionesDropdown,
  reportesDropdown,
  userDropdown,
} from '@/components/Navbar/NavItems';
import Logotipo from '@/assets/logotipo-hc.png';
import '@/components/Navbar/Navbar.css';

const Navbar = () => {
  const [dropdownReservas, setDropdownReservas] = useState(false);
  const [dropdownCotizar, setDropdownCotizar] = useState(false);
  const [dropdownCaja, setDropdownCaja] = useState(false);
  const [dropdownReportes, setDropdownReportes] = useState(false);
  const [dropdownHabitaciones, setDropdownHabitaciones] = useState(false);
  const [dropdownUser, setDropdownUser] = useState(false);

  const user = localStorage.getItem('username');

  return (
    <section className='navbar-fluid'>
      <CssBaseline />
      <nav className='navbar'>
        <Link to='/' className='navbar-link'>
          <img className='logotipo-hc' src={Logotipo} alt='Logotipo Hotel Central' />
        </Link>

        {user ? (
          <>
            <ul className='navbar-items'>
              {navItems.map(item => {
                if (item.title === 'Reservas') {
                  return (
                    <li
                      key={item.id}
                      className={item.cName}
                      onMouseEnter={() => setDropdownReservas(true)}
                      onMouseLeave={() => setDropdownReservas(false)}
                    >
                      <button>{item.title}</button>
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
                      <button>{item.title}</button>
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
                      <button>{item.title}</button>
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
                      <button>{item.title}</button>
                      {dropdownReportes && <Dropdown dropdownItem={reportesDropdown} />}
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
                      <button>{item.title}</button>
                      {dropdownHabitaciones && <Dropdown dropdownItem={habitacionesDropdown} />}
                    </li>
                  );
                }
              })}
            </ul>
            <ul className='navbar-items'>
              <li
                key={0}
                className='navbar-item'
                onMouseEnter={() => setDropdownUser(true)}
                onMouseLeave={() => setDropdownUser(false)}
              >
                <button>{user}</button>
                {dropdownUser && <Dropdown dropdownItem={userDropdown} />}
              </li>
            </ul>
          </>
        ) : (
          <ul className='navbar-items'>
            <li key='login' className='navbar-item'>
              <button style={{ padding: 0 }}>
                <Link to='/login'>Iniciar Sesión</Link>
              </button>
            </li>
          </ul>
        )}
      </nav>
    </section>
  );
};

export default Navbar;
