import React, {useEffect, useState} from "react";
// import Work_D_Chart from "./Components/Work_D_Chart/Work_D_Chart.js";
import Board from "./Components/Board/Board.js";

import "./KanbanApp.css";
import {authToken} from "./Service/AuthService.js";
import {useNavigate} from "react-router-dom";
import {addKanpanProject, getKanbanProject, getProjectValues} from "./Service/FirestoreService.js";

function KanbanApp({currentProject, setProject, currentUser}) {
  const [currentPrj, setCurrentPrj] = useState(currentProject);
  const navigate = useNavigate();
  const [totalWeight, setTotalWeight] = useState(() => {
    let tmpTotalWeight = 0;
    console.log("Current project: " + JSON.stringify(currentProject));
    if (currentProject.todoTask) {
      currentProject.todoTask.forEach(task => {
        if (task.weight) {
          tmpTotalWeight += parseInt(task.weight);
        }
      })
    }
    if (currentProject.progressTask) {
      currentProject.progressTask.forEach(task => {
        if (task.weight) {
          tmpTotalWeight += parseInt(task.weight);
        }
      })
    }
    if (currentProject.finishTask) {
      currentProject.finishTask.forEach(task => {
        if (task.weight) {
          tmpTotalWeight += parseInt(task.weight);
        }
      })
    }
    console.log("Current total weight: " + tmpTotalWeight);
    return tmpTotalWeight;
  });
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

  const addCardTodoTask = async(title) => {
    console.log("add todo task, title: " + title);
    todoTask.push({
      id: Date.now() + Math.random() * 2,
      title,
      labels: [],
      date: "",
      subTasks: [],
    })
      const saveProject = await getKanbanProject();
      const findProject = saveProject.find(p => p.id === currentProject.id);
      if (findProject) {
        findProject.todoTask = [];
        findProject.todoTask = todoTask;
      }
      console.log("TodoTask@size: " + todoTask.length);
      setTodoTask(todoTask);
      setProject(findProject);
      setCurrentPrj(findProject);
      await addKanpanProject(saveProject);
  };

  const addCardProgressTask = async (title) => {
    console.log("add progress task, title: " + title);
    progressTask.push({
      id: Date.now() + Math.random() * 2,
      title,
      labels: [],
      date: "",
      subTasks: [],
    })
    // const saveProject = JSON.parse(localStorage.getItem("prac-kanban"));
    const saveProject = await getKanbanProject();
    const findProject = saveProject.find(p => p.id === currentProject.id);
    if (findProject) {
      findProject.progressTask = [];
      findProject.progressTask = progressTask;
      await addKanpanProject(saveProject);
      // localStorage.setItem("prac-kanban", JSON.stringify(saveProject));
    }
    console.log("progressTask@size: " + todoTask.length);
    setProgressTask(progressTask);
    setCurrentPrj(findProject);
    setProject(findProject);
  };

  const addCardFinishTask = async (title) => {
    console.log("add finish task, title: " + title);
    finishTask.push({
      id: Date.now() + Math.random() * 2,
      title,
      labels: [],
      date: "",
      subTasks: [],
    })
    // const saveProject = JSON.parse(localStorage.getItem("prac-kanban"));
    const saveProject = await getKanbanProject();
    const findProject = saveProject.find(p => p.id == currentProject.id);
    if (findProject) {
      findProject.finishTask = [];
      findProject.finishTask = finishTask;
      await addKanpanProject(saveProject);
    }
    console.log("finishTask@size: " + todoTask.length);
    setFinishTask(finishTask);
    setCurrentPrj(findProject);
    setProject(findProject);
  };

  const updateCardTodoTask = async (updateTask) => {
    console.log("update todo task, updateTask: " + JSON.stringify(updateTask));
    for (let i = 0; i < todoTask.length; i++) {
      if (todoTask[i].id == updateTask.id) {
        todoTask[i] = updateTask;
        break;
      }
    }
    console.log("todoTask: " + JSON.stringify(todoTask));
    // const saveProject = JSON.parse(localStorage.getItem("prac-kanban"));
    const saveProject = await getKanbanProject();
    const findProject = saveProject.find(p => p.id === currentProject.id);
    if (findProject) {
      findProject.todoTask = [];
      findProject.todoTask = todoTask;
      await addKanpanProject(saveProject);
      // localStorage.setItem("prac-kanban", JSON.stringify(saveProject));
    }
    console.log("TodoTask@size: " + todoTask.length);
    setTodoTask(todoTask);
    setCurrentPrj(findProject);
    setProject(findProject);
  };

  const updateCardProgressTask = async (updateTask) => {
    console.log("update progress task, updateTask: " + JSON.stringify(updateTask));
    for (let i = 0; i < progressTask.length; i++) {
      if (progressTask[i].id === updateTask.id) {
        progressTask[i] = updateTask;
        break;
      }
    }
    console.log("progressTask: " + JSON.stringify(progressTask));
    // const saveProject = JSON.parse(localStorage.getItem("prac-kanban"));
    const saveProject = await getKanbanProject();

    const findProject = saveProject.find(p => p.id === currentProject.id);
    if (findProject) {
      findProject.progressTask = [];
      findProject.progressTask = progressTask;
      await addKanpanProject(saveProject);
      // localStorage.setItem("prac-kanban", JSON.stringify(saveProject));
    }
    console.log("progressTask@size: " + progressTask.length);
    setProgressTask(progressTask);
    setCurrentPrj(findProject);
    setProject(findProject);
  };

  const updateCardFinishTask = async (updateTask) => {
    console.log("update finish task, updateTask: " + JSON.stringify(updateTask));
    for (let i = 0; i < finishTask.length; i++) {
      if (finishTask[i].id === updateTask.id) {
        finishTask[i] = updateTask;
        break;
      }
    }
    console.log("finishTask: " + JSON.stringify(finishTask));
    // const saveProject = JSON.parse(localStorage.getItem("prac-kanban"));
    const saveProject = await getKanbanProject();

    const findProject = saveProject.find(p => p.id === currentProject.id);
    if (findProject) {
      findProject.finishTask = [];
      findProject.finishTask = finishTask;
      await addKanpanProject(saveProject);
      // localStorage.setItem("prac-kanban", JSON.stringify(saveProject));
    }
    console.log("finishTask@size: " + finishTask.length);
    setFinishTask(finishTask);
    setCurrentPrj(findProject);
    setProject(findProject);
  };

  const removeCardTodoTask = async (taskId) => {
    console.log("remove todo task, taskId: " + taskId);
    const removeTodoTask = todoTask.filter(t => t.id !== taskId);
    console.log("TodoTask: " + JSON.stringify(removeTodoTask));
    // const saveProject = JSON.parse(localStorage.getItem("prac-kanban"));
    const saveProject = await getKanbanProject();

    const findProject = saveProject.find(p => p.id === currentProject.id);
    if (findProject) {
      findProject.todoTask = [];
      findProject.todoTask = removeTodoTask;
      await addKanpanProject(saveProject);
      // localStorage.setItem("prac-kanban", JSON.stringify(saveProject));
    }
    console.log("removeTodoTask@size: " + todoTask.length);
    setTodoTask(removeTodoTask);
    setCurrentPrj(findProject);
    setProject(findProject);
  };

  const removeCardProgressTask = async (taskId) => {
    console.log("remove progress task, taskId: " + taskId);
    const removeProgressTask = progressTask.filter(t => t.id !== taskId);
    console.log("ProgressTask: " + JSON.stringify(removeProgressTask));

    // const saveProject = JSON.parse(localStorage.getItem("prac-kanban"));
    const saveProject = await getKanbanProject();

    const findProject = saveProject.find(p => p.id === currentProject.id);
    if (findProject) {
      findProject.progressTask = [];
      findProject.progressTask = removeProgressTask;
      await addKanpanProject(saveProject);
      // localStorage.setItem("prac-kanban", JSON.stringify(saveProject));
    }
    console.log("removeProgressTask@size: " + progressTask.length);
    setProgressTask(removeProgressTask);
    setCurrentPrj(findProject);
    setProject(findProject);
  };

  const removeCardFinishTask = async (taskId) => {
    console.log("remove finish task, taskId: " + taskId);
    const removeFinishTask = finishTask.filter(t => t.id !== taskId);
    console.log("FinishTask: " + JSON.stringify(removeFinishTask));

    // const saveProject = JSON.parse(localStorage.getItem("prac-kanban"));
    const saveProject = await getKanbanProject();

    const findProject = saveProject.find(p => p.id === currentProject.id);
    if (findProject) {
      findProject.finishTask = [];
      findProject.finishTask = removeFinishTask;
      await addKanpanProject(saveProject);
      // localStorage.setItem("prac-kanban", JSON.stringify(saveProject));
    }
    console.log("removeFinishTask@size: " + finishTask.length);
    setFinishTask(removeFinishTask);
    setCurrentPrj(findProject);
    setProject(findProject);
  };

  const updateTotalWeight = (value) => {
    setTotalWeight(value);
  };

  const shiftSubTaskStatus = async (task, output, event) => {
    event.preventDefault()
    console.log("shiftSubTaskStatus, taskId: " + task.id + ", output: " + output);
    // const saveProject = JSON.parse(localStorage.getItem("prac-kanban"));

    const saveProject = await getKanbanProject();
    const findProject = saveProject.find(p => p.id === currentProject.id);
    console.log("findProject: " + JSON.stringify(findProject));
    if (findProject) {
      console.log("Before todoTask@size: " + todoTask.length + ",progressTask@size: " + progressTask.length + ",finishTask@size: " + finishTask.length);
      if (findProject.todoTask.find(t => t.id === task.id)) {
        console.log("Into todo");
        if (('todo' === output)) {
          return;
        }
        const removeTodoTask = todoTask.filter(t => t.id !== task.id);
        findProject.todoTask = [];
        findProject.todoTask = removeTodoTask;

        if ('inprogress' === output) {
          progressTask.push(task);
          findProject.progressTask = [];
          findProject.progressTask = progressTask;
        }else if ('completed' === output) {
          finishTask.push(task);
          findProject.finishTask = [];
          findProject.finishTask = finishTask;
        }
      } else if (findProject.progressTask.find(t => t.id === task.id)) {
          if ('inprogress' === output) {
            return;
          }
          const removeProgressTask = progressTask.filter(t => t.id !== task.id);
          findProject.progressTask = [];
          findProject.progressTask = removeProgressTask;

          if ('todo' === output) {
            todoTask.push(task);
            findProject.todoTask = [];
            findProject.todoTask = todoTask;
          }else  if ('completed' === output) {
            finishTask.push(task);
            findProject.finishTask = [];
            findProject.finishTask = finishTask;
          }
      } else if (findProject.finishTask.find(t => t.id === task.id)) {
        if (('completed' === output)) {
          return;
        }
        const removeFinishTask = finishTask.filter(t => t.id !== task.id);
        findProject.finishTask = [];
        findProject.finishTask = removeFinishTask;

        if ('todo' === output) {
          todoTask.push(task);
          findProject.todoTask = [];
          findProject.todoTask = todoTask;
        }else  if ('inprogress' === output) {
          progressTask.push(task);
          findProject.progressTask = [];
          findProject.progressTask = progressTask;
        }
      }
      setTodoTask(findProject.todoTask);
      setProgressTask(findProject.progressTask);
      setFinishTask(findProject.finishTask);
      setProject(findProject);
      console.log("After todoTask@size: " + todoTask.length + ",progressTask@size: " + progressTask.length + ",finishTask@size: " + finishTask.length);
      console.log("SaveProject shift: " + JSON.stringify(saveProject));
      addKanpanProject(saveProject);
      // localStorage.setItem("prac-kanban", JSON.stringify(saveProject));
    }
  }

  return (
      <div className="kapp">
        <div className="app_boards_container">
          <div className="app_boards">
            <Board
                task={todoTask}
                addCard={addCardTodoTask}
                updateCard={updateCardTodoTask}
                removeCard={removeCardTodoTask}
                totalWeight={totalWeight}
                updateTotalWeight={updateTotalWeight}
                shiftSubTaskStatus={shiftSubTaskStatus}
                currentUser={currentUser}
            >
              <h2>To-do</h2>
            </Board>
            <Board
                // key={project.todoTask?.id}
                task={progressTask}
                addCard={addCardProgressTask}
                updateCard={updateCardProgressTask}
                removeCard={removeCardProgressTask}
                totalWeight={totalWeight}
                updateTotalWeight={updateTotalWeight}
                shiftSubTaskStatus={shiftSubTaskStatus}
                currentUser={currentUser}
            >
                <h2>In progress</h2>
            </Board>
            <Board
                // key={project.todoTask?.id}
                task={finishTask}
                addCard={addCardFinishTask}
                updateCard={updateCardFinishTask}
                removeCard={removeCardFinishTask}
                totalWeight={totalWeight}
                updateTotalWeight={updateTotalWeight}
                shiftSubTaskStatus={shiftSubTaskStatus}
                currentUser={currentUser}
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
