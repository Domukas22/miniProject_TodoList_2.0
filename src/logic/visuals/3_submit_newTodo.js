import { APPENDtodoTitleToCell } from './1_print_Calender';
import { APPENDsingleTodo } from './2_print_Todos';
import { GETselectedDate } from './5_select_Dates';
import { GENERATEid } from '../general';
import { ADDnewTodo, GETlastTouchTodoObj } from '../todo_Logic';

const todoTitleINPUT = document.querySelector('.input_todoTitle');
const todoDescINPUT = document.querySelector('.input_todoDesc');

export function SUBMITnewTodo() {
  const {
    title, desc, priority, date,
  } = GETsubmitInfos();

  if (title === '') return;
  ADDnewTodo(title, desc, priority, date);
  ADJUSThtmlAfterSubmit(GETlastTouchTodoObj());
}
export function TOGGLEtodoForm(action) {
  const todoFORM = document.querySelector('.todo_Form');

  if (action === 'open') {
    todoFORM.setAttribute('data-open', 'true');
    todoFORM.style.height = '242px';
    todoFORM.style.minHeight = '242px';
    todoFORM.style.maxHeight = '242px';
    return;
  }
  todoFORM.setAttribute('data-open', 'false');
  todoFORM.style.height = '50px';
  todoFORM.style.minHeight = '50px';
  todoFORM.style.maxHeight = '100vh';
}

function ADJUSThtmlAfterSubmit(todoOBJ) {
  const todoDATE = todoOBJ.date;
  const todoTITLE = todoOBJ.title;
  const todoPRIORITY = todoOBJ.priority;
  const todoID = todoOBJ.id;

  APPENDtodoTitleToCell(FINDtargetCalCell(todoDATE), todoTITLE, todoPRIORITY, todoID);
  APPENDsingleTodo(todoOBJ);
  CLEARinputs();
}
function GETsubmitInfos() {
  const title = todoTitleINPUT.value;
  const desc = todoDescINPUT.value;
  const priority = GETselectedPriority();
  const id = GENERATEid();
  const date = GETselectedDate();

  return {
    title, desc, priority, id, date,
  };
}
function GETselectedPriority() {
  const priorityRADIOS = document.querySelectorAll('.radio_Priority[data-action="create"]');
  return Array.from(priorityRADIOS).find((x) => x.checked === true).dataset.priority;
}
function FINDtargetCalCell(date) {
  // formated date => "dd.mm.yyy"
  return document.querySelector(`.calender_Cell[data-date="${date}"]`);
}
function CLEARinputs() {
  todoTitleINPUT.value = '';
  todoDescINPUT.value = '';
  document.querySelector('.radio_Priority[data-priority="3"][data-action="create"]').checked = true;
}
