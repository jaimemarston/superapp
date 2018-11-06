import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'applications',
        title: 'Applications',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        children: [
            {
                id: 'clientes',
                title: 'Clientes',
                type: 'item',
                icon: 'email',
                url: '/alitour/clientes',
            },
            {
                id: 'articulos',
                title: 'Articulos',
                type: 'item',
                icon: 'email',
                url: '/alitour/articulos',
            },
            {
                id: 'unidades',
                title: 'Unidades',
                type: 'item',
                icon: 'email',
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
