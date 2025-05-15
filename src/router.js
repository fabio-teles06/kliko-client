import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from './store/auth';


import UrlShortener from './components/UrlShortener.vue';
import UserLogin from './components/UserLogin.vue';
import UserRegister from './components/UserRegister.vue';
import DashboardView from './views/DashboardView.vue';


const routes = [
    { path: '/', component: UrlShortener },
    { path: '/login', component: UserLogin },
    { path: '/register', component: UserRegister },
    { path: '/dashboard', component: DashboardView, meta: { requiresAuth: true } }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const auth = useAuthStore();
    console.log('Auth:', to.meta);
    if (to.meta.requiresAuth && !auth.isAuthenticated) {
        next('/login');
    } else {
        next();
    }
});

export default router;