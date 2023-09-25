import { GENERATEid, GETformatedDateInfo } from '../general';
import {
  ADDnewTodo,
  GETtodosOfMonth,
  GETlastTouchTodoObj,
  EDITtodo,
  GETtodoList,
} from '../todo_Logic';
import { APPENDtodoTitleToCell } from './1_print_Calender';
import { APPENDsingleTodo } from './2_print_Todos';
import { SELECTdate, GETselectedDate } from './5_select_Dates';
import {
  CLEARinputs,
  EDITnavLinkTodoCount,
  ADJUSThtmlAfterTodoEdit,
} from './6_other_Effects';

export default function SUBMITnewTodo() {
  const { title, desc, priority, date } = GETsubmitInfos();
  const todoFORM = document.querySelector('.todo_Form');
  const ISediting = todoFORM.dataset.editing === 'true';
  if (title === '') return;

  if (ISediting) {
    SELECTdate(date);
    EDITtodo(
      parseFloat(todoFORM.dataset.toeditid),
      title,
      desc,
      priority,
      GETtodoList(),
    );
    ADJUSThtmlAfterTodoEdit(
      title,
      desc,
      priority,
      GETlastTouchTodoObj().id,
      todoFORM,
    );
    return;
  }

  document.querySelector('.input_todoTitle').focus();
  SELECTdate(date);
  ADDnewTodo(title, desc, parseFloat(priority), date);
  ADJUSThtmlAfterNewTodo();
}

function ADJUSThtmlAfterNewTodo() {
  // we could also just provide the obj at SUBMITnewTodo
  // here we are calling APPENDsingleTodo, so that we wouldn't need to reprint calender
  // this allows easier animations
  const todoOBJ = GETlastTouchTodoObj();
  const { title, priority, id, date } = todoOBJ;

  const { month, year } = GETformatedDateInfo(date);

  APPENDtodoTitleToCell(FINDtargetCalCell(date), title, priority, id);
  APPENDsingleTodo(todoOBJ);
  EDITnavLinkTodoCount(month, year, GETtodosOfMonth(month, year).length);
  CLEARinputs();
}
function GETsubmitInfos() {
  const title = document.querySelector('.input_todoTitle').value;
  const desc = document.querySelector('.input_todoDesc').value;
  const priority = GETselectedPriority();
  const id = GENERATEid();
  const date = GETselectedDate();

  return {
    title,
    desc,
    priority,
    id,
    date,
  };
}
function GETselectedPriority() {
  const priorityRADIOS = document.querySelectorAll(
    '.radio_Priority[data-action="create"]',
  );
  return Array.from(priorityRADIOS).find(x => x.checked === true).dataset
    .priority;
}
function FINDtargetCalCell(date) {
  // formated date => "dd.mm.yyy"
  return document.querySelector(`.calender_Cell[data-date="${date}"]`);
}
