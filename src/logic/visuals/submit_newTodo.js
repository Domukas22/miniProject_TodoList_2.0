
import { add_newTodo, get_selectedDay_obj, get_lastTouched_todoObj } from "../todo_Logic.js"
import { add_todoTitle_toCell, get_displayedDate } from "./create_Calender.js"
import { format_Date, generate_ID } from "../general.js";
import { create_singleTodo_html } from "./open_calDay.js";

const input_todoTitle = document.querySelector('.input_todoTitle')
const input_todoDesc = document.querySelector('.input_todoDesc')


export function submit_newTodo() {
    const {title, desc, priority, id, date} = get_Infos_forTodo()
    add_newTodo(title, desc, priority, date, id)
    adjust_html_afterSubmit(get_lastTouched_todoObj())
}

function adjust_html_afterSubmit(obj_Todo) {
    const todo_Date = obj_Todo.date
    const todo_Title = obj_Todo.title
    const todo__Priority = obj_Todo.priority
    const todo_Id = obj_Todo.id

    add_todoTitle_toCell(find_targetCalCell(todo_Date), todo_Title, todo__Priority, todo_Id)
    create_singleTodo_html(obj_Todo)
    clear_Inputs()
}
function get_Infos_forTodo() {
    const title = input_todoTitle.value
    const desc = input_todoDesc.value
    const priority = get_selectedPriority()
    const id = generate_ID()

    const {day, month, year} = get_displayedDate()
    const date = format_Date(new Date(year, month, day)); // this needs to return a formated strings

    return {title, desc, priority, id, date}
}
function get_selectedPriority() {
    const radio_Priorities = document.querySelectorAll('.radio_Priority[data-action="create"]') 
    return Array.from(radio_Priorities).find(x => x.checked == true).dataset.priority
}
function find_targetCalCell(date) {
    // formated date => "dd.mm.yyy"
    return document.querySelector(`.calender_Cell[data-date="${date}"]`)
}
function clear_Inputs() {
    input_todoTitle.value = ''
    input_todoDesc.value = ''
    document.querySelector('.radio_Priority[data-priority="3"][data-action="create"]').checked = true
}

