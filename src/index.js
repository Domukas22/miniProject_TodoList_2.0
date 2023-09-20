import { add_newTodo } from "./logic/todo_Logic.js";
import { create_Calender_html, toggle_Month } from "./logic/visuals/create_Calender.js";
import { format_Date, generate_ID } from "./logic/general.js";
import { submit_newTodo } from "./logic/visuals/submit_newTodo.js";
import { toggle_todoFrom } from "./logic/visuals/toggle_todoForm.js";
import './styles/reset.css'
import './styles/main.css'
import './styles/nav.css'

import './styles/view_Calender/calender.css'
import './styles/view_Calender/calender_Cells.css'

import './styles/view_Day/general.css'
import './styles/view_Day/form_createTodo.css'
import './styles/view_Day/todo.css'




console.log('--------------------------------------------------');
(() => {
    add_newTodo('Shopping', '', 2, format_Date(new Date(2023, 2, 14)), generate_ID())
    add_newTodo('Training', '', 3, format_Date(new Date(2023, 8, 18)), generate_ID())
    add_newTodo('Secodn training', '', 1, format_Date(new Date(2023, 8, 14)), generate_ID())
    
    create_Calender_html()
    
    const btn_createTodo = document.querySelector('.btn_createTodo.submit')
    btn_createTodo.addEventListener('click', submit_newTodo)

    const overlay_openForm = document.querySelector('.overlay_openForm')
    const btn_cancelTodo = document.querySelector('.btn_createTodo.cancel')
    overlay_openForm.addEventListener('click', (e) => {toggle_todoFrom(e.currentTarget.dataset.action)})
    btn_cancelTodo.addEventListener('click', (e) => {toggle_todoFrom(e.currentTarget.dataset.action)})

    // document.querySelector('.btn_changeMonth.prev').addEventListener('click', () => toggle_Month('prev'))
    // document.querySelector('.btn_changeMonth.current').addEventListener('click', () => toggle_Month('current'))
    // document.querySelector('.btn_changeMonth.next').addEventListener('click', () => toggle_Month('next'))
})()











