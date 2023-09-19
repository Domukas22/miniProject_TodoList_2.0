
import { get_Todos_ofDay } from "../todo_Logic.js"
import { format_Date, get_monthInfo, is_Weekend } from "../general.js"
import { open_Day } from "./open_calDay.js"


export function create_Calender_html(year, month) {
    const {day_Count, blank_Count} = get_monthInfo(year, month)
    const div_Calender = document.querySelector('.calender')
    div_Calender.innerHTML = ''
    generate_blankDays_html(div_Calender, blank_Count)
    generate_calCells_html(div_Calender, day_Count, month, year)
}
export function add_todoTitle_toCell(div_calCell, title, priority, id) {
    const paragraph = document.createElement('p')
    paragraph.classList.add('dayBox_todoTitle')
    paragraph.setAttribute('data-priority', priority)
    paragraph.setAttribute('data-id', `${id}`)
    paragraph.innerHTML = title
    div_calCell.appendChild(paragraph)
}

function generate_blankDays_html(target, blank_Count) {
    //push blanks into calender
    for (let i = 0; i < blank_Count; i++) {
        const blank_Day = document.createElement('div')
        blank_Day.classList.add("blankDay")
        target.appendChild(blank_Day)
    }
}
function generate_calCells_html(calender, day_Count, month, year) {
    const date_Today = new Date()

    // create an html cell for every day in month
    for (let day_ofMonth = 1; day_ofMonth < day_Count + 1; day_ofMonth++) {
        const date_ofLoop = new Date(year, month, day_ofMonth)
        const status = get_dayStatus(date_Today, date_ofLoop)
        const todos = get_Todos_ofDay(`${day_ofMonth}.${month}.${year}`)
        create_divCell(calender, date_ofLoop, status, todos)
    }  
}
function create_divCell(calender, date_ofLoop, status, todos) {
    const div_calCell = document.createElement('div')
    div_calCell.classList.add('calender_Cell')
    div_calCell.classList.add(status)
    div_calCell.setAttribute('active', 'false')
    div_calCell.setAttribute('data-date', format_Date(date_ofLoop))
    div_calCell.innerHTML = `<p class="cornerText_dayOfMonth">${date_ofLoop.getDate()}</p>`
    append_todoTitles(div_calCell, todos)
    div_calCell.addEventListener('click', (e) => open_Day(e.currentTarget.dataset.date))
    
    calender.appendChild(div_calCell)
}
function append_todoTitles(div_calCell, todos) {
    todos.forEach(todo => {
        add_todoTitle_toCell(div_calCell, todo.title, todo.priority, todo.id)
    });
}
function get_dayStatus(day_Today, day_Requested) {
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







