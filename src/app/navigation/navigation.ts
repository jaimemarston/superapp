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
                id: 'clientes',
                title: 'Clientes',
                type: 'item',
                icon: 'local_shipping',
                url: '/alitour/clientes',
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
        ]
    }
];
