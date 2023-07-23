import {doc, getDoc, setDoc} from "firebase/firestore";
import {db} from "../Config/Firebase.js";

export const addKanpanProject = async (data) => {
    console.log("addKanpanProject to firestore: " + JSON.stringify(data));
    if (!data) {

    }
    try {
        const kanpanRef = doc(db, "taskInfo", "TASK");
        console.log("Document written with ID: ", kanpanRef.id);
        await setDoc(kanpanRef, {
            'prac-kanban' : data
        }, { capital: true }, { merge: true }).catch(e => {
            console.log(e);
        });
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export const addProjectInfo = async (data) => {
    console.log("addProjectInfo to firestore" + JSON.stringify(data));
    try {
        const kanpanRef = doc(db, "taskInfo", "ProjectValue");
        console.log("Document written with ID: ", kanpanRef.id);
        await setDoc(kanpanRef, {
            'projectValues' : data
        }, { capital: true }, { merge: true }).catch(e => {
            console.log(e);
        });
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export const getKanbanProject = async () => {
    console.log("Get kanban project from firestore");
    try {
        const kanpanRef = doc(db, "taskInfo", "TASK");
        const kanpanSnap = await getDoc(kanpanRef);
        if (kanpanSnap.exists()) {
            console.log("Kanpan data:", kanpanSnap.data()['prac-kanban']);
            return kanpanSnap.data()['prac-kanban'];
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    } catch (e) {
        console.error("Error getting document: ", e);
    }
}

export const getProjectValues = async () => {
    console.log("getProjectValues from firestore");
    try {
        const kanpanRef = doc(db, "taskInfo", "ProjectValue");
        const kanpanSnap = await getDoc(kanpanRef);
        if (kanpanSnap.exists()) {
            console.log("getProjectValues:", kanpanSnap.data()['projectValues']);
            return kanpanSnap.data()['projectValues'];
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    } catch (e) {
        console.error("Error getting document: ", e);
    }
}
