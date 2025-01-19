import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/registration";
import { BrowserRouter, Routes, Route } from "react-router";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
