import { add_newTodo, select_Day } from "./logic/todo_Logic.js";
import { create_Calender_html } from "./logic/visuals/view_Calender.js";
import './styles/reset.css'
import './styles/main.css'
import './styles/view_Calender/calender.css'
import './styles/view_Calender/heading.css'
import './styles/view_Calender/sub_Heading.css'
import './styles/view_Day/heading.css'
import './styles/view_Day/todo_Template.css'
import './styles/view_Day/todo.css'



console.log('--------------------------------------------------');
add_newTodo('Shopping', '', 1, new Date(2023, 8, 14))
add_newTodo('Training', '', 1, new Date(2023, 8, 18))
add_newTodo('Secodn training', '', 1, new Date(2023, 8, 18))
select_Day('14.8.2023')


create_Calender_html(new Date().getFullYear(), new Date().getMonth())











