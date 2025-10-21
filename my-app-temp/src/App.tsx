import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree';
import './index.css';

// Create a client
const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

// Create a query client
const queryClient = new QueryClient();

// Create a router instance
const router = createRouter({ 
  routeTree,
  defaultPreload: 'intent',
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <ConvexProvider client={convex}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ConvexProvider>
  );
}

export default App;
