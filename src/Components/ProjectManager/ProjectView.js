import Sub_Project from "../../Sub_Project.js";
import LandingPage from "../../Landing_Page.js";
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {authToken} from "../../Service/AuthService.js";
import {all} from "axios";

export const ProjectView = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state;

    useEffect(() => {
        // only runs once
        console.log('Run auth token once');
        if (!authToken()) {
            navigate("/") // Redirect to login page
        }
    }, []);

    const [subProjects, setSubProjects] = useState(() => {
        let allCurrentProjects = JSON.parse(localStorage.getItem("prac-kanban"));
        if (!allCurrentProjects) {
            return [];
        }
        if (user.role == 'MANAGER') {
            return allCurrentProjects;
        }
        allCurrentProjects = allCurrentProjects.filter(item => {
            return item.members.includes(user.email);
        })
        return allCurrentProjects;
    });
    const [activeSubProject, setActiveSubProject] = useState(null);

    const handleSubProjectClick = (subProjectData) => {
        const newSubProject = {
            id: subProjects.length + 1,
            title: subProjectData.title, // Store the sub project title
            todoTask: subProjectData.todoTask,
            progressTask: subProjectData.progressTask,
            finishTask: subProjectData.finishTask,
            members: subProjectData.members
        };
        console.log("newSubProject: " + JSON.stringify(newSubProject));
        const allProjects = [...subProjects, newSubProject];
        console.log("allProjects: " + JSON.stringify(allProjects));
        localStorage.setItem("prac-kanban", JSON.stringify(allProjects));
        setSubProjects(allProjects);
    };


    const handleSubProjectButtonClick = (subProjectId) => {
        setActiveSubProject(subProjectId);
        // navigate("/dashboard");
    };

    return (
        <div className="AppGlass">
            {activeSubProject !== null ? (
                <Sub_Project
                    subProject={subProjects.find(subProject => subProject.id === activeSubProject)}
                    onBackButtonClick={() => setActiveSubProject(null)}
                    currentUser = {user}
                />
            ) : (
                <LandingPage
                    onSubProjectClick={handleSubProjectClick}
                    subProjects={subProjects}
                    onSubProjectButtonClick={handleSubProjectButtonClick}
                    currentUser = {user}
                />
            )}
        </div>
    );
}