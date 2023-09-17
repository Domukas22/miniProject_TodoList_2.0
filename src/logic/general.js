


export function generate_ID() {
    return Math.floor(10000 + Math.random() * 900000);
}
export function format_Date(date) {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}