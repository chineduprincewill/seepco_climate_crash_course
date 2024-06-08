import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './public/pages/Home'
import Login from "./public/pages/Login";
import AuthContextProvider from "./context/AuthContext";
import PrivateRoute from "./protected/PrivateRoute";
import DefaultLayout from "./protected/DefaultLayout";
import Dashboard from "./protected/dashboard/pages/Dashboard";
import ManageTutorials from "./protected/manage-tutorials/pages/ManageTutorials";
import Tutorials from "./public/pages/Tutorials";
import Settings from "./protected/settings/pages/Settings";

function App() {

  return (
    <div className="w-full h-screen bg-[#202a3b]">
      <AuthContextProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/tutorials" element={<Tutorials />} />
            <Route element={<PrivateRoute><DefaultLayout /></PrivateRoute>}>
              <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/manage-tutorials" element={<PrivateRoute><ManageTutorials /></PrivateRoute>} />
              <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
            </Route>
          </Routes>
        </Router>
      </AuthContextProvider>
    </div>
  )
}

export default App
