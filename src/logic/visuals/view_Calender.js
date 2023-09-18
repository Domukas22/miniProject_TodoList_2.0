
import { get_Todos_ofDay } from "../todo_Logic"
import { open_Day } from "./interactions"

// the selected day should be a variable, and not driven by html
let selected_Day = 'yy'

export function create_Calender_html(year, month) {
    const {day_Count, blank_Count} = get_monthInfo(year, month)
    const div_Calender = document.querySelector('.calender')
    generate_blankDays_html(div_Calender, blank_Count)
    generate_monthDays_html(div_Calender, day_Count, year, month)
}

function generate_monthDays_html(calender, day_Count, year, month) {
    // for every day in the month, create an html cell
    const day_Today = new Date().setHours(0, 0, 0, 0);

    for (let day = 1; day < day_Count + 1; day++) {
        const day_Requested = new Date(year, month, day).setHours(0, 0, 0, 0);
        const cal_Day_status = get_dayStatus(day_Today, day_Requested)

        const cal_Day_html = create_calCell_html(day, cal_Day_status)
        const cal_Day_todos = get_Todos_ofDay(`${day}.${month}.${year}`)
        
        
        // if the day has todos, print their titles 
        if (cal_Day_todos.length > 0) {
            for (let i = 0; i < cal_Day_todos.length; i++) {
                cal_Day_html.appendChild(create_todoTitle_html(cal_Day_todos[i].title))
            }
        }

        cal_Day_html.addEventListener('click', (e) => {
            cal_Day_todos.length <= 0 ? console.log('No todos') : console.log(cal_Day_todos)
        })
        
        calender.appendChild(cal_Day_html)
    }  
}

function create_calCell_html(day_ofMonth, status) {
    const cal_Day = document.createElement('div')
    cal_Day.classList.add('calender_Cell')
    cal_Day.classList.add(status)
    cal_Day.setAttribute('active', 'false')
    cal_Day.innerHTML = `<p class="cornerText_dayOfMonth">${day_ofMonth}</p>`
    cal_Day.addEventListener('click', e => open_Day(e.currentTarget))
    return cal_Day
}
function create_todoTitle_html(title) {
    const todo_Title_html = document.createElement('p');
    todo_Title_html.classList.add('dayBox_todoTitle');
    todo_Title_html.textContent = title;
    return todo_Title_html
}

function generate_blankDays_html(target, blank_Count) {
    //push blanks into calender
    for (let i = 0; i < blank_Count; i++) {
        const blank_Day = document.createElement('div')
        blank_Day.classList.add("blankDay")
        target.appendChild(blank_Day)
    }
}
function get_dayStatus(day_Today, day_Requested) {
    const is_Weekend = () => {
        return (new Date(day_Requested).getDay() === 0 || new Date(day_Requested).getDay() === 6)
    } 

    if (day_Today > day_Requested) {return 'passed'}
    if (day_Today == day_Requested) {return 'today'}
    if (day_Today < day_Requested) {
        if (is_Weekend()){return 'future_weekend'}
        return 'future'
    }
    return 'Error. Expected values ==> new Date().setHours(0, 0, 0, 0);'
}
function get_monthInfo(year, month) {
    const day_Count = new Date(year, month + 1, 0).getDate()
    const blank_Count = new Date(year, month, 0).getDay()
    return {day_Count, blank_Count}
}





