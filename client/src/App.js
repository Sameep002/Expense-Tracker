import Calc from "./components/Calc";
import History from "./components/History";
import LoginPg from "./components/LoginPg";
import Navbar from "./components/Navbar";
import RegisterPg from "./components/RegisterPg";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      {/* <Navbar/>
      <Calc/>
      <LoginPg/>
      <RegisterPg/> */}
      <Router>
        <Routes>
          <Route path="/" element={<LoginPg/>}/>
          <Route path="/register" element={<RegisterPg/>}/>
          <Route path="/dashboard" element={<Navbar/>}/>
        </Routes>
        </Router>
    </div>
  );
}

export default App;
