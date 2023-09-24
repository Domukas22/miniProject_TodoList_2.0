import SETlisteners from './logic/visuals/7_event_Listeners';
import { GETallTodos } from './logic/todo_Logic';

import './styles/reset.css';
import './styles/main.css';
import './styles/nav.css';

import './styles/view_Calender/calender.css';
import './styles/view_Calender/calender_Cells.css';

import './styles/view_Day/general.css';
import './styles/view_Day/controls.css';
import './styles/view_Day/form_createTodo.css';
import './styles/view_Day/todo.css';

(() => {
  SETlisteners();
  // GETallTodos();
})();
