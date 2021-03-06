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
                id: 'amaestros',
                title: 'Maestros',
                type: 'collapsable',
                icon: 'email',
                children: [
                    {
                        id: 'choferes',
                        title: 'Conductores',
                        type: 'item',
                        icon: 'email',
                        url: '/choferes',
                    },
                    {
                        id: 'guias',
                        title: 'Guias',
                        type: 'item',
                        icon: 'email',
                        url: '/guias',
                    },
                    {
                        id: 'unidades',
                        title: 'Unidades',
                        type: 'item',
                        icon: 'local_taxi',
                        url: '/unidades',
                    },
                ]
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
                id: 'cotizacion',
                title: 'Cotizaciones',
                type: 'item',
                icon: 'email',
                url: '/cotizacion',
            },
            {
                id: 'liquidacion',
                title: 'Liquidaciones',
                type: 'item',
                icon: 'email',
                url: '/liquidacion',
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
