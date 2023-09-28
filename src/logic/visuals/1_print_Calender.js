import { GETtodosOfDay } from "../todo_Logic";
import { FORMATEdate, GETformatedDateInfo } from "../general";

export function PRINTcalender(ISfutureMonth, month, year, selDATE, SELECTdate) {
  const calenderPARENT = document.querySelector(".calenderPARENT");
  const oldCalenderDIV = document.querySelector(".calender");
  const newCalenderDIV = GENERATEcalender(month, year, selDATE, SELECTdate);
  const oldCalenderPOSITION = ISfutureMonth ? "left" : "right";
  const newCalenderPOSITION = ISfutureMonth ? "right" : "left";

  oldCalenderDIV.setAttribute("data-position", oldCalenderPOSITION);
  newCalenderDIV.setAttribute("data-position", newCalenderPOSITION);
  calenderPARENT.appendChild(newCalenderDIV);
  setTimeout(() => {
    calenderPARENT.removeChild(oldCalenderDIV);
    newCalenderDIV.setAttribute("data-position", "");
  }, 120);
}

function GENERATEcalender(month, year, selDATE, SELECTdate) {
  // formated date => "dd.mm.yyyy"
  const { dayCOUNT, blankCOUNT } = GETcellCount(year, month);

  const newCalenderDIV = document.createElement("div");
  newCalenderDIV.classList.add("calender");
  newCalenderDIV.setAttribute("data-position", "");

  GENERATEcalenderBlanks(blankCOUNT, newCalenderDIV);
  GENERATEcalenderCellS(
    dayCOUNT,
    month,
    year,
    selDATE,
    SELECTdate,
    newCalenderDIV,
  );
  return newCalenderDIV;
}
function GENERATEcalenderBlanks(blankCOUNT, newCalenderDIV) {
  // push blanks into calender
  for (let i = 0; i < blankCOUNT; i += 1) {
    const blankDAY = document.createElement("div");
    blankDAY.classList.add("blankDay");
    newCalenderDIV.appendChild(blankDAY);
  }
}
function GENERATEcalenderCellS(
  dayCOUNT,
  month,
  year,
  selDATE,
  SELECTdate,
  newCalenderDIV,
) {
  const todayDATE = new Date();

  for (let monthDAY = 1; monthDAY < dayCOUNT + 1; monthDAY += 1) {
    const loopDATE = new Date(year, month, monthDAY);
    const cellCOLOR = GETcellColor(todayDATE, loopDATE);
    const todos = GETtodosOfDay(`${monthDAY}.${month}.${year}`);

    const calCellDIV = document.createElement("div");
    calCellDIV.classList.add("calender_Cell");
    calCellDIV.classList.add(cellCOLOR);
    if (FORMATEdate(loopDATE) === selDATE) {
      calCellDIV.classList.add("active");
    }
    calCellDIV.setAttribute("data-date", FORMATEdate(loopDATE));
    calCellDIV.innerHTML = `<p class="cornerText_dayOfMonth">${loopDATE.getDate()}</p>`;
    calCellDIV.addEventListener("click", (e) =>
      SELECTdate(e.currentTarget.dataset.date),
    );
    newCalenderDIV.appendChild(calCellDIV);
    APPENDtodoTitles(calCellDIV, todos);
  }
}
function GETcellCount(year, month) {
  const dayCOUNT = new Date(year, month + 1, 0).getDate();
  const blankCOUNT = new Date(year, month, 0).getDay();
  return { dayCOUNT, blankCOUNT };
}
function APPENDtodoTitles(calCellDIV, todos) {
  todos.forEach((todo) => {
    APPENDtodoTitleToCell(calCellDIV, todo.title, todo.priority, todo.id);
  });
}
export function APPENDtodoTitleToCell(calCellDIV, title, priority, id) {
  const paragraph = document.createElement("p");
  paragraph.classList.add("todoTitle_calCell");
  paragraph.setAttribute("data-priority", priority);
  paragraph.setAttribute("data-id", `${id}`);
  paragraph.innerHTML = title;
  calCellDIV.appendChild(paragraph);
}

function GETcellColor(todayDATE, requestedDATE) {
  const today = todayDATE.setHours(0, 0, 0, 0);
  const targetDAY = requestedDATE.setHours(0, 0, 0, 0);

  if (today > targetDAY) {
    return "passed";
  }
  if (today === targetDAY) {
    return "today";
  }
  if (today < targetDAY) {
    if (ISweekend(requestedDATE)) {
      return "future_weekend";
    }
    return "future";
  }
  return 'Error. Expected values "new Date()"';
}
function ISweekend(date) {
  return date.getDay() === 0 || date.getDay() === 6;
}
