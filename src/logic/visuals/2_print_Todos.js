import { CLEARhtml, REMOVEelementClassId } from './6_other_Effects';
import { GETtodosOfDay } from '../todo_Logic';

export function PRINTtodos(date) {
  const todos = GETtodosOfDay(date);
  CLEARhtml('.wrap_Todos');

  todos.forEach((todoOBJ) => {
    APPENDsingleTodo(todoOBJ);
  });
}
export function APPENDsingleTodo({
  id, priority, title, desc, remove,
}) {
  const todoWrapDIV = document.querySelector('.wrap_Todos');
  const todoDIV = document.createElement('div');
  todoDIV.classList.add('todo');
  todoDIV.setAttribute('data-id', `${id}`);
  todoDIV.innerHTML = `
        <p class="title_Todo" data-priority="${priority}">${title}</p>
        <p class="desc_Todo" data-empty="${desc !== ''}">${desc}</p>
        <div class="actionBox_Todo">
            <div class="todoBtn remove">X</div>
        </div>
    `;
  ATTACHeventListenerRemove(todoDIV, remove, id);
  todoWrapDIV.appendChild(todoDIV);
}

function ATTACHeventListenerRemove(todoDIV, removeMETHOD, id) {
  const removeBTN = todoDIV.querySelector('.todo .remove');
  removeBTN.addEventListener('click', () => {
    removeMETHOD();
    REMOVEelementClassId('.todoTitle_calCell', id);
    REMOVEelementClassId('.todo', id);
  });
}
