import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import App from './App.tsx'
import Provider from '@/components/ui/provider.tsx'

createRoot(document.getElementById('root')!).render(
  <Router>
    
    <Provider>
      
      <Routes>
        <Route index path='/' element={<App/>} />
      </Routes>

    </Provider>

  </Router>
)
