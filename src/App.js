// App.js
import React, { useState } from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import {ProjectView} from "./Components/ProjectManager/ProjectView.js";
import Login from "./Components/Auth/Login.js";
import Sub_Project from "./Sub_Project.js";


function App() {
    return (
        <div className="App">
            {/*<ProjectDashboard />*/}
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/manager/projects/dashboard" element={<ProjectView />} />
                    <Route path="/member/projects/dashboard" element={<ProjectView />} />
                    {/*<Route path="/member/dashboard" element={<Sub_Project />} />*/}
                    {/*<Switch>*/}
                    {/*    <Route path="/" element={<Login />} />*/}
                    {/*</Switch>*/}
                    {/*<Route />*/}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
