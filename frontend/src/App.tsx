import { BrowserRouter as Router, Route, Routes } from 'react-router';
import Login from "@/pages/Auth/Login";
import Register from '@/pages/Auth/Register';
import Profile from "@/pages/Profile.tsx";
import Dashboard from '@/pages/Dashboard.tsx';
import ProtectedRoutes from '@/utils/ProtectedRoutes';
import NotAuthRoutes from '@/utils/NotAuthRoutes';


function App() {

  return (
    <Router>
    
      <Routes>
      
        <Route element={<NotAuthRoutes />}>
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
        </Route>
        
        <Route element={<ProtectedRoutes />}>
          <Route path='/profile' element={<Profile/>} />
        </Route>
        <Route index path='/' element={<Dashboard/>} />
      
      </Routes>


  </Router>
  )
}

export default App
