import { PRINTcalender } from './1_print_Calender';
import { SUBMITnewTodo, TOGGLEtodoForm } from './3_submit_newTodo';
import { PRINTnavLinks } from './4_print_Nav';
import {
  GETselectedDate, GETselectedYear, SELECTdate, SELECTtoday, SELECTprevMonth, SELECTnextMonth,
} from './5_select_Dates';
import { EDITyearTitle, PLAYclickEffect } from './6_other_Effects';
import { ADDnewTodo } from '../todo_Logic';
import { FORMATEdate, GENERATEid } from '../general';

export default function SETlisteners() {
  console.log('-------');

  ADDnewTodo('Shopping', '', 2, FORMATEdate(new Date(2023, 2, 14)), GENERATEid());
  ADDnewTodo('Training', '', 3, FORMATEdate(new Date(2023, 8, 18)), GENERATEid());
  ADDnewTodo('Secodn training', '', 1, FORMATEdate(new Date(2023, 8, 14)), GENERATEid());

  const today = GETselectedDate();
  PRINTnavLinks(today);
  PRINTcalender(today, GETselectedDate(), SELECTdate);
  EDITyearTitle(GETselectedYear());

  const createTodoBTN = document.querySelector('.btn_createTodo.submit');
  const cancelTodoBTN = document.querySelector('.btn_createTodo.cancel');
  const openFormOVERLAY = document.querySelector('.overlay_openForm');
  createTodoBTN.addEventListener('click', SUBMITnewTodo);
  cancelTodoBTN.addEventListener('click', (e) => { TOGGLEtodoForm(e.currentTarget.dataset.action); });
  openFormOVERLAY.addEventListener('click', (e) => { TOGGLEtodoForm(e.currentTarget.dataset.action); });

  const prevDayBTN = document.querySelector('.controlBtn[data-action="prev"]');
  const currentDayBTN = document.querySelector('.controlBtn[data-action="current"]');
  const selectedDayBTN = document.querySelector('.date_controlBox');
  const nextDayBTN = document.querySelector('.controlBtn[data-action="next"]');
  prevDayBTN.addEventListener('click', SELECTprevMonth);
  currentDayBTN.addEventListener('click', SELECTtoday);
  nextDayBTN.addEventListener('click', SELECTnextMonth);
  selectedDayBTN.addEventListener('click', () => {
    SELECTdate(GETselectedDate());
    PRINTcalender(GETselectedDate());
  });

  const colorOnClickBTNS = document.querySelectorAll('[data-click_effect="false"]');
  colorOnClickBTNS.forEach((btn) => btn.addEventListener('click', (e) => PLAYclickEffect(e.currentTarget)));
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') SELECTprevMonth();
    if (e.key === 'ArrowRight') SELECTnextMonth();
  });
}
