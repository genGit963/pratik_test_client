import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/app_layout";
import HomePage from "./pages/home";
import AddPage from "./pages/add";
import DetailPage from "./pages/detail";
import UpdatePage from "./pages/update";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import AuthLayout from "./layouts/auth_layout";
import ProtectedRoute from "./utils/route_utils/protected_routes";
import { useUserStore } from "./store/user_store";
import ForgetPasswordPage from "./pages/forget_password";
import NewPasswordPage from "./pages/new_password";
import Search from "./pages/search";

const AppRouter = () => {
  const { user } = useUserStore();
  return (
    <div>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forget_password" element={<ForgetPasswordPage />} />
          <Route path="/new_password" element={<NewPasswordPage />} />
        </Route>
        <Route element={<ProtectedRoute user={user} />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/add" element={<AddPage />} />
            <Route path="/detail" element={<DetailPage />} />
            <Route path="/update" element={<UpdatePage />} />
            <Route path="/search" element={<Search />} />
          </Route>
        </Route>
        <Route
          path="*"
          element={
            <h1 style={{ textAlign: "center", margin: "150px" }}>
              Mero-Kaam : 404 !! Page not found
            </h1>
          }
        />
      </Routes>
    </div>
  );
};

export default AppRouter;
