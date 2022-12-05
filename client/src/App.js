import {BrowserRouter as Router,Routes, Route} from "react-router-dom"
import CategoryBar from "./components/CategoryBar";
import AdminLogin from "./pages/AdminLogin";
import AdminManagement from "./pages/AdminManagement";
import Main from "./pages/Main";


function App() {
  return (
    <div className="App">
      <Router>    
        <CategoryBar/>
        
           <Routes>
        <Route path="/" element ={<Main/>}></Route>
        <Route path="/AdminLogin" element ={<AdminLogin/>}></Route>
        <Route path="/AdminManagement" element ={<AdminManagement/>}></Route>
           </Routes>
    </Router>
    
    
    
    </div>

    
  );
}

export default App;
