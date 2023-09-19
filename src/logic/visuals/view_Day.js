
import { format_Date } from "../general";
import { get_Todos_ofDay } from "../todo_Logic"


export function open_Day(date) {
    const title_dayView = document.querySelector('.title_dayView')
    title_dayView.textContent = date
    console.log(date);
}