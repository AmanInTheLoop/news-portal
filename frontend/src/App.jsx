import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import DashboardLayout from "./layouts/DashboardLayout";

import Home from "./pages/Home";
import News from "./pages/News";
import NewsDetails from "./pages/NewsDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import CreateNews from "./pages/CreateNews";
import MyNews from "./pages/MyNews";
import EditNews from "./pages/EditNews";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <main className="min-h-screen">
        <Routes>
          {/* Public Routes */}

          <Route path="/" element={<Home />} />

          <Route path="/news" element={<News />} />

          <Route path="/news/:id" element={<NewsDetails />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/contact" element={<Contact />} />

          {/* Dashboard */}

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Create News */}

          <Route
            path="/dashboard/create-news"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <CreateNews />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* My News */}

          <Route
            path="/dashboard/my-news"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <MyNews />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Edit News */}

          <Route
            path="/dashboard/edit-news/:id"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <EditNews />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Profile */}

          <Route
            path="/dashboard/profile"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Profile />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
