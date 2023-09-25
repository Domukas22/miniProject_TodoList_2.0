import {
  CLEARhtml, REMOVEelementClassId, EDITnavLinkTodoCount,
  TOGGLEeditPriority, EDIThtmlTodosPrio, PREPAREformForEdit,
  TOGGLEtodoForm,
} from './6_other_Effects';
import { GETtodosOfDay, GETtodosOfMonth, GETsingleTodo } from '../todo_Logic';
import { GETformatedDateInfo } from '../general';

export function PRINTtodos(date) {
  const todos = GETtodosOfDay(date);
  const htmlTODOS = document.querySelectorAll('.todo');
  // if seected day has todos, remove them and print new ones later
  // if it doesn't, print them instantly
  if (htmlTODOS.length > 0) {
    htmlTODOS.forEach((x) => x.setAttribute('data-visible', 'false'));
    setTimeout(() => {
      CLEARhtml('.wrap_Todos');
      todos.forEach((todoOBJ) => {
        APPENDsingleTodo(todoOBJ);
      });
    }, 160);
    return;
  }
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
  todoDIV.setAttribute('data-visible', 'false');
  todoDIV.innerHTML = `
        <p class="title_Todo" data-priority="${priority}" data-id="${id}">${title}</p>
        <p class="desc_Todo" data-empty="${desc === ''}" data-id="${id}">${desc}</p>
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
  todoDIV.querySelector('.EDITpriority').addEventListener('click', () => TOGGLEeditPriority(id));
  todoDIV.querySelector(`.editPriorityRADIO[data-priority="${priority}"]`).checked = true;

  ATTACHeventREMOVE(todoDIV, removeMETHOD, id, date);
  ATTACHeventEDITpriority(todoDIV, id, editPriorityMETHOD);
  ATTACHeventOPENedit(todoDIV, id, title, desc, priority);
  todoWrapDIV.appendChild(todoDIV);

  setTimeout(() => {
    todoDIV.setAttribute('data-visible', 'true');
  }, 20);
}

function ATTACHeventREMOVE(todoDIV, removeMETHOD, id, date) {
  const removeBTN = todoDIV.querySelector('.todo .remove');
  const { year, month } = GETformatedDateInfo(date);
  removeBTN.addEventListener('click', () => {
    todoDIV.setAttribute('data-visible', 'false');
    setTimeout(() => {
      removeMETHOD();
      REMOVEelementClassId('.todoTitle_calCell', id);
      REMOVEelementClassId('.todo', id);
      EDITnavLinkTodoCount(month, year, GETtodosOfMonth(month, year).length);
      TOGGLEtodoForm('close');
    }, 160);
  });
}
function ATTACHeventEDITpriority(todoDIV, id, editPriorityMETHOD) {
  const radios = todoDIV.querySelectorAll('.editPriorityRADIO');
  radios.forEach((radio) => {
    radio.addEventListener('click', () => {
      TOGGLEeditPriority(id);
      editPriorityMETHOD(parseFloat(radio.dataset.priority));
      EDIThtmlTodosPrio(id, radio.dataset.priority);
    });
  });
}
function ATTACHeventOPENedit(todoDIV, id) {
  const editBTN = todoDIV.querySelector('.EDITtext');
  editBTN.addEventListener('click', () => {
    // need to ge the infos from todoLIST again,
    // because the created obj still has old values after edit
    const { title, desc, priority } = GETsingleTodo(id);
    PREPAREformForEdit(title, desc, priority, id);
    TOGGLEtodoForm('open');
  });
}
