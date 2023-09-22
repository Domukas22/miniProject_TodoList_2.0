
import { print_Calender_html } from "./1_print_Calender.js";
import { _print_Todos_html } from "./2_print_Todos.js"
import { print_navLinks,toggle_activeNavLink } from "./4_Nav.js"
import { toggle_Date_controlBox, toggle_calCell, clear_Element_hmtl, edit_yearTitle, play_clickEffect } from "./6_other_Effects.js";
import { format_Date, get_formatedDate_info } from "../general.js"


let date_Selected = format_Date(new Date())
let month_Selected = new Date().getMonth()
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
    toggle_Date_controlBox(date)
}
export function select_prev_Date() {
    let {day, month, year, day_Count} = get_formatedDate_info(get_selectedDate());

    if (day == 1) {
        day = new Date(year, month, 0).getDate()  
        if (month == 0) {
            month = 11; year--;
            select_Date(`${day}.${month}.${year}`);
            return;
        }
        select_Date(`${day}.${--month}.${year}`);
        return;
    } 
    select_Date(`${--day}.${month}.${year}`);
}
export function select_next_Date() {
    let {day, month, year, day_Count} = get_formatedDate_info(get_selectedDate());

    if (day == day_Count) {
        day = 1;  
        if (month == 11) {
            month = 0; year++;
            select_Date(`${day}.${month}.${year}`);
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

export function select_Month(month) {
    month_Selected = month
    print_Calender_html(`xx.${get_selectedMonth()}.${get_selectedYear()}`)
    toggle_activeNavLink()
}
export function select_prev_Month() {
    let month = get_selectedMonth()
    if (month == 0) {
            const year_New = get_selectedYear() - 1 
            print_navLinks(`1.${month}.${year_New}`)
            select_Year(year_New)
            select_Month(11);
            return;
    }
    select_Month(--month)
}
export function select_next_Month() {
    let month = get_selectedMonth()
    if (month == 11) {
        const year_New = get_selectedYear() + 1 
        print_navLinks(`1.${month}.${year_New}`)
        select_Year(year_New)
        select_Month(0);
        return;
    }
    select_Month(++month)
}

export function select_Year(year) {
    year_Selected = year
    play_clickEffect(document.querySelector('.wrap_navYear'))
    edit_yearTitle(year);

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



