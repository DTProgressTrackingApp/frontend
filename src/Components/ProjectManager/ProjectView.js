import Sub_Project from "../../Sub_Project.js";
import LandingPage from "../../Landing_Page.js";
import React, {useState} from "react";
import { useLocation } from "react-router-dom";

export const ProjectView = () => {
    const location = useLocation();

    const user = location.state;
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
            cards: subProjectData.cards,
            members: subProjectData.members
        };
        const allProjects = [...subProjects, newSubProject];
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