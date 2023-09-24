import {
  CLEARhtml, REMOVEelementClassId, EDITnavLinkTodoCount,
  TOGGLEeditPriority, EDIThtmlTodosPrio, PREPAREformForEdit,
  TOGGLEtodoForm,
} from './6_other_Effects';
import { GETtodosOfDay, GETtodosOfMonth } from '../todo_Logic';
import { GETformatedDateInfo } from '../general';

export function PRINTtodos(date) {
  const todos = GETtodosOfDay(date);
  CLEARhtml('.wrap_Todos');

  todos.forEach((todoOBJ) => {
    APPENDsingleTodo(todoOBJ);
  });
}
export function APPENDsingleTodo({
  id, priority, title, desc, removeMETHOD, editPriorityMETHOD, date,
}) {
  const todoWrapDIV = document.querySelector('.wrap_Todos');
  const todoDIV = document.createElement('div');
  todoDIV.classList.add('todo');
  todoDIV.setAttribute('data-id', `${id}`);
  todoDIV.innerHTML = `
        <p class="title_Todo" data-priority="${priority}" data-id="${id}">${title}</p>
        <p class="desc_Todo" data-empty="${desc !== ''}">${desc}</p>
        <div class="actionBox_Todo">
          <div class="todoBtnWRAP" data-id="${id}">
            <div class="todoBtn EDITtext"><div class="editTodoICON"></div></div>
            <div class="todoBtn EDITpriority"><div class="changePriorityCIRCLE" data-priority="${priority}" data-id="${id}"></div></div>
            <div class="todoBtn remove"><div class="x_line"></div><div class="x_line second"></div></div>
          </div>
          <div class="editTodoRADIOS" data-id="${id}">
            <input type="radio" name="${id}" class="editPriorityRADIO" data-priority="3">
            <input type="radio" name="${id}" class="editPriorityRADIO" data-priority="2">
            <input type="radio" name="${id}" class="editPriorityRADIO" data-priority="1">
          </div>
        </div>
    `;
  ATTACHeventListenerRemove(todoDIV, removeMETHOD, id, date);
  ATTACHeventListenerOPENprioEdit(todoDIV, id);
  ATTACHeventListenerEDITpriority(todoDIV, id, priority, editPriorityMETHOD);
  ATTACHeventListenerEDITtodo(todoDIV, id, title, desc, priority);
  todoWrapDIV.appendChild(todoDIV);
}

function ATTACHeventListenerRemove(todoDIV, removeMETHOD, id, date) {
  const removeBTN = todoDIV.querySelector('.todo .remove');
  const { year, month } = GETformatedDateInfo(date);
  removeBTN.addEventListener('click', () => {
    removeMETHOD();
    REMOVEelementClassId('.todoTitle_calCell', id);
    REMOVEelementClassId('.todo', id);
    EDITnavLinkTodoCount(month, year, GETtodosOfMonth(month, year).length);
  });
}
function ATTACHeventListenerEDITpriority(todoDIV, id, priority, editPriorityMETHOD) {
  const radios = todoDIV.querySelectorAll('.editPriorityRADIO');
  radios.forEach((radio) => {
    if (parseFloat(radio.dataset.priority) === priority) {
      radio.setAttribute('checked', '');
    }
    radio.addEventListener('click', () => {
      TOGGLEeditPriority(id);
      editPriorityMETHOD(parseFloat(radio.dataset.priority));
      EDIThtmlTodosPrio(id, radio.dataset.priority);
    });
  });
}
function ATTACHeventListenerOPENprioEdit(todoDIV, id) {
  const editPrioBTN = todoDIV.querySelector('.EDITpriority');
  editPrioBTN.addEventListener('click', () => {
    TOGGLEeditPriority(id);
  });
}

function ATTACHeventListenerEDITtodo(todoDIV, id, title, desc, priority) {
  const editBTN = todoDIV.querySelector('.EDITtext');
  editBTN.addEventListener('click', () => {
    PREPAREformForEdit(title, desc, priority, id);
    TOGGLEtodoForm('open');
  });
}
