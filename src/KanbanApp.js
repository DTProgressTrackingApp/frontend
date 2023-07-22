import React, {useEffect, useState} from "react";
// import Work_D_Chart from "./Components/Work_D_Chart/Work_D_Chart.js";
import Board from "./Components/Board/Board.js";

import "./KanbanApp.css";
import {authToken} from "./Service/AuthService.js";
import {useNavigate} from "react-router-dom";

function KanbanApp({currentProject, setProject}) {
  const navigate = useNavigate();
  const [weight, setWeight] = useState("");
  const [todoTask, setTodoTask] = useState(() => currentProject.todoTask);
  const [progressTask, setProgressTask] = useState(() => currentProject.progressTask);
  const [finishTask, setFinishTask] = useState(() => currentProject.finishTask);

  useEffect(() => {
    // only runs once
    console.log('Run auth token once');
    if (!authToken()) {
      navigate("/") // Redirect to login page
    }
  }, []);

  const addCardTodoTask = (title) => {
    console.log("add todo task, title: " + title);
    todoTask.push({
      id: Date.now() + Math.random() * 2,
      title,
      labels: [],
      date: "",
      tasks: [],
    })
    const saveProject = JSON.parse(localStorage.getItem("prac-kanban"));
    const findProject = saveProject.find(p => p.id == currentProject.id);
    if (findProject) {
      findProject.todoTask = [];
      findProject.todoTask = todoTask;
      localStorage.setItem("prac-kanban", JSON.stringify(saveProject));
    }
    console.log("TodoTask@size: " + todoTask.length);
    setTodoTask(todoTask);
  };

  const addCardProgressTask = (title) => {
    console.log("add progress task, title: " + title);
    progressTask.push({
      id: Date.now() + Math.random() * 2,
      title,
      labels: [],
      date: "",
      subTasks: [],
    })
    const saveProject = JSON.parse(localStorage.getItem("prac-kanban"));
    const findProject = saveProject.find(p => p.id == currentProject.id);
    if (findProject) {
      findProject.progressTask = [];
      findProject.progressTask = progressTask;
      localStorage.setItem("prac-kanban", JSON.stringify(saveProject));
    }
    console.log("progressTask@size: " + todoTask.length);
    setProgressTask(progressTask);
  };

  const addCardFinishTask = (title) => {
    console.log("add finish task, title: " + title);
    finishTask.push({
      id: Date.now() + Math.random() * 2,
      title,
      labels: [],
      date: "",
      subTasks: [],
    })
    const saveProject = JSON.parse(localStorage.getItem("prac-kanban"));
    const findProject = saveProject.find(p => p.id == currentProject.id);
    if (findProject) {
      findProject.finishTask = [];
      findProject.finishTask = finishTask;
      localStorage.setItem("prac-kanban", JSON.stringify(saveProject));
    }
    console.log("finishTask@size: " + todoTask.length);
    setFinishTask(finishTask);

  };

  const updateCardTodoTask = (updateTask) => {
    console.log("update todo task, updateTask: " + JSON.stringify(updateTask));
    for (let i = 0; i < todoTask.length; i++) {
      if (todoTask[i].id == updateTask.id) {
        todoTask[i] = updateTask;
        break;
      }
    }
    console.log("todoTask: " + JSON.stringify(todoTask));
    const saveProject = JSON.parse(localStorage.getItem("prac-kanban"));
    const findProject = saveProject.find(p => p.id == currentProject.id);
    if (findProject) {
      findProject.todoTask = [];
      findProject.todoTask = todoTask;
      localStorage.setItem("prac-kanban", JSON.stringify(saveProject));
    }
    console.log("TodoTask@size: " + todoTask.length);
    setTodoTask(todoTask);
    setProject(findProject);
  };

  const updateCardProgressTask = (updateTask) => {
    console.log("update progress task, updateTask: " + JSON.stringify(updateTask));
    for (let i = 0; i < progressTask.length; i++) {
      if (progressTask[i].id == updateTask.id) {
        progressTask[i] = updateTask;
        break;
      }
    }
    console.log("progressTask: " + JSON.stringify(progressTask));
    const saveProject = JSON.parse(localStorage.getItem("prac-kanban"));
    const findProject = saveProject.find(p => p.id == currentProject.id);
    if (findProject) {
      findProject.progressTask = [];
      findProject.progressTask = progressTask;
      localStorage.setItem("prac-kanban", JSON.stringify(saveProject));
    }
    console.log("progressTask@size: " + progressTask.length);
    setTodoTask(progressTask);
    setProject(findProject);
  };

  const updateCardFinishTask = (updateTask) => {
    console.log("update finish task, updateTask: " + JSON.stringify(updateTask));
    for (let i = 0; i < finishTask.length; i++) {
      if (finishTask[i].id == updateTask.id) {
        finishTask[i] = updateTask;
        break;
      }
    }
    console.log("finishTask: " + JSON.stringify(finishTask));
    const saveProject = JSON.parse(localStorage.getItem("prac-kanban"));
    const findProject = saveProject.find(p => p.id == currentProject.id);
    if (findProject) {
      findProject.finishTask = [];
      findProject.finishTask = finishTask;
      localStorage.setItem("prac-kanban", JSON.stringify(saveProject));
    }
    console.log("finishTask@size: " + finishTask.length);
    setTodoTask(finishTask);
    setProject(findProject);
  };

  const removeCardTodoTask = (taskId) => {
    console.log("remove todo task, taskId: " + taskId);
    const removeTodoTask = todoTask.filter(t => t.id != taskId);
    console.log("TodoTask: " + JSON.stringify(removeTodoTask));
    const saveProject = JSON.parse(localStorage.getItem("prac-kanban"));
    const findProject = saveProject.find(p => p.id == currentProject.id);
    if (findProject) {
      findProject.todoTask = [];
      findProject.todoTask = removeTodoTask;
      localStorage.setItem("prac-kanban", JSON.stringify(saveProject));
    }
    console.log("removeTodoTask@size: " + todoTask.length);
    setTodoTask(removeTodoTask);
    setProject(findProject);
  };

  const removeCardProgressTask = (taskId) => {
    console.log("remove progress task, taskId: " + taskId);
    const removeProgressTask = progressTask.filter(t => t.id != taskId);
    console.log("ProgressTask: " + JSON.stringify(removeProgressTask));

    const saveProject = JSON.parse(localStorage.getItem("prac-kanban"));
    const findProject = saveProject.find(p => p.id == currentProject.id);
    if (findProject) {
      findProject.progressTask = [];
      findProject.progressTask = removeProgressTask;
      localStorage.setItem("prac-kanban", JSON.stringify(saveProject));
    }
    console.log("removeProgressTask@size: " + progressTask.length);
    setProgressTask(removeProgressTask);
    setProject(findProject);
  };

  const removeCardFinishTask = (taskId) => {
    console.log("remove finish task, taskId: " + taskId);
    const removeFinishTask = finishTask.filter(t => t.id != taskId);
    console.log("FinishTask: " + JSON.stringify(removeFinishTask));

    const saveProject = JSON.parse(localStorage.getItem("prac-kanban"));
    const findProject = saveProject.find(p => p.id == currentProject.id);
    if (findProject) {
      findProject.finishTask = [];
      findProject.finishTask = removeFinishTask;
      localStorage.setItem("prac-kanban", JSON.stringify(saveProject));
    }
    console.log("removeFinishTask@size: " + finishTask.length);
    setFinishTask(removeFinishTask);
    setProject(findProject);
  };

  const updateWeight = (value) => {
    setWeight(value);
  };

  return (
      <div className="kapp">
        <div className="app_boards_container">
          <div className="app_boards">
            <Board
                // key={project.todoTask?.id}
                task={todoTask}
                addCard={addCardTodoTask}
                updateCard={updateCardTodoTask}
                removeCard={removeCardTodoTask}
                weight={weight}
                updateWeight={updateWeight}
            >
              <h2>To-do</h2>
            </Board>
            <Board
                // key={project.todoTask?.id}
                task={progressTask}
                addCard={addCardProgressTask}
                updateCard={updateCardProgressTask}
                removeCard={removeCardProgressTask}
                weight={weight}
                updateWeight={updateWeight}
            >
                <h2>In progress</h2>
            </Board>
            <Board
                // key={project.todoTask?.id}
                task={finishTask}
                addCard={addCardFinishTask}
                updateCard={updateCardFinishTask}
                removeCard={removeCardFinishTask}
                weight={weight}
                updateWeight={updateWeight}
            >
              <h2>Completed</h2>
            </Board>
            {/*<Work_D_Chart boardWeights={boardWeights} weight={weight} />*/}

          </div>
        </div>
      </div>
  );
}

export default KanbanApp;
