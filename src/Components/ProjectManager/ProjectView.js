import Sub_Project from "../../Sub_Project.js";
import LandingPage from "../../Landing_Page.js";
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {authToken} from "../../Service/AuthService.js";
import {addKanpanProject, getKanbanProject} from "../../Service/FirestoreService.js";

export const ProjectView = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state;

    useEffect(() => {
        // only runs once
        // getKanbanProject();
        console.log('Run auth token once');
        if (!authToken()) {
            navigate("/") // Redirect to login page
        }
    }, []);

    const [subProjects, setSubProjects] = useState( []);

    useEffect(  () => {
        const fetchData = async () => {
            const data = await getKanbanProject();
            return data;
        }

        let allCurrentProjects;
         fetchData().then(data => {
             allCurrentProjects = data;
             console.log("Init allCurrentProjects " + JSON.stringify(allCurrentProjects));
             if (!allCurrentProjects) {
                 setSubProjects([]);
                 return [];
             }
             if (user.role == 'MANAGER') {
                 setSubProjects(allCurrentProjects);
                 return;
             }
             allCurrentProjects = allCurrentProjects.filter(item => {
                 return item.members.includes(user.email);
             })
             setSubProjects(allCurrentProjects);
         }
        );
    }, [])

    const [activeSubProject, setActiveSubProject] = useState(null);

    const handleSubProjectClick = async (subProjectData) => {
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
        await addKanpanProject(allProjects);
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