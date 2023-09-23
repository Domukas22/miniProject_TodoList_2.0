export function GENERATEid() {
  return Math.floor(10000 + Math.random() * 900000);
}
export function FORMATEdate(date) { // new Date(year, month, day)
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}
export function GETformatedDateInfo(date) {
  // formated date => "dd.mm.yyyy"
  const [day, month, year] = date.split('.').map(Number);
  const dayCOUNT = new Date(year, month + 1, 0).getDate();
  const monthWORD = GETdateWithMonth(`${day}.${month}.${year}`);
  return {
    day, month, year, dayCOUNT, monthWORD,
  };
}
export function GETdateWithMonth(date) {
  // formated date => "dd.mm.yyy"
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];
  const [day, month, year] = date.split('.');
  return `${day}. ${months[month]} ${year}`;
}
