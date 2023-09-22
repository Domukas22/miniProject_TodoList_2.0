
import { print_Calender_html } from "./1_print_Calender.js";
import { submit_newTodo, toggle_todoFrom } from "./3_submit_newTodo.js";
import { print_navLinks } from "./4_Nav.js";
import { get_selectedDate, get_selectedYear, select_Date, select_Today, select_prev_Month, select_next_Month } from "./5_select_Dates.js";
import { edit_yearTitle, play_clickEffect } from "./6_other_Effects.js";
import { add_newTodo } from "../todo_Logic.js";
import { format_Date, generate_ID } from "../general.js";

export function set_Listeners() {
    console.log('-------');
 

    add_newTodo('Shopping', '', 2, format_Date(new Date(2023, 2, 14)), generate_ID())
    add_newTodo('Training', '', 3, format_Date(new Date(2023, 8, 18)), generate_ID())
    add_newTodo('Secodn training', '', 1, format_Date(new Date(2023, 8, 14)), generate_ID())
    
    const today = get_selectedDate()
    print_navLinks(today)
    print_Calender_html(today)
    edit_yearTitle(get_selectedYear())

    const btn_createTodo = document.querySelector('.btn_createTodo.submit')
    const btn_cancelTodo = document.querySelector('.btn_createTodo.cancel')
    const overlay_openForm = document.querySelector('.overlay_openForm')
    btn_createTodo.addEventListener('click', submit_newTodo)
    btn_cancelTodo.addEventListener('click', (e) => {toggle_todoFrom(e.currentTarget.dataset.action)})
    overlay_openForm.addEventListener('click', (e) => {toggle_todoFrom(e.currentTarget.dataset.action)})

    const btn_prevDay =  document.querySelector('.controlBtn[data-action="prev"]')
    const btn_currentDay =  document.querySelector('.controlBtn[data-action="current"]')
    const btn_selectedDay =  document.querySelector('.date_controlBox')
    const btn_nextDay =  document.querySelector('.controlBtn[data-action="next"]')
    btn_prevDay.addEventListener('click', select_prev_Month)
    btn_currentDay.addEventListener('click', select_Today)
    btn_nextDay.addEventListener('click', select_next_Month)
    btn_selectedDay.addEventListener('click', (e) => {
        select_Date(get_selectedDate())
        print_Calender_html(get_selectedDate())
    })

    const btns_toColor_onClick = document.querySelectorAll('[data-click_effect="false"]')
    btns_toColor_onClick.forEach(btn => btn.addEventListener('click', e => play_clickEffect(e.currentTarget)))

    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') select_prev_Month()
        if (e.key === 'ArrowRight') select_next_Month()
    })

    
}



