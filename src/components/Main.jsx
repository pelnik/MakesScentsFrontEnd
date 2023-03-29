import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar, Home, Routines, MyRoutines, Activities, LoginRegister, EditRoutine, AttachRoutineForm, EditRoutineActivity } from "./";


const Main = () => {


    return(
        <div id="main">
            <Navbar />
            <div id="page">
                <Routes>
                    <Route exact path="/" element={<Home/>}/>
                </Routes>
            </div>
        </div>
    )
    }

    export default Main