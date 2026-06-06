import { RouterProvider } from 'react-router';
import { router } from './routes';
import { ThemeProvider } from './components/ThemeContext';
import { UserProvider } from './contexts/UserContext';
import { ToastProvider } from './components/ui';

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </UserProvider>
    </ThemeProvider>
  );
}