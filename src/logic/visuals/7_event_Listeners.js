import { PRINTcalender } from './1_print_Calender';
import { PRINTtodos } from './2_print_Todos';
import PRINTnavLinks from './3_print_Nav';
import SUBMITnewTodo from './4_submit_newTodo';
import {
  GETselectedDate,
  GETselectedYear,
  SELECTdate,
  SELECTprevDate,
  SELECTnextDate,
  SELECTmonth,
  SELECTnextMonth,
  SELECTprevMonth,
  SELECTtoday,
} from './5_select_Dates';
import {
  EDITyearTitle,
  PLAYclickEffect,
  TOGGLEtodoForm,
} from './6_other_Effects';

export default function SETlisteners() {
  console.log('-------');

  const today = GETselectedDate();
  PRINTnavLinks(today, SELECTmonth);
  PRINTcalender(today, today, SELECTdate);
  PRINTtodos(today);
  EDITyearTitle(GETselectedYear());

  const createTodoBTN = document.querySelector('.btn_createTodo.submit');
  const cancelTodoBTN = document.querySelector('.btn_createTodo.cancel');
  const openFormOVERLAY = document.querySelector('.overlay_openForm');
  createTodoBTN.addEventListener('click', SUBMITnewTodo);
  cancelTodoBTN.addEventListener('click', e => {
    TOGGLEtodoForm(e.currentTarget.dataset.action);
  });
  openFormOVERLAY.addEventListener('click', e => {
    TOGGLEtodoForm(e.currentTarget.dataset.action);
  });

  const prevDayBTN = document.querySelector('.controlBtn[data-action="prev"]');
  const currentDayBTN = document.querySelector(
    '.controlBtn[data-action="current"]',
  );
  const selectedDayBTN = document.querySelector('.date_controlBox');
  const nextDayBTN = document.querySelector('.controlBtn[data-action="next"]');
  prevDayBTN.addEventListener('click', SELECTprevMonth);
  currentDayBTN.addEventListener('click', SELECTtoday);
  nextDayBTN.addEventListener('click', SELECTnextMonth);
  selectedDayBTN.addEventListener('click', () => SELECTdate(GETselectedDate()));

  const colorOnClickBTNS = document.querySelectorAll(
    '[data-click_effect="false"]',
  );
  colorOnClickBTNS.forEach(btn =>
    btn.addEventListener('click', e => PLAYclickEffect(e.currentTarget)),
  );

  let ISdPressed = false;
  window.addEventListener('keyup', e => {
    if (e.key === 'd') {
      ISdPressed = false;
    }
  });
  window.addEventListener('keydown', e => {
    const ISformOpen =
      document.querySelector('.todo_Form').dataset.open === 'true';

    if (e.key === 'd') {
      ISdPressed = true;
    }
    if (e.key === 'ArrowLeft') {
      if (ISformOpen) return;
      if (ISdPressed) {
        SELECTprevDate();
        return;
      }
      SELECTprevMonth();
    }
    if (e.key === 'ArrowRight') {
      if (ISformOpen) return;
      if (ISdPressed) {
        SELECTnextDate();
        return;
      }
      SELECTnextMonth();
    }
    if (e.key === 'ArrowUp') {
      if (!ISformOpen) return;
      const checkedRADIO = document.querySelector('.radio_Priority:checked');
      if (checkedRADIO.dataset.priority === '1') {
        checkedRADIO.parentElement.lastElementChild.checked = true;
        return;
      }
      checkedRADIO.previousElementSibling.checked = true;
    }
    if (e.key === 'ArrowDown') {
      if (!ISformOpen) return;
      const checkedRADIO = document.querySelector('.radio_Priority:checked');
      if (checkedRADIO.dataset.priority === '3') {
        checkedRADIO.parentElement.firstElementChild.checked = true;
        return;
      }
      checkedRADIO.nextElementSibling.checked = true;
    }

    if (e.key === 'Escape') TOGGLEtodoForm('close');
    if (e.key === ' ') {
      if (ISformOpen) return;
      TOGGLEtodoForm('open');
    }
    if (e.key === 'Enter') {
      if (!ISformOpen) return;
      SUBMITnewTodo();
    }
  });
}
