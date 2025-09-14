import { createRouter, createWebHistory } from 'vue-router';
import dashboardRoutes from './dashboard.routes';
import axiosInstance from '@/utils/axiosRealProject.js';
import { useAuthStore } from '../store/auth.js';
import { jwtDecode } from 'jwt-decode';




const routes = [
  { 
    path: '/',
    redirect: '/dashboard'
  },
...dashboardRoutes,
  { 
    path: '/about',
    name: 'About',
     component: () => import('../views/About.vue'),
      meta: {
      layout: 'UserLayout',
      main: 'About',
      requiredAuth: true,
      requiredPerm: false,
    }
  },
  {
    path:'/roles',
    name: 'Roles',
    component: () => import('../views/Roles/Roles.vue'),
    meta: {
      layout: 'UserLayout',
      requiredAuth: true,
      main: 'Roles',
      requiredPerm: true,
    }
  },
  {
    path:'/roles-form',
    name: 'RolesForm',
    component: () => import('../views/Roles/RolesForm.vue'),
    meta: {
      layout: 'UserLayout',
      main: 'Roles',
      requiredAuth: true,
      requiredPerm: true,
    }
  },
  {
    path:'/login',
    name: 'Login',
    component: () => import('../views/LoginPage.vue'),
    meta: {
      layout: 'GustLayout',

      requiredAuth: false,
      requiredPerm: false,
    }
  },

  
];

const router = createRouter({
  linkActiveClass: "active",
  scrollBehavior() {
    return { top: 0, behavior: "smooth" };
  },
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.afterEach(() => {
  // do something after each navigation 
  // document.body.classList.remove('loading')
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // if the route not requires authentication
  if (!to.meta.requiredAuth) {
    next();
    return;
  }
  // error in this part
  // if (authStore.isAuthenticated) {
  //   next('/');
  //   return
  // }
  // if the route requires guest and the user is logged in
  if (to.meta.guest && authStore.isAuthenticated) {
    next("/");
    return;
  }
  // if the route requires authentication and the user is not logged in
  if (to.meta.requiredAuth && !authStore.isAuthenticated) {
    next("/login");
    return;
  }
  //check if the route requires authentication and the user is logged in and has valid token
  if(to.meta.requiredAuth && authStore.isAuthenticated) {
    try {
      const jwtObi = jwtDecode(authStore.user?.Token);
      if(Date.now() > jwtObi?.exp * 1000) {
        document.body.classList.add("active-loader");
        const response = await axiosInstance.post("Auth/GetAccessTokenUsingRefreshToken", {
          OldAccessToken: authStore.user?.Token,
          RefreshToken: authStore.user?.RefreshToken,
        })
        if (response.status != 200 || !response.data?.Data) throw "RefreshToken Expired";
        authStore.updateUser(response.data?.Data);
      }
    } catch (error) {
      console.error(error);
      authStore.updateUser(null);
      router.replace("/login");
      return;
    }
    finally {
      document.body.classList.remove("active-loader");
    }
  }
  
  //eck ch page permission
  if (to.meta.requiredPerm) {
    let pagePerm;
    try {
      const pagecode = to.meta?.main ?? "";
      document.body.classList.add("active-loader");
      const res = await axiosInstance.get(
        "Auth/AuthorizedCurrentPageAction/" + pagecode
      );
      pagePerm = res?.data?.Data;
      if (!pagePerm?.length) throw "Access Denied";
      authStore.CurrentPagePermissions = pagePerm;
      next();
    } catch (err) {
      console.error(err);
      authStore.CurrentPagePermissions = null;
      next(to.meta.redirectToifnothavePrem || "/");
    } finally {
      document.body.classList.remove("active-loader");
    }
  }

  next(); // Allow to navigate to the requested page
})




export default router;
