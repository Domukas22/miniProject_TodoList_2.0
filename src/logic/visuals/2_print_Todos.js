import { CLEARhtml, REMOVEelementClassId, EDITnavLinkTodoCount } from './6_other_Effects';
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
  id, priority, title, desc, remove, date
}) {
  const todoWrapDIV = document.querySelector('.wrap_Todos');
  const todoDIV = document.createElement('div');
  todoDIV.classList.add('todo');
  todoDIV.setAttribute('data-id', `${id}`);
  todoDIV.innerHTML = `
        <p class="title_Todo" data-priority="${priority}">${title}</p>
        <p class="desc_Todo" data-empty="${desc !== ''}">${desc}</p>
        <div class="actionBox_Todo">
            <div class="todoBtn remove"><div class="x_line"></div><div class="x_line second"></div></div>
        </div>
    `;
  ATTACHeventListenerRemove(todoDIV, remove, id, date);
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
