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
  let dedline = '2021-03-17 00:00:00';

  function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)), // мс в 24ч
      hours = Math.floor((t / (1000 * 60 * 60) % 24)), // мс в ч
      minutes = Math.floor((t / 1000 / 60) % 60), //мс в м
      sec = Math.floor((t / 1000) % 60); //мс в с

    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'sec': sec
    };

  }

  function getZero(n) {
    if (n >= 0 && n < 10) {
      return `0${n}`;
    } else {
      return n;
    }
  }

  function setClock(sel, endtime) {
    let timer = document.querySelector(sel),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      sec = timer.querySelector('#seconds'),
      timerInterval = setInterval(updateClock, 1000);
    updateClock();

    function updateClock() {
      let t = getTimeRemaining(endtime);
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      sec.innerHTML = getZero(t.sec);

      if (t.total <= 0) {
        clearInterval(timerInterval);
        days.innerHTML = '0';
        hours.innerHTML = '0';
        minutes.innerHTML = '0';
        sec.innerHTML = '0';
      }
    }
  }

  setClock('.timer', dedline);

  //modal
  const modalBtns = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal'),
    modalCloseBtn = document.querySelector('[data-close]');

  function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimer);
  }

  modalBtns.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
  modalCloseBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  })

  let modalTimer = setTimeout(openModal, 10000);

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.
      documentElement.scrollHeight){
           openModal();
          window.removeEventListener('scroll', showModalByScroll);
      }
   
  }
  window.addEventListener('scroll', showModalByScroll);

});