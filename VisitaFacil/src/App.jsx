import {Route, Routes} from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Agenda from './components/Agenda';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/registro" element={<Register/>}/>
            <Route path="/agenda" element={<Agenda/>}/>
        </Routes>
    );
}

export default App;
