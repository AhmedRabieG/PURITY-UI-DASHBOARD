export default [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard/Dashboard.vue'),
    meta: {
      layout: 'UserLayout',
      requiredAuth: true
    }
  },
  {
    path: '/nationalities',
    name: 'Nationalities',
    component: () => import('../views/Nationalities/Nationalities.vue'),
    meta: {
      layout: 'UserLayout',
      requiredAuth: true,
      requiredPerm: true,
      main: 'Nationalities'

    }
  },
  {
    path: '/customers',
    name: 'Customers',
    component: () => import('../views/Dashboard/Customers.vue'),
    meta: {
      layout: 'UserLayout',
      requiredAuth: true
    }
  },
  {
    path: '/income',
    name: 'Income',
    component: () => import('../views/Dashboard/Income.vue'),
    meta: {
      layout: 'UserLayout',
      requiredAuth: true
    }
  },
  {
    path: '/promote',
    name: 'Promote',
    component: () => import('../views/Dashboard/Promote.vue'),
    meta: {
      layout: 'UserLayout',
      requiredAuth: true
    }
  },
  {
    path: '/help',
    name: 'Help',
    component: () => import('../views/Dashboard/Help.vue'),
    meta: {
      layout: 'UserLayout',
      requiredAuth: true
    }
  }
];
