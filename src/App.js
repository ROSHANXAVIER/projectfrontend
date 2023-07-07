import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ApplyDoctor from "./pages/ApplyDoctor";
import NotificationPage from "./pages/NotificationPage";
import Users from "./pages/admin/Users";
import Doctors from "./pages/admin/Doctors";
import Profile from "./pages/doctor/Profile";
import BookingPage from "./pages/BookingPage";
import Appointments from "./pages/Appointments";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import DRegister from "./pages/doctor/DRegister";
import {DApplyDoctor} from "./pages/doctor/DApplyDoctor";
import DLogin from "./pages/doctor/DLogin";
import DPublicRoute from "./pages/doctor/DPublicRoute";
import DProtectedRoute from "./pages/doctor/DProtectedRoute";
import DMessage from "./pages/doctor/DMessage";
import Videocall from "./components/Videocall";
import Videocalluser from "./components/Videocalluser";
import Contactus from "./components/Contactus";
import Query from "./pages/admin/Query";
function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route
              exact path="/apply-doctor"
              element={
                <ProtectedRoute>
                  <ApplyDoctor />
                </ProtectedRoute>
              }
            />
            <Route
              exact path="/admin/users"
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route
              exact path="/admin/doctors"
              element={
                <ProtectedRoute>
                  <Doctors />
                </ProtectedRoute>
              }
            />
            <Route
              exact path="/DRegister"
              element={
                <PublicRoute>
                  <DRegister />
                </PublicRoute>
              }
            />
            <Route
              exact path="/doctor/profile/:id"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
             <Route
              exact path="/admin/query"
              element={
                <ProtectedRoute>
                  <Query/>
                </ProtectedRoute>
              }
            />
            <Route
              exact path="/doctor/book-appointment/:doctorId"
              element={
                <ProtectedRoute>
                  <BookingPage />
                </ProtectedRoute>
              }
            />
            <Route
              exact path="/notification"
              element={
                <ProtectedRoute>
                  <NotificationPage />
                </ProtectedRoute>
              }
            />
            <Route
              exact path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              exact path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              exact path="/appointments"
              element={
                <ProtectedRoute>
                  <Appointments />
                </ProtectedRoute>
              }
            />
             <Route
              exact path="/Videocall/:appId"
              element={
                <ProtectedRoute>
                  <Videocall/>
                </ProtectedRoute>
              }
            />
             <Route
              exact path="/Videocalluser/:appId"
              element={
                <ProtectedRoute>
                  <Videocalluser/>
                </ProtectedRoute>
              }
            />
             <Route
              exact path="/Contactus"
              element={
                <ProtectedRoute>
                  <Contactus/>
                </ProtectedRoute>
              }
            />
              <Route
              exact path="/Contactus"
              element={
                <ProtectedRoute>
                  <Contactus/>
                </ProtectedRoute>
              }
            />
            <Route
              exact path="/doctor-appointments"
              element={
                <ProtectedRoute>
                  <DoctorAppointments />
                </ProtectedRoute>
              }
            />
            <Route
              exact path="/DApplyDoctor"
              element={
                <DProtectedRoute>
                  <DApplyDoctor/>
                </DProtectedRoute>
              }
            />
             <Route
              exact path="/DLogin"
              element={
                <DPublicRoute>
                  <DLogin/>
                </DPublicRoute>
              }
            />
             <Route
              exact path="/DMessage"
              element={
                <DProtectedRoute>
                  <DMessage/>
                </DProtectedRoute>
              }
            />

            <Route
              exact path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
