import { GENERATEid } from './general';

let todoLIST = [];
let lastTouchTodoOBJ = {};

export function ADDnewTodo(title, desc, priority, date) {
  // formated date => "dd.mm.yyy"
  const newTODO = CREATEtodo(title, desc, priority, date);
  REPLACEtodoList(CREATEnewTodoList(todoLIST, newTODO, date));
  lastTouchTodoOBJ = newTODO;
}
export function GETtodosOfDay(targetDATE) {
  // formated date => "dd.mm.yyy"
  const dayOBJ = todoLIST.find((day) => day.date === targetDATE);
  if (!dayOBJ) { return []; }
  return dayOBJ.todos;
}
export function GETtodosOfMonth(reqMONTH, reqYEAR) {
  const dayOBJS = todoLIST.filter((dayOBJ) => {
    const objMONTH = parseFloat(dayOBJ.date.split('.')[1]);
    const objYEAR = parseFloat(dayOBJ.date.split('.')[2]);
    if ((objMONTH === reqMONTH) && (objYEAR === reqYEAR)) return true;
    return false;
  });

  return dayOBJS;
}
export function GETlastTouchTodoObj() {
  return lastTouchTodoOBJ;
}
export function GETtodoList() {
  return todoLIST;
}

function REPLACEtodoList(newLIST) {
  todoLIST = newLIST;
  localStorage.setItem('todoLIST', JSON.stringify(newLIST));
}

function CREATEtodo(title, desc, priority, date) {
  const id = GENERATEid();
  const editPriorityMETHOD = (newPRIORITY) => EDITtodoPriority(id, newPRIORITY, todoLIST);
  const removeMETHOD = () => DELETEtodo(id, todoLIST);
  return {
    title, desc, priority, id, removeMETHOD, editPriorityMETHOD, date,
  };
}
function DELETEtodo(toDeleteID, oldLIST) {
  // loop through list and skip the obj with mathcing id
  const newLIST = oldLIST.reduce((acc, day) => {
    const newDAY = { ...day };
    newDAY.todos = newDAY.todos.filter((todo) => todo.id !== toDeleteID);

    if (newDAY.todos.length > 0) {
      acc.push(newDAY);
    }
    return acc;
  }, []);
  REPLACEtodoList(newLIST);
}
export function EDITtodo(toEditID, newTITLE, newDESC, newPRIORITY, oldLIST) {
  // loop through each day and each todo
  // using shallow copies, return new todos and days
  const newLIST = oldLIST.map((day) => {
    const newDayTODOS = day.todos.map((todo) => {
      const newTODO = { ...todo };
      if (newTODO.id === toEditID) {
        newTODO.title = newTITLE;
        newTODO.desc = newDESC;
        newTODO.priority = newPRIORITY;
        lastTouchTodoOBJ = newTODO;
      }
      return newTODO;
    });
    return { ...day, todos: newDayTODOS };
  });
  REPLACEtodoList(newLIST);
}
function EDITtodoPriority(toEditID, newPRIORITY, oldLIST) {
  // loop through each day and each todo
  // using shallow copies, return new todos and new dayss

  const newLIST = oldLIST.map((day) => {
    const newDayTODOS = day.todos.map((todo) => {
      const newTODO = { ...todo };
      if (newTODO.id === toEditID) {
        newTODO.priority = newPRIORITY;
      }
      return newTODO;
    });
    return { ...day, todos: newDayTODOS };
  });
  REPLACEtodoList(newLIST);
}

function CREATEnewTodoList(oldLIST, newTODO, targetDATE) {
  const NEEDnewDAte = ISdateNEw(oldLIST, targetDATE);

  // if day exists --> push new_Todo, else push new_Day with the new_Todo
  if (!NEEDnewDAte) {
    return INSERTnewTodo(oldLIST, targetDATE, newTODO);
  }
  return [...oldLIST, CREATEnewDay(targetDATE, newTODO)]
    .sort((a, b) => a.date.localeCompare(b.date));
}
function CREATEnewDay(date, newTODO) {
  // formated date => "dd.mm.yyy"
  return { date, todos: [newTODO], id: GENERATEid() };
}
function INSERTnewTodo(oldLIST, targetDATE, newTODO) {
  return oldLIST.map((day) => {
    if (day.date === targetDATE) { day.todos.push(newTODO); }
    return day;
  }).sort((a, b) => a.date.localeCompare(b.date));
}
function ISdateNEw(array, targetDATE) {
  // formated date => "dd.mm.yyy"
  // see if the todoList already has the target Date
  return !array.some((day) => day.date === targetDATE);
}

export function setLocalStorage() {
  if (localStorage.getItem('todoLIST') === null) {
    localStorage.setItem('todoLIST', JSON.stringify(GETtodoList()));
    return;
  }
  LOADtodoListInitial(JSON.parse(localStorage.getItem('todoLIST')));
}
function LOADtodoListInitial(LIST) {
  const todoARRAYS = LIST.map((dayOBJ) => dayOBJ.todos);

  const allTODOS = todoARRAYS.reduce((acc, array) => acc.concat(array), []);
  allTODOS.forEach((todo) => {
    const {
      title, desc, priority, date,
    } = todo;
    ADDnewTodo(title, desc, priority, date);
  });
}
