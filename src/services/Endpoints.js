const endpoints = {
  //Endpoints Generales
  Tarifa: 'tarifas',
  Habitacion: 'habitacions',
  Usuario: 'users',
  Caja: 'cajas',
  Cliente: 'clientes',
  Cotizacion: 'cotizacions',
  Egreso: 'egresos',
  Anticipo: 'anticipos',
  Cambio: 'cambios',
  Categoria: 'categorias',
  Subcategoria: 'subcategorias',
  Empresa: 'empresas',
  Facturado: 'facturados',
  Historial: 'historials',
  Impuesto: 'impuestos',
  Mantenimiento: 'mantenimientos',
  Pago: 'pagos',
  Registro: 'registros',
  Reservacion: 'reservacions',
  Transferencia: 'transferencias',
  //Endpoints Historicos
  HistoricoCajas: 'cajas?_sort=fecha_caja:DESC_start=',
  HistoricoEgresos: 'egresos?_sort=fecha_egreso:DESC_start=0',
  HistoricoReservaciones: 'reservacions?_sort=fecha_reservacion:DESC_start=',
  HistoricoFacturados: 'facturados?_sort=fecha_facturado:DESC_start=',
  HistoricoPagos: 'pagos?_sort=fecha_pago:DESC_start=',
  HistoricoCambios: 'cambios?_sort=fecha_cambio:DESC_start=',
  HistoricoAnticipos: 'anticipos?_sort=fecha_anticipo:DESC_start=',
  HistoricoCotizaciones: 'cotizacions?_sort=fecha_cotizacion:DESC_start=',
  HistoricoMantenimientos: 'mantenimientos?_sort=fecha_mantenimiento:DESC_start=',
  HistoricoTransferencias: 'transferencias?_sort=fecha_transferencia:DESC_start=',
  HistoricoRegistros: 'registros?_sort=fecha_registro:DESC_start=',
};

export { endpoints };
