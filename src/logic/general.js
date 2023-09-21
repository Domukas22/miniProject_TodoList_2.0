


export function generate_ID() {
    return Math.floor(10000 + Math.random() * 900000);
}
export function format_Date(date) { // new Date(year, month, day)
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}
export function get_formatedDate_info(date) {
    // formated date => "dd.mm.yyyy"
    const [day, month, year] = date.split('.').map(Number);
    const day_Count = new Date(year, month - 1, 0).getDate();
    return {day, month, year, day_Count}
}
export function get_Date_withMonth(date) {
    // formated date => "dd.mm.yyy"
    // returs => "dd. Month yy"
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                     'August', 'September', 'October', 'November', 'December'];
    const [day, month, year] = date.split('.')
    return `${day}. ${months[month]} ${year}`
}