import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'applications',
        title: 'Opciones',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        children: [
            {
                id: 'users',
                title: 'Usuarios',
                type: 'item',
                icon: 'directions_walk',
                url: '/users',
            },
            {
                id: 'calendar',
                title: 'Calendario',
                type: 'item',
                icon: 'today',
                url: '/calendario',
            },
            {
                id: 'clientes',
                title: 'Clientes',
                type: 'item',
                icon: 'local_shipping',
                url: '/clientes',
            },
            {
                id: 'proveedores',
                title: 'Proveedores',
                type: 'item',
                icon: 'local_shipping',
                url: '/proveedores',
            },
            {
                id: 'articulos',
                title: 'Articulos',
                type: 'item',
                icon: 'print',
                url: '/articulos',
            },
            {
                id: 'unidades',
                title: 'Unidades',
                type: 'item',
                icon: 'local_taxi',
                url: '/unidades',
            },
            {
                id: 'cotizacion',
                title: 'Cotizacion',
                type: 'item',
                icon: 'email',
                url: '/cotizacion',
            },
            {
                id: 'dashboard',
                title: 'Dashboard',
                type: 'collapsable',
                icon: 'email',
                children: [
                    {
                        id: 'dashboard_analytics',
                        title: 'Analitica',
                        type: 'item',
                        icon: 'email',
                        url: '/dashboards/analytics',
                    },
                    {
                        id: 'dashboard_projects',
                        title: 'Proyectos',
                        type: 'item',
                        icon: 'email',
                        url: '/dashboards/projects',
                    }
                ]
            },
        ]
    }
];
