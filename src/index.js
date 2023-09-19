import { add_newTodo, select_Day } from "./logic/todo_Logic.js";
import { create_Calender_html } from "./logic/visuals/generate_Calender.js";
import { format_Date, generate_ID } from "./logic/general.js";
import { submit_newTodo } from "./logic/visuals/submit_newTodo.js";
import './styles/reset.css'
import './styles/main.css'
import './styles/view_Calender/calender.css'
import './styles/view_Calender/heading.css'
import './styles/view_Calender/sub_Heading.css'
import './styles/view_Day/heading.css'
import './styles/view_Day/form_createTodo.css'
import './styles/view_Day/todo.css'



console.log('--------------------------------------------------');
(() => {
    add_newTodo('Shopping', '', 2, format_Date(new Date(2023, 2, 14)), generate_ID())
    add_newTodo('Training', '', 3, format_Date(new Date(2023, 8, 18)), generate_ID())
    add_newTodo('Secodn training', '', 1, format_Date(new Date(2023, 8, 14)), generate_ID())
    
    create_Calender_html(new Date().getFullYear(), new Date().getMonth())
    select_Day(format_Date(new Date()))
    
    const btn_createTodo = document.querySelector('.btn_createTodo.done')
    btn_createTodo.addEventListener('click', submit_newTodo)
})()











