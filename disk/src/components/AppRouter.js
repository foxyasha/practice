import {Navigate, Route, Routes} from "react-router-dom";
import Home from "../components/pages/Home"
import {Component} from "react";
import Disk from "./pages/Disk";
class AppRouter extends Component {
    render() {
        return (
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/disk" element={<Disk/>}/>
                <Route path="*" element={<Navigate to="/error" replace/>}/>
            </Routes>
        );
    }
}

export default AppRouter;