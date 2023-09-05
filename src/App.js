import { Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav/Nav';
import AuthPage from './pages/Auth/AuthPage';
import BudgetPage from './pages/Budget/BudgetPage';
import ProtectedRoutes from './components/Auth/ProtectedRoutes';
import { useContext, useEffect } from 'react';
import { AuthContext } from './contexts/auth_context';
import WalletsPage from './pages/Wallets/WalletsPage';
import Test from './pages/Test/Test';

function App() {
  const {verifyToken, user} = useContext(AuthContext)
  
  useEffect(() => {
    verifyToken()
  },[user])

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path='/auth' element={<AuthPage />} />
        <Route path="/test" element={<Test />} />
        <Route element={<ProtectedRoutes />}>
          {/* Protected Routes go in here */}
          <Route path='/' element={<BudgetPage />} />
          <Route path='/wallets' element={<WalletsPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
