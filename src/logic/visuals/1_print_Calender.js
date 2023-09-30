import { GETtodosOfDay } from "../todo_Logic";
import { FORMATEdate } from "../general";

export function PRINTcalender(
  ISfutureMonth,
  reqMONTH,
  reqYEAR,
  selDAY,
  selMONTH,
  selYEAR,
  SELECTdate,
) {
  const calenderPARENT = document.querySelector(".calenderPARENT");
  const oldCalenderDIV = document.querySelector(".calender");
  const newCalenderDIV = GENERATEcalender(
    reqMONTH,
    reqYEAR,
    selDAY,
    selMONTH,
    selYEAR,
    SELECTdate,
  );
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

function GENERATEcalender(
  reqMONTH,
  reqYEAR,
  selDAY,
  selMONTH,
  selYEAR,
  SELECTdate,
) {
  // formated date => "dd.mm.yyyy"
  const { dayCOUNT, blankCOUNT } = GETcellCount(reqYEAR, reqMONTH);

  const newCalenderDIV = document.createElement("div");
  newCalenderDIV.classList.add("calender");
  newCalenderDIV.setAttribute("data-position", "");

  GENERATEcalenderBlanks(blankCOUNT, newCalenderDIV);
  GENERATEcalenderCellS(
    reqMONTH,
    reqYEAR,
    selDAY,
    selMONTH,
    selYEAR,
    dayCOUNT,
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
  reqMONTH,
  reqYEAR,
  selDAY,
  selMONTH,
  selYEAR,
  dayCOUNT,
  SELECTdate,
  newCalenderDIV,
) {
  for (let loopDAY = 1; loopDAY < dayCOUNT + 1; loopDAY += 1) {
    const ISsameDate =
      loopDAY === selDAY && reqMONTH === selMONTH && reqYEAR === selYEAR;

    const todos = GETtodosOfDay(`${loopDAY}.${reqMONTH}.${reqYEAR}`);

    const calCellDIV = document.createElement("div");
    calCellDIV.classList.add("calender_Cell");
    calCellDIV.classList.add(
      GETcellColor(new Date(), new Date(reqYEAR, reqMONTH, loopDAY)),
    );
    if (ISsameDate) {
      calCellDIV.classList.add("active");
    }
    calCellDIV.setAttribute("data-date", `${loopDAY}.${reqMONTH}.${reqYEAR}`);
    calCellDIV.innerHTML = `<p class="cornerText_dayOfMonth">${loopDAY}</p><p class="calCellDOTS">...</p>`;
    calCellDIV.addEventListener("click", () =>
      SELECTdate(loopDAY, reqMONTH, reqYEAR),
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
    PREPENDtodoTitleToCell(calCellDIV, todo.title, todo.priority, todo.id);
  });
}
export function PREPENDtodoTitleToCell(calCellDIV, title, priority, id) {
  const paragraph = document.createElement("p");
  paragraph.classList.add("todoTitle_calCell");
  paragraph.setAttribute("data-priority", priority);
  paragraph.setAttribute("data-id", `${id}`);
  paragraph.innerHTML = title;
  calCellDIV.prepend(paragraph);
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
