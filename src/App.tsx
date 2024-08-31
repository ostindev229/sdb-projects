import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import Production from './pages/Authentication/Production';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import Login from './pages/Authentication/Login';

import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import Profile from './pages/Profile';

import DefaultLayout from './layout/DefaultLayout';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Routes>
      <Route
        path="/"
        element={
          <DefaultLayout>
            <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <ECommerce />
          </DefaultLayout>
        }
      />
      <Route
        path="/profile"
        element={
          <DefaultLayout>
            <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <Profile />
          </DefaultLayout>
        }
      />
      <Route
        path="/forms/form-elements/:id"
        element={
          <DefaultLayout>
            <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <FormElements />
          </DefaultLayout>
        }
      />
      <Route
        path="/auth/signin"
        element={
          <>
            <DefaultLayout>

              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/auth/new-production"
        element={
          <>
            <DefaultLayout>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Production />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/auth/login"
        element={
          <>
            <PageTitle title="Login | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <Login />
          </>
        }
      />
    </Routes>
  );
}

export default App;
