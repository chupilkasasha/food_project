document.addEventListener('DOMContentLoaded', () => {
  //tabs
  let tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');

  function hideTabContent() {
    tabsContent.forEach(item => {
      item.style.display = 'none';
    });

    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].style.display = 'block';
    tabs[i].classList.add('tabheader__item_active');
  }
  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', (e) => {
    let target = e.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      })
    }
  })

//timer
let dedline = '2021-03-14';
function getTimeRemaining(endtime){
  let t = Date.parse(endtime) - Date.parse(new Date()), 
  days = Math.floor(t/(1000 * 60 * 60 * 24)), // мс в 24ч
  hours = Math.floor((t/(1000 * 60 * 60) % 24)), // мс в ч
  minutes = Math.floor((t/ 1000/ 60) % 60), //мс в м
  sec = Math.floor((t / 1000) % 60); //мс в с

  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'sec': sec
  };

}
function getZero(n){
  if(n >= 0 && n < 10){
    return `0${n}`;
  }else{
    return n;
  }
}
function setClock(sel, endtime){
  let timer = document.querySelector(sel),
  days = timer.querySelector('#days'),
  hours = timer.querySelector('#hours'),
  minutes = timer.querySelector('#minutes'),
  sec = timer.querySelector('#seconds'),
  timerInterval = setInterval(updateClock, 1000);
  updateClock();

  function updateClock(){
    let t = getTimeRemaining(endtime);
    days.innerHTML = getZero(t.days);
    hours.innerHTML = getZero(t.hours);
    minutes.innerHTML = getZero(t.minutes);
    sec.innerHTML = getZero(t.sec);

    if(t.total <= 0 ){
      clearInterval(timerInterval);
    }
  }
}

setClock('.timer', dedline);



});