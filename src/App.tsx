import { useTheme } from './hooks';
import AppRouter from 'App.router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

function App() {
  const { theme } = useTheme();

  return (
    <QueryClientProvider client={queryClient}>
        <div
          className={`${theme} flex justify-center items-center bg-theme-default tracking-wide`}
          style={{ minHeight: '100vh' }}
        >
          <AppRouter />
        </div>
        <Toaster
          toastOptions={{
            duration: 6000, // Toast will disappear after 5 seconds
          }}
          position="top-right"
        />
    </QueryClientProvider>
  );
}

export default App;
