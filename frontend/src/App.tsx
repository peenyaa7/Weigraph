import { Navigate, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './router/PrivateRoute';
import { HomeView } from './views/HomeView/HomeView';
import { LoginView } from './views/LoginView/LoginView';
import { AddWeightView } from './views/AddWeightView/AddWeightView';
import { ProfileView } from './views/ProfileView/ProfileView';
import { MandatoryChangePasswordView } from './views/MandatoryChangePasswordView/MandatoryChangePasswordView';
import { ADD_WEIGHT_PATH, MANDATORY_CHANGE_PASSWORD_PATH, DASHBOARD_PATH, LOGIN_PATH, PROFILE_PATH } from './constants/PathConstants';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <Routes>

      {/* Rutas públicas */}
      <Route element={<AuthLayout />}>
        <Route path={LOGIN_PATH} element={<LoginView />} />
      </Route>


      {/* Rutas privadas */}
      <Route path='/' element={
        <PrivateRoute>
          <MainLayout />
        </PrivateRoute>
      }>
        <Route index element={<HomeView />} />
        <Route path={ADD_WEIGHT_PATH} element={<AddWeightView />} />
        <Route path={PROFILE_PATH} element={<ProfileView />} />
        <Route path={MANDATORY_CHANGE_PASSWORD_PATH} element={<MandatoryChangePasswordView />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to={DASHBOARD_PATH} />} />

    </Routes>
  );
}

export default App;
