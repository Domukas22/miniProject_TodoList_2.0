
import { print_Calender_html } from "./1_print_Calender.js";
import { _print_Todos_html } from "./2_print_Todos.js"
import { toggle_activeNavLink } from "./4_Nav.js";
import { toggle_Title_controlBox, toggle_calCell, clear_Element_hmtl, edit_yearTitle } from "./6_other_Effects.js";
import { format_Date, get_formatedDate_info } from "../general.js"


let date_Selected = format_Date(new Date())
let month_Selected = new Date().getDate()
let year_Selected = new Date().getFullYear()


export function select_Date(date) {
    date_Selected = date
    const {month, year} = get_formatedDate_info(date)

    select_Month(month)
    select_Year(year)

    print_Calender_html(date)
    toggle_calCell(date)

    clear_Element_hmtl('.wrap_Todos')
    _print_Todos_html(date)
    toggle_Title_controlBox(date)
}
export function select_Month(month) {
    month_Selected = month

    // this fucntion splits the string and only uses month / year
    print_Calender_html(`xx.${get_selectedMonth()}.${get_selectedYear()}`)
    toggle_activeNavLink(month)
}
export function select_Year(year) {
    year_Selected = year
}

export function select_next_Date() {
    let {day, month, year, day_Count} = get_formatedDate_info(get_selectedDate());

    if (day == day_Count) {
        day = 1;  
        if (month == 11) {
            month = 0; year++;
            select_Date(`${day}.${month}.${year}`);
            edit_yearTitle(year)
            return;
        }
        select_Date(`${day}.${++month}.${year}`);
        return;
    } 
    select_Date(`${++day}.${month}.${year}`);
}
export function select_Today() {
    const {day, month, year} = get_formatedDate_info(format_Date(new Date()))
    select_Date(`${day}.${month}.${year}`);
}
export function select_prev_Date() {
    let {day, month, year, day_Count} = get_formatedDate_info(get_selectedDate());

    if (day == 1) {
        day = new Date(year, month, 0).getDate()  
        console.log(new Date(year, month - 1, 0));
        if (month == 0) {
            month = 11; year--;
            select_Date(`${day}.${month}.${year}`);
            edit_yearTitle(year);
            return;
        }
        select_Date(`${day}.${--month}.${year}`);
        return;
    } 
    select_Date(`${--day}.${month}.${year}`);
}

export function get_selectedDate() {
    return date_Selected
}
export function get_selectedMonth() {
    return month_Selected
}
export function get_selectedYear() {
    return year_Selected
}



