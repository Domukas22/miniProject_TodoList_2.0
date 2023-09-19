


export function generate_ID() {
    return Math.floor(10000 + Math.random() * 900000);
}
export function format_Date(date) { // new Date(year, month, day)
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}
export function get_monthInfo(year, month) {
    const day_Count = new Date(year, month + 1, 0).getDate()
    const blank_Count = new Date(year, month, 0).getDay()
    return {day_Count, blank_Count}
}
export function is_Weekend(date) {
    return (date.getDay() === 0 || date.getDay() === 6)
}
