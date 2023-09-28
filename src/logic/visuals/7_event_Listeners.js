import { PRINTcalender } from "./1_print_Calender";
import { PRINTtodos } from "./2_print_Todos";
import PRINTnavLinks from "./3_print_Nav";
import SUBMITnewTodo from "./4_submit_newTodo";
import {
  GETselectedDate,
  GETprintedYear,
  SELECTdate,
  SELECTprevDate,
  SELECTnextDate,
  PRINTmonth,
  SETprintedMonth,
  PRINTnextMonth,
  PRINTprevMonth,
  SELECTtoday,
} from "./5_select_Dates";
import {
  EDITyearTitle,
  PLAYclickEffect,
  TOGGLEtodoForm,
  EDITcontrolBoxDate,
} from "./6_other_Effects";

export default function SETlisteners() {
  console.log("-------");

  const {
    selDAY: todayDAY,
    selMONTH: todayMONTH,
    selYEAR: todayYEAR,
  } = GETselectedDate();

  PRINTnavLinks(todayMONTH, todayYEAR, PRINTmonth, SETprintedMonth);

  PRINTcalender(
    true,
    todayMONTH,
    todayYEAR,
    todayDAY,
    todayMONTH,
    todayYEAR,
    SELECTdate,
  );
  PRINTtodos(todayDAY, todayMONTH, todayYEAR);
  EDITcontrolBoxDate(todayDAY, todayMONTH, todayYEAR);
  EDITyearTitle(GETprintedYear());

  const createTodoBTN = document.querySelector(".btn_createTodo.submit");
  const cancelTodoBTN = document.querySelector(".btn_createTodo.cancel");
  const openFormOVERLAY = document.querySelector(".overlay_openForm");
  createTodoBTN.addEventListener("click", SUBMITnewTodo);
  cancelTodoBTN.addEventListener("click", (e) => {
    TOGGLEtodoForm(e.currentTarget.dataset.action);
  });
  openFormOVERLAY.addEventListener("click", (e) => {
    TOGGLEtodoForm(e.currentTarget.dataset.action);
  });

  const prevDayBTN = document.querySelector('.controlBtn[data-action="prev"]');
  const currentDayBTN = document.querySelector(
    '.controlBtn[data-action="current"]',
  );
  const selectedDayBTN = document.querySelector(".date_controlBox");
  const nextDayBTN = document.querySelector('.controlBtn[data-action="next"]');
  prevDayBTN.addEventListener("click", PRINTprevMonth);
  currentDayBTN.addEventListener("click", SELECTtoday);
  nextDayBTN.addEventListener("click", PRINTnextMonth);
  selectedDayBTN.addEventListener("click", () => {
    const { selDAY, selMONTH, selYEAR } = GETselectedDate();
    SELECTdate(selDAY, selMONTH, selYEAR);
  });

  const colorOnClickBTNS = document.querySelectorAll(
    '[data-click_effect="false"]',
  );
  colorOnClickBTNS.forEach((btn) =>
    btn.addEventListener("click", (e) => PLAYclickEffect(e.currentTarget)),
  );

  let ISshiftPressed = false;
  window.addEventListener("keyup", (e) => {
    if (e.key === "Shift") {
      ISshiftPressed = false;
    }
  });
  window.addEventListener("keydown", (e) => {
    const ISformOpen =
      document.querySelector(".todo_Form").dataset.open === "true";
    if (e.key === "Shift") {
      ISshiftPressed = true;
    }
    if (e.key === "a" || e.key === "A" || e.key === "ArrowLeft") {
      if (ISformOpen) return;
      if (ISshiftPressed) {
        PRINTprevMonth();
        return;
      }
      SELECTprevDate();
    }
    if (e.key === "d" || e.key === "D" || e.key === "ArrowRight") {
      if (ISformOpen) return;
      if (ISshiftPressed) {
        PRINTnextMonth();
        return;
      }
      SELECTnextDate();
    }
    if (e.key === "w" || e.key === "W" || e.key === "ArrowUp") {
      if (ISshiftPressed) return;
      if (ISformOpen) return;
      const { selDAY, selMONTH, selYEAR } = GETselectedDate();
      const upDAY = selDAY - 7;
      if (upDAY > 0) SELECTdate(upDAY, selMONTH, selYEAR);
    }
    if (e.key === "s" || e.key === "S" || e.key === "ArrowDown") {
      if (ISshiftPressed) return;
      if (ISformOpen) return;
      const { selDAY, selMONTH, selYEAR } = GETselectedDate();
      const dayCOUNT = new Date(selYEAR, selMONTH + 1, 0).getDate();
      const downDAY = selDAY + 7;
      if (downDAY <= dayCOUNT) SELECTdate(downDAY, selMONTH, selYEAR);
    }

    if (e.key === "ArrowUp") {
      if (!ISformOpen) return;
      const checkedRADIO = document.querySelector(".radio_Priority:checked");
      if (checkedRADIO.dataset.priority === "1") {
        checkedRADIO.parentElement.lastElementChild.checked = true;
        return;
      }
      checkedRADIO.previousElementSibling.checked = true;
    }
    if (e.key === "ArrowDown") {
      if (!ISformOpen) return;
      const checkedRADIO = document.querySelector(".radio_Priority:checked");
      if (checkedRADIO.dataset.priority === "3") {
        checkedRADIO.parentElement.firstElementChild.checked = true;
        return;
      }
      checkedRADIO.nextElementSibling.checked = true;
    }

    if (e.key === "Escape") TOGGLEtodoForm("close");
    if (e.key === " ") {
      if (ISformOpen) return;
      TOGGLEtodoForm("open");
    }
    if (e.key === "Enter") {
      if (!ISformOpen) return;
      SUBMITnewTodo();
    }
  });
}
