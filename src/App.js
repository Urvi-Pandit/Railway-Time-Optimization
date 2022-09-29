
import './App.css';
import RouteFile from './RouteFile';
import ReactDOM from "react-dom/client";
import Home from './pages/Home/Home';
import SignIn from './pages/SignIn/SignIn';
import Register from './pages/Register/Register';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from './pages/NoPage/NoPage';
function App() {
  return (
    <div className="App" >
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          
          <Route path="/signin" element={<SignIn />} />
          <Route path="/contact" element={<Register />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
        {/* <Home /> */}
        {/* <SignIn /> */}
    </div>
  );
}

export default App;
