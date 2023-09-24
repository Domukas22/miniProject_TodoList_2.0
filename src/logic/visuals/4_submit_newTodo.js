import { GENERATEid, GETformatedDateInfo } from '../general';
import { ADDnewTodo, GETtodosOfMonth, GETlastTouchTodoObj } from '../todo_Logic';
import { APPENDtodoTitleToCell } from './1_print_Calender';
import { APPENDsingleTodo } from './2_print_Todos';
import { SELECTdate, GETselectedDate } from './5_select_Dates';
import { EDITnavLinkTodoCount } from './6_other_Effects';

const todoTitleINPUT = document.querySelector('.input_todoTitle');
const todoDescINPUT = document.querySelector('.input_todoDesc');

export default function SUBMITnewTodo() {
  const {
    title, desc, priority, date,
  } = GETsubmitInfos();

  SELECTdate(date)
  if (title === '') return;
  ADDnewTodo(title, desc, priority, date);
  ADJUSThtmlAfterSubmit();
}

function ADJUSThtmlAfterSubmit() {
  // we could also just provide the obj at SUBMITnewTodo
  // here we are calling APPENDsingleTodo, so that we wouldn't need to reprint calender
  // this allows easier animations
  const todoOBJ = GETlastTouchTodoObj();
  const {
    title, priority, id, date,
  } = todoOBJ;

  const { month, year } = GETformatedDateInfo(date);

  APPENDtodoTitleToCell(FINDtargetCalCell(date), title, priority, id);
  APPENDsingleTodo(todoOBJ);
  EDITnavLinkTodoCount(month, year, GETtodosOfMonth(month, year).length);
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
