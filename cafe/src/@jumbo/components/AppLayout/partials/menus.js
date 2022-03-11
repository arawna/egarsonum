import React from 'react';
import { PostAdd } from '@material-ui/icons';
import IntlMessages from '../../../utils/IntlMessages';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import WidgetsIcon from '@mui/icons-material/Widgets';

export const sidebarNavs = [
  {
    name: 'Durum Takip',
    type: 'section',
    children: [
      // {
      //   name: <IntlMessages id={'pages.samplePage'} />,
      //   type: 'item',
      //   icon: <PostAdd />,
      //   link: '/sample-page',
      // },
      {
        name: 'Siparişler',
        type: 'item',
        icon: <ShoppingCartIcon />,
        link: '/orders',
      },
      {
        name: 'Masa Hesapları',
        type: 'item',
        icon: <TableRestaurantIcon />,
        link: '/table-bill',
      },
    ],
  },
  {
    name: 'Düzenleme',
    type: 'collapse',
    children: [
      // {
      //   name: <IntlMessages id={'pages.samplePage'} />,
      //   type: 'item',
      //   icon: <PostAdd />,
      //   link: '/sample-page',
      // },
      {
        name: 'Masalar',
        type: 'item',
        icon: <TableRestaurantIcon />,
        link: '/tables',
      },
      {
        name: 'Kategoriler',
        type: 'item',
        icon: <WidgetsIcon />,
        link: '/categories',
      },
      {
        name: 'Ürünler',
        type: 'item',
        icon: <FastfoodIcon />,
        link: '/products',
      },
    ],
  },
];

export const horizontalDefaultNavs = [
  {
    name: <IntlMessages id={'sidebar.main'} />,
    type: 'collapse',
    children: [
      {
        name: <IntlMessages id={'pages.samplePage'} />,
        type: 'item',
        icon: <PostAdd />,
        link: '/sample-page',
      },
      {
        name: 'Masalar',
        type: 'item',
        icon: <PostAdd />,
        link: '/tables',
      },
    ],
  },
];

export const minimalHorizontalMenus = [
  {
    name: <IntlMessages id={'sidebar.main'} />,
    type: 'collapse',
    children: [
      {
        name: <IntlMessages id={'pages.samplePage'} />,
        type: 'item',
        icon: <PostAdd />,
        link: '/sample-page',
      },
    ],
  },
];
