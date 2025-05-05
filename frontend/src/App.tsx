import { BrowserRouter as Router, Route, Routes } from 'react-router';
import Login from "@/pages/Auth/Login";
import Register from '@/pages/Auth/Register';
import Profile from "@/pages/Profile.tsx";
import Dashboard from '@/pages/Dashboard.tsx';
import ProtectedRoutes from '@/utils/ProtectedRoutes';
import NotProtectedRoutes from '@/utils/NotProtectedRoutes';;
import { Toaster } from './components/ui/toaster';
import Home from './pages/Home';
import NotNeedingAuthVerif from './utils/NotNeedingAuthVerif';
import ReceipeEdit from './pages/ReceipeEdit';
import ArticleView from './pages/ArticleView';

function App() {

  return (
    <Router>
      <Toaster/>
      <Routes>

        <Route element={<NotNeedingAuthVerif />}>
          <Route index path='/' element={<Home/>}/>
          <Route path='/article/:id' element={<ArticleView/>}></Route>
        </Route>
        
        <Route element={<NotProtectedRoutes />}>
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
        </Route>
        
        <Route element={<ProtectedRoutes />}>
          <Route path='/profile' element={<Profile/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/dashboard/new' element={<ReceipeEdit/>} />
          <Route path='/dashboard/edit/:id' element={<ReceipeEdit isEdit={true}/>} />
        </Route>
        
      
      </Routes>


  </Router>
  )
}

export default App
