import { BrowserRouter as Router, Route, Routes } from 'react-router';
import Provider from "@/components/ui/provider"
import Login from "@/pages/Login.tsx";
import Profile from "@/pages/Profile.tsx";
import Dashboard from '@/pages/Dashboard.tsx';
import ProtectedRoutes from '@/utils/ProtectedRoutes';


function App() {

  return (
    <Router>
    
    <Provider>
      
      <Routes>
        <Route path='/login' element={<Login/>} />
        
        <Route element={<ProtectedRoutes />}>
          <Route path='/profile' element={<Profile/>} />
        </Route>
        <Route index path='/' element={<Dashboard/>} />
      </Routes>

    </Provider>

  </Router>
  )
}

export default App
