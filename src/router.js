import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from './store/auth';


import DashboardView from './views/DashboardView.vue';
import LoginView from './views/LoginView.vue';
import RegisterView from './views/RegisterView.vue';
import AboutView from './views/AboutView.vue';


const routes = [
    { path: '/', component: AboutView },
    { path: '/login', component: LoginView, meta: { guest: true } },
    { path: '/register', component: RegisterView, meta: { guest: true } },
    { path: '/dashboard', component: DashboardView, meta: { requiresAuth: true } }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const auth = useAuthStore();
    if (to.meta.requiresAuth && !auth.isAuthenticated) {
        next('/login');
    } else {
        if (to.meta.guest && auth.isAuthenticated) {
            next('/dashboard');
        } else {
            next();
        }
    }
});

export default router;