import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './styles.css';
import  Routes  from './Routes';
import 'bootstrap/dist/css/bootstrap.min.css';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
      <Routes/>
  </QueryClientProvider>
);
const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
} else {
  console.error('Root element not found');
}