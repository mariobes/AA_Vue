import { useAuth } from './auth'; 
import type { NavigationGuardNext, RouteLocationNormalized, NavigationGuard } from 'vue-router';

const isAuthenticated = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn();
};

const guard: NavigationGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  if (isAuthenticated()) {
    next();
  } else {
    next('/signIn');
  }
};

export default guard;