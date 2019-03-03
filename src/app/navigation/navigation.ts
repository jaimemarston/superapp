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
                url: '/alitour/users',
            },
            {
                id: 'calendar',
                title: 'Calendario',
                type: 'item',
                icon: 'today',
                url: '/alitour/calendario',
            },
            {
                id: 'clientes',
                title: 'Clientes',
                type: 'item',
                icon: 'local_shipping',
                url: '/alitour/clientes',
            },
            {
                id: 'proveedores',
                title: 'Proveedores',
                type: 'item',
                icon: 'local_shipping',
                url: '/alitour/proveedores',
            },
            {
                id: 'articulos',
                title: 'Articulos',
                type: 'item',
                icon: 'print',
                url: '/alitour/articulos',
            },
            {
                id: 'unidades',
                title: 'Unidades',
                type: 'item',
                icon: 'local_taxi',
                url: '/alitour/unidades',
            },
            {
                id: 'cotizacion',
                title: 'Cotizacion',
                type: 'item',
                icon: 'email',
                url: '/alitour/cotizacion',
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
                        url: '/alitour/dashboards/analytics',
                    },
                    {
                        id: 'dashboard_projects',
                        title: 'Proyectos',
                        type: 'item',
                        icon: 'email',
                        url: '/alitour/dashboards/projects',
                    }
                ]
            },
        ]
    }
];
