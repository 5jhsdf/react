import './App.css';
import { NavLink } from 'react-router-dom';
function App() {
  return (
    <div className="App">
     <NavLink to="/">首页</NavLink>
     <NavLink to="/login">首页</NavLink>
    </div>
  );
}

export default App;
