import React, { useState } from 'react';
import { Link } from "react-router-dom";
import video from './Assets/video.mp4.mp4';
import './Landing_Page.css';
import {Logout} from "./Components/Auth/Logout.js";

const LandingPage = ({ onSubProjectClick, subProjects, onSubProjectButtonClick, currentUser }) => {
    const [subProjectData, setSubProjectData] = useState('');
    const [isTitleEntered, setIsTitleEntered] = useState(false);

    const handleSubProjectDataChange = (e) => {
        const inputValue = e.target.value;
        setSubProjectData(inputValue);
        setIsTitleEntered(inputValue.trim() !== '');
    };

    const handleSubProjectClick = () => {
        if (isTitleEntered) {
            const subProject = {
                id: subProjects.length + 1,
                title: subProjectData,
                todoTask: [],
                progressTask: [],
                finishTask: [],
                members: []
            };
            console.log("handleSubProjectClick@subProject: " + JSON.stringify(subProject));
            onSubProjectClick(subProject);
            setSubProjectData('');
            setIsTitleEntered(false);
        }
    };

    return (
        <div className="landing-page">
            <div className="content-container">
                <div className="home-bannerImage-container">
                    <div className="video-container">
                        {/*<video src={video} autoPlay loop muted className="background-video" />*/}
                    </div>
                    {/*<Logout />*/}
                </div>
                <div className="content-container">
                    <div className="h1-container">
                        <h1>Digital Transformation Program</h1>
                    </div>
                    <div className="sub-projects-container">
                        <h3 className="sub-projects-heading">Projects :</h3>
                        {
                            currentUser.role === "MANAGER" &&
                                [
                                    <input type="text" value={subProjectData}
                                       onChange={(e) => handleSubProjectDataChange(e)}
                                       placeholder="Enter project title"
                                       className="sub-project-title-input" />,
                                    <button className="add-project-button" onClick={() => handleSubProjectClick()} disabled={!isTitleEntered}>
                                        Create project
                                    </button>
                                ]
                        }
                    </div>
                    <ul className="sub-projects-list">
                            {subProjects.map((subProject) => (
                            <li className="sub-project-item" key={subProject.id}>
                                <button className="sub-project-button" onClick={() => onSubProjectButtonClick(subProject.id)} key={subProject.id}>
                                    { subProject.title}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
