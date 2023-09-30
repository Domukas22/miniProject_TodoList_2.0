import { PRINTcalender } from "./1_print_Calender";
import { PRINTtodos } from "./2_print_Todos";
import PRINTnavLinks from "./3_print_Nav";
import {
  TOGGLEactiveNavLink,
  EDITcontrolBoxDate,
  TOGGLEcalenderCell,
  EDITyearTitle,
  PLAYclickEffect,
  ISfutureDate as ISfuturePrintDate,
} from "./6_other_Effects";

const today = new Date();
const selDATE = {
  selDAY: today.getDate(),
  selMONTH: today.getMonth(),
  selYEAR: today.getFullYear(),
};
const printedDATE = {
  printedMONTH: new Date().getMonth(),
  printedYEAR: new Date().getFullYear(),
};

export function SELECTdate(reqDAY, reqMONTH, reqYEAR) {
  const { selDAY, selMONTH, selYEAR } = GETselectedDate();
  const { ISsameSelectedDate, ISsamePrintedYear, ISsamePrintedMonth } =
    GETdateSelectionInfos(selDAY, selMONTH, selYEAR, reqDAY, reqMONTH, reqYEAR);

  if (ISsameSelectedDate && ISsamePrintedYear && ISsamePrintedMonth) {
    TOGGLEcalenderCell(`${selDAY}.${selMONTH}.${selYEAR}`);
    PLAYclickEffect(document.querySelector(".date_controlBox"));
    return;
  }
  HANLDEnewDateSelection(
    ISsamePrintedYear,
    ISsamePrintedMonth,
    reqDAY,
    reqMONTH,
    reqYEAR,
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
export function SELECTtoday() {
  const todayNEW = new Date();
  SELECTdate(todayNEW.getDate(), todayNEW.getMonth(), todayNEW.getFullYear());
}

export function PRINTmonth(reqMONTH, reqYEAR, ISfuturePrint) {
  const { selDAY, selMONTH, selYEAR } = GETselectedDate();
  console.log(ISfuturePrint);

  PRINTcalender(
    ISfuturePrint,
    reqMONTH,
    reqYEAR,
    selDAY,
    selMONTH,
    selYEAR,
    SELECTdate,
  );
}
export function PRINTprevMonth() {
  const { printedMONTH, printedYEAR } = GETprintedDate();
  let newMONTH = printedMONTH - 1;
  let newYEAR = printedYEAR;

  if (printedMONTH === 0) {
    newMONTH = 11;
    newYEAR -= 1;
    PRINTnavLinks(newMONTH, newYEAR, PRINTmonth, SETprintedMonth);
  }

  const ISfuturePrint = ISfuturePrintDate(
    newMONTH,
    newYEAR,
    printedMONTH,
    printedYEAR,
  );

  PRINTmonth(newMONTH, newYEAR, ISfuturePrint);
  EDITyearTitle(newYEAR);
  SETprintedYear(newYEAR);
  SETprintedMonth(newMONTH);
  TOGGLEactiveNavLink(newMONTH);
}
export function PRINTnextMonth() {
  const { printedMONTH, printedYEAR } = GETprintedDate();
  let newMONTH = printedMONTH + 1;
  let newYEAR = printedYEAR;

  if (printedMONTH === 11) {
    newMONTH = 0;
    newYEAR += 1;
    EDITyearTitle(newYEAR);
  }

  const ISfuturePrint = ISfuturePrintDate(
    newMONTH,
    newYEAR,
    printedMONTH,
    printedYEAR,
  );

  PRINTmonth(newMONTH, newYEAR, ISfuturePrint);
  PRINTnavLinks(newMONTH, newYEAR, PRINTmonth, SETprintedMonth);
  SETprintedYear(newYEAR);
  SETprintedMonth(newMONTH);
  TOGGLEactiveNavLink(newMONTH);
}

function SETselectedDate(reqDAY, reqMONTH, reqYEAR) {
  selDATE.selDAY = reqDAY;
  selDATE.selMONTH = reqMONTH;
  selDATE.selYEAR = reqYEAR;
}
export function SETprintedMonth(reqMONTH) {
  printedDATE.printedMONTH = reqMONTH;
}
function SETprintedYear(reqYEAR) {
  printedDATE.printedYEAR = reqYEAR;
}

export function GETselectedDate() {
  return selDATE;
}
function GETprintedDate() {
  return printedDATE;
}

function GETdateSelectionInfos(
  selDAY,
  selMONTH,
  selYEAR,
  reqDAY,
  reqMONTH,
  reqYEAR,
) {
  const ISsameSelectedDate =
    reqDAY === selDAY && reqMONTH === selMONTH && reqYEAR === selYEAR;
  const { printedYEAR, printedMONTH } = GETprintedDate();

  const ISsamePrintedYear = reqYEAR === printedYEAR;
  const ISsamePrintedMonth = reqMONTH === printedMONTH;

  return { ISsameSelectedDate, ISsamePrintedYear, ISsamePrintedMonth };
}
function HANLDEnewDateSelection(
  ISsamePrintedYear,
  ISsamePrintedMonth,
  reqDAY,
  reqMONTH,
  reqYEAR,
) {
  if (!ISsamePrintedYear || !ISsamePrintedMonth) {
    PRINTmonth(reqMONTH, reqYEAR);

    if (!ISsamePrintedYear) {
      PRINTnavLinks(reqMONTH, reqYEAR, PRINTmonth, SETprintedMonth);
      EDITyearTitle(reqYEAR);
      SETprintedYear(reqYEAR);
    }
    TOGGLEactiveNavLink();
    SETprintedMonth(reqMONTH);
  }

  PRINTnavLinks(reqMONTH, reqYEAR, PRINTmonth, SETprintedMonth);
  TOGGLEcalenderCell(`${reqDAY}.${reqMONTH}.${reqYEAR}`);
  PRINTtodos(reqDAY, reqMONTH, reqYEAR);
  EDITcontrolBoxDate(reqDAY, reqMONTH, reqYEAR);
  SETselectedDate(reqDAY, reqMONTH, reqYEAR);
}
