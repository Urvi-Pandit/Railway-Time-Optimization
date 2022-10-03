
import './App.css';
import RouteFile from './RouteFile';
import ReactDOM from "react-dom/client";
import Home from './pages/Home/Home';
import SignIn from './pages/SignIn/SignIn';
import Register from './pages/Register/Register';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from './pages/NoPage/NoPage';
import Show_Trains from './pages/Show_Trains/Show_Trains';
function App() {
  return (
    <div className="App" >
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
          
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/showtrains" element={<Show_Trains />} />
          <Route path="*" element={<NoPage />} />
     
      </Routes>
    </BrowserRouter>
        {/* <Home /> */}
        {/* <SignIn /> */}
    </div>
  );
}

export default App;
