/*jshint esversion: 6 */
/* jslint node: true */
/* jshint browser: true */
//import {pz1} from './pizza';

window.addEventListener("DOMContentLoaded", () => {
 
  "use strict";

  const pz1 = [
    {
        id: 'pz1',
        name: 'Пицца "Квадро Формаджи"',
        price: '225',
        count: 1,
    },
    {
        id: 'pz2',
        name: 'Пицца "Карбонара"',
        price: '165',
        count: 1,
    },
    {
        id: 'pz3',
        name: 'Пицца "Филадельфия"',
        price: '181',
        count: 1,
    },
    {
        id: 'pz4',
        name: 'Пицца "Ди маре"',
        price: '187',
        count: 1,
    },
    {
        id: 'pz5',
        name: 'Пицца "Империя"',
        price: '169',
        count: 1,
    },
    {
        id: 'pz6',
        name: 'Пицца "Тропикана"',
        price: '209 UAN',
        count: 1,
    },
    {
        id: 'pz7',
        name: 'Пицца "Верона"',
        price: '197',
        count: 1,
    },
    {
        id: 'pz8',
        name: 'Пицца "Американа"',
        price: '209',
        count: 1,
    },
    //////////////////////////////
    {
        id: 'rol1',
        name: 'Ролл с курицей',
        price: '73',
        count: 1,
    },
    {
        id: 'rol2',
        name: 'Маки с крабом',
        price: '35',
        count: 1,
    },
    {
        id: 'rol3',
        name: 'Ролл 4 сыра',
        price: '75',
        count: 1,
    },
    {
        id: 'rol4',
        name: 'Ролл трио',
        price: '98',
        count: 1,
    },
    {
        id: 'rol5',
        name: 'Ролл Филадельфия',
        price: '98',
        count: 1,
    },
    {
        id: 'rol6',
        name: 'Ролл Джаз',
        price: '76',
        count: 1,
    },
    {
        id: 'rol7',
        name: 'Ролл Терияки',
        price: '59',
        count: 1,
    },
    {
        id: 'rol8',
        name: 'Ролл маки с креветкой',
        price: '68 UAN',
        count: 1,
    },
];



  //BURGER==============================================================

  
  const burger = document.querySelector('.burger');
  const menuAdaptive = document.querySelector('.menu-adaptive');


  burger.addEventListener('click', () => {
    menuAdaptive.classList.toggle('show');
  });

  // $('a').click(function(){
  //   $(this).toggleClass('active');
  //   return false;
  // });

  //=============================================================================
 
  //ТАБЫ ===============================================================

const tabsWrp = document.querySelector('.dishes__tabswrp');
const tabs = document.querySelectorAll('.dishes__tab');
const cardsWrp = document.querySelectorAll('.dishes__cardswrp');

function hideTabContent() {
  cardsWrp.forEach(item => {
    item.classList.add('dishes__hide');
    item.classList.remove('dishes__cardswrp_show');
  });

  tabs.forEach(item => {
    item.classList.remove('dishes__tab_active');
  });
}

function showTabContent(i = 0) {
  cardsWrp[i].classList.add('dishes__cardswrp_show', 'dishes__smooth');
  cardsWrp[i].classList.remove('dishes__hide');
  tabs[i].classList.add('dishes__tab_active');
}

hideTabContent();
showTabContent();

tabsWrp.addEventListener('click', (e) => {
  const target = e.target;
  if (target && target.classList.contains('dishes__tab')) {
    tabs.forEach((item, i) => {
      if (target == item) {
        hideTabContent();
        showTabContent(i);
      }
    });
  }
});

//КОРЗИНА===========================================================================

const basketOpenBlock = document.querySelector('.main__basket-wrp');
const basketButton = document.querySelectorAll('.dishes__basket');
const goodRepository = document.querySelector('.main__basket-repository');
const dishesCard = document.querySelectorAll('.dishes__card');
const parent = document.querySelector('.main__repository-wrp');
const dataAtribute = document.querySelectorAll('[data-name]');
const totalPrice = document.querySelector('.main__good-counter');
const totalSum = document.querySelector('.main__full-price');
const totalSum2 = document.querySelector('.main__price-basket span');





function createFullPrise(id,name, price, count) {
const card = `
  <div class="main__counter-pricewrp">
    <div class="main__dishes-price-wrp" id=${id}>
        <p class="main__name-dishes">${name}</p>
        <p class="main__price-dishes"> <span>Цена:</span> ${price} UAN</p>
    </div>
    <div class="main__counter-dishes">
        <span class="main__minus">-</span>
        <span class="main__count">${count}</span>
        <span class="main__plus">+</span>
        <img src="img/delete.svg" alt="delete" class="main__delete">
    </div>
  </div>

  `;
  parent.insertAdjacentHTML('afterBegin', card);
  
}

function deleteGood() {
  parent.addEventListener('click', (e) => {
    if(e.target.closest('.main__delete')) {
      e.target.closest('.main__counter-pricewrp').remove();
    }
  });
}
deleteGood();



let arr = [];




function fullSum() {
  const fullPrice = arr.reduce((sum, current) => {
    return sum + parseFloat(current.price);
   }, 0);
   totalSum.textContent = `Итого: ${fullPrice} ₴`;
   totalSum2.textContent = `= ${fullPrice} ₴`;

   parent.addEventListener('click', (e) => {
    if(e.target.closest('.main__delete')) {
      e.target.closest('.main__counter-pricewrp').remove();
      
    }
  });
}




function generateGood(i) {
    const good = arr.find(index => {
        return index === pz1[i];
  });
    if(good) {
      good.count += 1;
    } else {
        createFullPrise(pz1[i].id, pz1[i].name, pz1[i].price, pz1[i].count);
    } 
 
}



let counter = 1;


function addGoodToCart() {
  dishesCard.forEach((item, i) => {
    item.addEventListener('click', (e) => {
      const target = e.target;
        if(target.closest('.dishes__basket')) {
          generateGood(i);
          arr.push(pz1[i]);
          totalPrice.textContent = counter++;
          fullSum();
      }
    });
  });
} 
addGoodToCart();

basketOpenBlock.addEventListener('click', () => {
  goodRepository.classList.toggle('dishes__cardswrp_show');
});





// SLIDER========================================================

const swiper = new Swiper('.swiper-container', {
  slidesPerView: 5,
  spaceBetween: 30,

  breakpoints: {
    1200: {
      slidesPerView: 5,
    },
    945: {
      slidesPerView: 4,
    },
    750: {
      slidesPerView: 3,
    },
    450: {
      slidesPerView: 2,
    },
    310: {
      slidesPerView: 1,
    },
  },
  
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});

// ОПОВЕЩЕНИЕ О ДЕМО=======================================

const demoWrp = document.querySelector('.demo-wrp'),
      demoClose = document.querySelector('.demo-close');

    function openDemo() {
      demoWrp.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }

    setTimeout(openDemo, 1000);

    demoWrp.addEventListener('click', (e) => {
      if(e.target === demoWrp) {
        demoWrp.style.display = 'none';
        document.body.style.overflow = '';
      }
    });

    demoClose.addEventListener('click', () => {
      demoWrp.style.display = 'none';
      document.body.style.overflow = '';
    });

}); // Конец домконтент=================================================
