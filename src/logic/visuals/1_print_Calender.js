
import { toggle_activeNavLink } from './4_Nav.js'
import { get_selectedDate, select_Date } from "./5_select_Dates.js"
import { clear_Element_hmtl, play_clickEffect } from "./6_other_Effects.js"
import { get_Todos_ofDay } from "../todo_Logic.js"
import { format_Date, get_formatedDate_info } from "../general.js"


export function print_Calender_html(date) {
    // formated date => "dd.mm.yyyy"
    const {month, year} = get_formatedDate_info(date)
    const {day_Count, blank_Count} = get_cellCount(year, month)
    clear_Element_hmtl('.calender')
    generate_blankDays_html(blank_Count)
    generate_calCells_html(day_Count, month, year)
}

function generate_blankDays_html(blank_Count) {
    //push blanks into calender
    const div_Calender = document.querySelector('.calender')
    for (let i = 0; i < blank_Count; i++) {
        const blank_Day = document.createElement('div')
        blank_Day.classList.add("blankDay")
        div_Calender.appendChild(blank_Day)
    }
}
function generate_calCells_html(day_Count, month, year) {
    const date_Today = new Date()
    const div_Calender = document.querySelector('.calender')
    // create an html cell for every day in month
    for (let day_ofMonth = 1; day_ofMonth < day_Count + 1; day_ofMonth++) {
        const date_ofLoop = new Date(year, month, day_ofMonth)
        const cell_Color = get_cellColor(date_Today, date_ofLoop)
        const todos = get_Todos_ofDay(`${day_ofMonth}.${month}.${year}`)
        create_divCell(div_Calender, date_ofLoop, cell_Color, todos)
    }  
}
function create_divCell(calender, date_ofLoop, status, todos) {
     // formated date => "dd.mm.yyyy"
    const div_calCell = document.createElement('div')
    div_calCell.classList.add('calender_Cell')
    if (format_Date(date_ofLoop) == get_selectedDate()) {div_calCell.classList.add('active')}
    div_calCell.classList.add(status)
    div_calCell.setAttribute('data-date', format_Date(date_ofLoop))
    div_calCell.innerHTML = `<p class="cornerText_dayOfMonth">${date_ofLoop.getDate()}</p>`
    append_todoTitles(div_calCell, todos)
    div_calCell.addEventListener('click', (e) => select_Date(e.currentTarget.dataset.date))
    calender.appendChild(div_calCell)
}

function get_cellCount(year, month) {
    const day_Count = new Date(year, month + 1, 0).getDate()
    const blank_Count = new Date(year, month, 0).getDay()
    return {day_Count, blank_Count}
}
function append_todoTitles(div_calCell, todos) {
    todos.forEach(todo => {
        add_todoTitle_toCell(div_calCell, todo.title, todo.priority, todo.id)
    });
}
export function add_todoTitle_toCell(div_calCell, title, priority, id) {
    const paragraph = document.createElement('p')
    paragraph.classList.add('todoTitle_calCell')
    paragraph.setAttribute('data-priority', priority)
    paragraph.setAttribute('data-id', `${id}`)
    paragraph.innerHTML = title
    div_calCell.appendChild(paragraph)
}

function get_cellColor(day_Today, day_Requested) {
    const today = day_Today.setHours(0, 0, 0, 0)
    const target_Day = day_Requested.setHours(0, 0, 0, 0)

    if (today > target_Day) {return 'passed'}
    if (today == target_Day) {return 'today'}
    if (today < target_Day) {
        if (is_Weekend(day_Requested)){return 'future_weekend'}
        return 'future'
    }
    return 'Error. Expected values "new Date()"'
}
function is_Weekend(date) {
    return (date.getDay() === 0 || date.getDay() === 6)
}








