import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import Dropdown from '@/components/Navbar/Dropdown';
import { navItems, cajaDropdown, habitacionesDropdown, reportesDropdown } from '@/components/Navbar/NavItems';
import Logotipo from '@/assets/logotipo-hc.png';
import '@/components/Navbar/Navbar.css';

const Navbar = () => {
  const [dropdownReservas, setDropdownReservas] = useState(false);
  const [dropdownCotizar, setDropdownCotizar] = useState(false);
  const [dropdownCaja, setDropdownCaja] = useState(false);
  const [dropdownReportes, setDropdownReportes] = useState(false);
  const [dropdownHabitaciones, setDropdownHabitaciones] = useState(false);
  const [dropdownMantenimiento, setDropdownMantenimiento] = useState(false);
  const [dropdownUser, setDropdownUser] = useState(false);

  const user = localStorage.getItem('username');

  const navigate = useNavigate();

  return (
    <section className='navbar-fluid'>
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
              <li className='navbar-item'>
                <button
                  onClick={() => {
                    Swal.fire({
                      icon: 'warning',
                      text: '¿Estás seguro que deseas cerrar sesión?',
                      showCancelButton: true,
                      allowOutsideClick: false,
                      confirmButtonColor: '#1976d2',
                      cancelButtonColor: '#d32f2f',
                      confirmButtonText: 'Aceptar',
                      cancelButtonText: 'Cancelar',
                    }).then(result => {
                      if (result.isConfirmed) {
                        localStorage.clear();
                        navigate('/login');
                      }
                    });
                  }}
                >
                  Cerrar Sesión
                </button>
              </li>
            </ul>
          </>
        ) : (
          <ul className='navbar-items'>
            <li className='navbar-item'>
              <button className='btn-login'>
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
