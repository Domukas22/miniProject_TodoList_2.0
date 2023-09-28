import { PRINTcalender } from "./1_print_Calender";
import { PRINTtodos } from "./2_print_Todos";
import PRINTnavLinks from "./3_print_Nav";
import {
  TOGGLEactiveNavLink,
  EDITcontrolBoxDate,
  TOGGLEcalenderCell,
  EDITyearTitle,
  PLAYclickEffect,
  ISfutureDate,
} from "./6_other_Effects";

const today = new Date();
const selDATE = {
  selDAY: today.getDate(),
  selMONTH: today.getMonth(),
  selYEAR: today.getFullYear(),
};
// let selDATE = FORMATEdate(new Date());
let printedMONTH = new Date().getMonth();
let printedYEAR = new Date().getFullYear();

export function SELECTdate(reqDAY, reqMONTH, reqYEAR) {
  const { selDAY, selMONTH, selYEAR } = GETselectedDate();
  const ISsameDate =
    reqDAY === selDAY && reqMONTH === selMONTH && reqYEAR === selYEAR;
  const ISsameYear = reqYEAR === printedYEAR;
  const ISsameMonth = reqMONTH === printedMONTH;

  if (ISsameDate && ISsameYear && ISsameMonth) {
    TOGGLEcalenderCell(`${selDAY}.${selMONTH}.${selYEAR}`);
    EDITcontrolBoxDate(reqDAY, reqMONTH, reqYEAR);
    return;
  }

  if (!ISsameYear || !ISsameMonth) {
    if (!ISsameYear) {
      PRINTnavLinks(reqMONTH, reqYEAR, PRINTmonth, SETprintedMonth);
      EDITyearTitle(reqYEAR);
      SETprintedYear(reqYEAR);
    }

    TOGGLEactiveNavLink();
    PRINTmonth(reqMONTH, reqYEAR);
    SETprintedMonth(reqMONTH);
  }
  PRINTnavLinks(reqMONTH, reqYEAR, PRINTmonth, SETprintedMonth);
  TOGGLEcalenderCell(`${reqDAY}.${reqMONTH}.${reqYEAR}`);
  PRINTtodos(reqDAY, reqMONTH, reqYEAR);
  EDITcontrolBoxDate(reqDAY, reqMONTH, reqYEAR);
  SETselectedDate(reqDAY, reqMONTH, reqYEAR);
}
export function PRINTmonth(reqMONTH, reqYEAR) {
  // needs to check the date, not jsut the month, in case the year is differnet
  // console.log(GETprintedYear()); // RETURNS WRONG YEAR
  const { selDAY } = GETselectedDate();
  const ISfuture = ISfutureDate(
    reqMONTH,
    reqYEAR,
    GETprintedMonth(),
    GETprintedYear(),
  );
  PRINTcalender(
    ISfuture,
    reqMONTH,
    reqYEAR,
    selDAY,
    GETprintedMonth(),
    GETprintedYear(),
    SELECTdate,
  );
}

export function SELECTprevDate() {
  const { selDAY, selMONTH, selYEAR } = GETselectedDate();

  let newDAY = selDAY - 1;
  let newMONTH = selMONTH;
  let newYEAR = selYEAR;

  if (selDAY === 1) {
    newDAY = new Date(selYEAR, selMONTH, 0).getDate();
    newMONTH = selMONTH - 1;
    if (selMONTH === 0) {
      newMONTH = 11;
      newYEAR = selYEAR - 1;
    }
  }

  SELECTdate(newDAY, newMONTH, newYEAR);
}
export function SELECTnextDate() {
  const { selDAY, selMONTH, selYEAR } = GETselectedDate();
  const inMonthDAYS = new Date(selYEAR, selMONTH + 1, 0).getDate();

  let newDAY = selDAY + 1;
  let newMONTH = selMONTH;
  let newYEAR = selYEAR;

  if (selDAY === inMonthDAYS) {
    newDAY = 1;
    newMONTH = selMONTH + 1;
    if (selMONTH === 11) {
      newMONTH = 0;
      newYEAR = selYEAR + 1;
    }
  }

  SELECTdate(newDAY, newMONTH, newYEAR);
}
export function PRINTprevMonth() {
  const month = GETprintedMonth();
  const year = GETprintedYear();
  let newMONTH = month - 1;
  let newYEAR = year;

  if (month === 0) {
    newMONTH = 11;
    newYEAR -= 1;
  }

  PRINTmonth(newMONTH, newYEAR);
  PRINTnavLinks(newMONTH, newYEAR, PRINTmonth, SETprintedMonth);
  SETprintedMonth(newMONTH);
  SETprintedYear(newYEAR);
  EDITyearTitle(newYEAR);
}
export function PRINTnextMonth() {
  const month = GETprintedMonth();
  const year = GETprintedYear();
  let newMONTH = month + 1;
  let newYEAR = year;

  if (month === 11) {
    newMONTH = 0;
    newYEAR += 1;
  }

  PRINTmonth(newMONTH, newYEAR);
  PRINTnavLinks(newMONTH, newYEAR, PRINTmonth, SETprintedMonth);
  SETprintedMonth(newMONTH);
  SETprintedYear(newYEAR);
  EDITyearTitle(newYEAR);
}
export function SELECTtoday() {
  const todayNEW = new Date();

  SELECTdate(todayNEW.getDate(), todayNEW.getMonth(), todayNEW.getFullYear());
}

function SETselectedDate(reqDAY, reqMONTH, reqYEAR) {
  selDATE.selDAY = reqDAY;
  selDATE.selMONTH = reqMONTH;
  selDATE.selYEAR = reqYEAR;
}
export function SETprintedMonth(reqMONTH) {
  printedMONTH = reqMONTH;
}
function SETprintedYear(reqYEAR) {
  printedYEAR = reqYEAR;
}

export function GETselectedDate() {
  return selDATE;
}
export function GETprintedMonth() {
  return printedMONTH;
}
export function GETprintedYear() {
  return printedYEAR;
}
