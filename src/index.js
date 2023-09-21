import { print_Calender_html } from "./logic/visuals/1_print_Calender.js";
import { submit_newTodo, toggle_todoFrom } from "./logic/visuals/3_submit_newTodo.js";
import { print_navLinks } from "./logic/visuals/4_Nav.js";
import { get_selectedDate, get_selectedMonth, get_selectedYear, select_next_Date, select_prev_Date, select_Today } from "./logic/visuals/5_select_Dates.js";
import { edit_yearTitle } from "./logic/visuals/6_other_Effects.js";
import { add_newTodo } from "./logic/todo_Logic.js";
import { format_Date, generate_ID } from "./logic/general.js";

import './styles/reset.css'
import './styles/main.css'
import './styles/nav.css'

import './styles/view_Calender/calender.css'
import './styles/view_Calender/calender_Cells.css'

import './styles/view_Day/general.css'
import './styles/view_Day/form_createTodo.css'
import './styles/view_Day/todo.css'



(() => {

    console.log('--------------------------------------------------');
    console.log(get_selectedDate());
    console.log(get_selectedMonth());
    console.log(get_selectedYear());

    add_newTodo('Shopping', '', 2, format_Date(new Date(2023, 2, 14)), generate_ID())
    add_newTodo('Training', '', 3, format_Date(new Date(2023, 8, 18)), generate_ID())
    add_newTodo('Secodn training', '', 1, format_Date(new Date(2023, 8, 14)), generate_ID())
    
    const today = get_selectedDate()
    print_navLinks(today)
    print_Calender_html(today)
    edit_yearTitle(get_selectedYear())
    
    const btn_createTodo = document.querySelector('.btn_createTodo.submit')
    btn_createTodo.addEventListener('click', submit_newTodo)

    const overlay_openForm = document.querySelector('.overlay_openForm')
    const btn_cancelTodo = document.querySelector('.btn_createTodo.cancel')
    overlay_openForm.addEventListener('click', (e) => {toggle_todoFrom(e.currentTarget.dataset.action)})
    btn_cancelTodo.addEventListener('click', (e) => {toggle_todoFrom(e.currentTarget.dataset.action)})

    document.querySelector('.controlBtn[data-action="prev"]').addEventListener('click', select_prev_Date)
    document.querySelector('.controlBtn[data-action="current"]').addEventListener('click', select_Today)
    document.querySelector('.controlBtn[data-action="next"]').addEventListener('click', select_next_Date)
    
})()











