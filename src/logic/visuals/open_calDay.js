
import { format_Date, get_dateInfo } from "../general.js"
import { get_Todos_ofDay } from "../todo_Logic.js"
import {  print_nextMonth, print_previousMonth, print_currentMonth } from "./create_Calender.js";




export function open_Day(date = dispalyed_Day) {
     // formated date => "dd.mm.yyyy"
    empty_todoWrap()
    toggle_calCell(date)
    generate_Todos_html(date)
    console.log(get_dateInfo(date));
}
// export function toggle_Day(value) { 
//     // for the control window, going 1 step forward or back (class="wrap_Controls")
//     if (value == 'prev') { open_previousDay(dispalyed_Day); return }
//     if (value == 'next') { open_nextDay(dispalyed_Day); return }
//     open_Today()
// }


function generate_Todos_html(date) {
    const todos = get_Todos_ofDay(date)
    todos.forEach(todo_Obj => {
        create_singleTodo_html(todo_Obj)
    })
}
export function create_singleTodo_html(obj_Todo) {
    const todo_Wrap = document.querySelector('.wrap_Todos')
    const div_Todo = document.createElement('div')
        div_Todo.classList.add('todo')
        div_Todo.setAttribute('data-id', `${obj_Todo.id}`)
        div_Todo.innerHTML = `
            <p class="title_Todo" data-priority="${obj_Todo.priority}">${obj_Todo.title}</p>
            <p class="desc_Todo" data-empty="${obj_Todo.desc !== ''}">${obj_Todo.desc}</p>
            <div class="actionBox_Todo">
                <div class="todoBtn remove">X</div>
            </div>
        `
        listen_forRemove(div_Todo, obj_Todo)
        todo_Wrap.appendChild(div_Todo)
}

function listen_forRemove(div_Todo, todo) {
    const bnt_Remove = div_Todo.querySelector('.todo .remove')
    bnt_Remove.addEventListener('click', () => {
        todo.remove()
        remove_Elment_html(".todoTitle_calCell", todo.id)
        remove_Elment_html('.todo', todo.id)
    })
    
}
function get_dateWithMonth(date) {
    // formated date => "dd.mm.yyy"
    // returs => "dd. Month yy"
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                     'August', 'September', 'October', 'November', 'December'];
    const [day, month, year] = date.split('.')
    return `${day}. ${months[month]} ${year}`
}
// function toggle_dayView_title(date) {
//     const title_Day = document.querySelector('.title_Day')
//     title_Day.textContent = get_dateWithMonth(date)
// }
function toggle_calCell(date) {
    const cells_All = document.querySelectorAll(`.calender_Cell`)
    cells_All.forEach(cell => {
        if (cell.classList.contains('active')) {
            cell.classList.remove('active')
        }
        if (cell.dataset.date == date) {
            cell.classList.add('active')
        }
    })
}
function empty_todoWrap() {
    document.querySelector('.wrap_Todos').innerHTML = ''
}
function remove_Elment_html(el_Class, id,) {
    const el = document.querySelector(`${el_Class}[data-id="${id}"]`)
    if (!el) {return}
    el.remove()
}
function get_daysInMonth(date) {
    // formated date => "dd.mm.yyyy"
    const [day, month, year] = date.split('.').map(Number);
    return new Date(year, month + 1, 0);
}

function open_previousDay(date) {
    // formated date => "dd.mm.yyyy"
    // const {day, month, year, day_Count} = get_dateInfo(date)
    // if (day == 1) {
    //     // print_previousMonth({month, year})
    //     // open_Day(format_Date(new Date(year, month, day)))
    // }
    
}
// function print_nextMonth(obj_selectedMonth) {
//     let {month, year} = obj_selectedMonth

//     if (month == 11) {month = 0; year++; return}
//     month++;

//     displayed_Month = {month, year}
//     create_Calender_html(month, year)
// }