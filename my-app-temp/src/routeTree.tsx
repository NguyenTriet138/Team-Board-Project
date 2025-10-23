import { Outlet, createRootRoute, createRoute } from '@tanstack/react-router';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/auth';
import { ProtectedRoute } from './components/ProtectedRoute';

// Create a root route with AuthProvider
export const rootRoute = createRootRoute({
  component: () => (
    <AuthProvider>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </AuthProvider>
  ),
});

// Create the index route with ProtectedRoute
export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <ProtectedRoute>
      <HomePage />
    </ProtectedRoute>
  ),
});

// Create the login route
export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
});

// Create and export the route tree
export const routeTree = rootRoute.addChildren([indexRoute, loginRoute]);
