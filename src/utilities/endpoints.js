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
  historicoCajas: 'cajas?_sort=fecha_caja:DESC_start=',
  historicoEgresos: 'egresos?_sort=fecha_egreso:DESC_start=0',
  historicoReservaciones: 'reservacions?_sort=fecha_reservacion:DESC_start=',
  historicoFacturados: 'facturados?_sort=fecha_facturado:DESC_start=',
  historicoPagos: 'pagos?_sort=fecha_pago:DESC_start=',
  historicoCambios: 'cambios?_sort=fecha_cambio:DESC_start=',
  historicoAnticipos: 'anticipos?_sort=fecha_anticipo:DESC_start=',
  historicoCotizaciones: 'cotizacions?_sort=fecha_cotizacion:DESC_start=',
  historicoMantenimientos: 'mantenimientos?_sort=fecha_mantenimiento:DESC_start=',
  historicoTransferencias: 'transferencias?_sort=fecha_transferencia:DESC_start=',
  historicoRegistros: 'registros?_sort=fecha_registro:DESC_start=',
};

export { generalEndpoints, historicalEndpoints };
