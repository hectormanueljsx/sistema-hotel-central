const generalEndpoints = {
  tarifa: 'tarifas',
  habitacion: 'habitacions',
  usuario: 'users',
  caja: 'cajas',
  cliente: 'clientes',
  cotizacion: 'cotizacions',
  egreso: 'egresos',
  anticipo: 'anticipos',
  cambio: 'cambios',
  categoria: 'categorias',
  subcategoria: 'subcategorias',
  empresa: 'empresas',
  facturado: 'facturados',
  historial: 'historials',
  impuesto: 'impuestos',
  mantenimiento: 'mantenimientos',
  pago: 'pagos',
  registro: 'registros',
  reservacion: 'reservacions',
  transferencia: 'transferencias',
};

const historicalEndpoints = {
  historicoCajas: 'cajas?_sort=fecha:DESC&_start=',
  historicoEgresos: 'egresos?_sort=fecha:DESC&_start=',
  historicoReservaciones: 'reservacions?_sort=fecha:DESC&_start=',
  historicoFacturados: 'facturados?_sort=fech_factura:DESC&_start=',
  historicoCambios: 'cambios?_sort=fecha:DESC&_start=',
  historicoAnticipos: 'anticipos?_sort=fecha:DESC&_start=',
  historicoCotizaciones: 'cotizacions?_sort=fecha:DESC&_start=',
  historicoMantenimientos: 'mantenimientos?_sort=f_inicio:DESC&_start=',
  historicoRegistros: 'registros?_sort=fecha:DESC&_start=',
  historicoHistorial: 'historials?_sort=fecha_hosp:DESC&_start=',
};

export { generalEndpoints, historicalEndpoints };
