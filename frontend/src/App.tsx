import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './router/PrivateRoute';
import { HomeView } from './views/HomeView/HomeView';
import AuthLayout from './layouts/AuthLayout';
import { LoginView } from './views/LoginView/LoginView';
import MainLayout from './layouts/MainLayout';
import { AddWeightView } from './views/AddWeightView/AddWeightView';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Rutas públicas */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginView />} />
        </Route>


        {/* Rutas privadas */}
        <Route path='/' element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }>
          <Route index element={<HomeView />} />
          <Route path="/add-weight" element={<AddWeightView />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
