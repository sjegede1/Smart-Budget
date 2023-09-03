import { Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav/Nav';
import AuthPage from './pages/Auth/AuthPage';
import BudgetPage from './pages/Budget/BudgetPage';
import ProtectedRoutes from './components/Auth/ProtectedRoutes';

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path='/auth' element={<AuthPage />} />
        <Route element={<ProtectedRoutes />}>
          {/* Protected Routes go in here */}
          <Route path='/' element={<BudgetPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
