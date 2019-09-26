export const STORAGE_USER_KEY = 'user';
export const ROLES = [
    {
        id: 1,
        name: 'Administrador',
        permissions: ['users', 'proveedores', 'materiales', 'movmaterial', 'articulos', 'cotizacion', 'reporte', 'dashboard'],
    },
    {
        id: 2,
        name: 'Operario Material',
        permissions: ['movmaterial', 'proveedores', 'materiales', 'reporte']
    },
    {
        id: 3,
        name: 'Operario Productos',
        permissions: ['cotizacion', 'proveedores', 'articulos', 'reporte',]
    }
];

export const TOKEN_KEY = 'Token';


export const MONTHS = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'
];
