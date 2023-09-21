
import { add_todoTitle_toCell } from "./1_create_Calender.js"
import { create_singleTodo_html, get_displayedDate } from "./2_print_Date.js";
import { generate_ID } from "../general.js";
import { add_newTodo, get_lastTouched_todoObj } from "../todo_Logic.js"

const input_todoTitle = document.querySelector('.input_todoTitle')
const input_todoDesc = document.querySelector('.input_todoDesc')


export function submit_newTodo() {
    const {title, desc, priority, date} = get_submitInfos()
    if (title == ''){console.log('ERROR. Provide a title'); return}
    add_newTodo(title, desc, priority, date)
    adjust_html_afterSubmit(get_lastTouched_todoObj())
}
export function toggle_todoFrom(action) {
    const todo_Form = document.querySelector('.todo_Form')
    
    if (action == 'open') {
        todo_Form.setAttribute('data-open', 'true')
        todo_Form.style.height = '242px'
        todo_Form.style.minHeight = '242px'
        todo_Form.style.maxHeight = '242px'
        return
    }
    todo_Form.setAttribute('data-open', 'false')
    todo_Form.style.height = '50px'
    todo_Form.style.minHeight = '50px'
    todo_Form.style.maxHeight = '100vh'
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
function get_submitInfos() {
    const title = input_todoTitle.value
    const desc = input_todoDesc.value
    const priority = get_selectedPriority()
    const id = generate_ID()
    const date = get_displayedDate()

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

