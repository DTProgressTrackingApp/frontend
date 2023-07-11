import Sub_Project from "../../Sub_Project.js";
import LandingPage from "../../Landing_Page.js";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

export const ProjectView = () => {
    const [subProjects, setSubProjects] = useState([]);
    const [activeSubProject, setActiveSubProject] = useState(null);
    const navigate = useNavigate();

    const handleSubProjectClick = (subProjectData) => {
        const newSubProject = {
            id: subProjects.length + 1,
            title: subProjectData.title, // Store the sub project title
            cards: []
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
                />
            ) : (
                <LandingPage
                    onSubProjectClick={handleSubProjectClick}
                    subProjects={subProjects}
                    onSubProjectButtonClick={handleSubProjectButtonClick}
                />
            )}
        </div>
    );
}