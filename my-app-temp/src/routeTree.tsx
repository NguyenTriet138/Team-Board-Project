import { createRootRoute, createRoute } from '@tanstack/react-router';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';

// Create a root route
export const rootRoute = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <main>
        <HomePage />
      </main>
    </>
  ),
});

// Create the index route
export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

// Create and export the route tree
export const routeTree = rootRoute.addChildren([indexRoute]);
