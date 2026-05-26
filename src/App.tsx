import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { DashboardLayout } from './components/layout/DashboardLayout';

function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <AppRoutes />
      </DashboardLayout>
    </BrowserRouter>
  );
}

export default App;
