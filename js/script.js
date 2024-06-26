document.addEventListener('DOMContentLoaded', () => {
   'use strict';
   const swiper = new Swiper('.works__slider', {
      loop: true,
      simulateTouch: false,
      autoHeight: true,
      speed: 2000,
      autoplay: {
         delay: 3500,
         disableOnInteraction: false
      },
      effect: 'fade',
      fadeEffect: {
         crossFade: true
      },
   });
   const menuLinks = document.querySelectorAll('.link[data-goto]');
   if (menuLinks.length > 0) {
      menuLinks.forEach(menuLink => {
         menuLink.addEventListener('click', onMenuLinkClick);
      });

      function onMenuLinkClick(el) {
         const menuLink = el.target;
         if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY;

            window.scrollTo({//scroll function
               top: gotoBlockValue,
               behavior: 'smooth'
            });

            el.preventDefault();//turn off reference work
         }
      }
   }

   const animItems = document.querySelectorAll('._anim-items');

   if (animItems.length > 0) {
      window.addEventListener('scroll', animOnScroll);
      function animOnScroll() {
         for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
               animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }
            if ((scrollY > animItemOffset - animItemPoint) && scrollY < (animItemOffset + animItemHeight)) {
               animItem.classList.add('_active');
            } else {
               if (!animItem.classList.contains('_anim-no-hide')) {
                  animItem.classList.remove('_active');
               }
            }
         }
      }
      function offset(el) {
         const rect = el.getBoundingClientRect(),
            scrollLeft = window.scrollX || document.documentElement.scrollLeft,
            scrollTop = window.scrollY || document.documentElement.scrollTop;
         return {
            top: rect.top + scrollTop,
            left: rect.left + scrollLeft
         }
      }
      setTimeout(() => {
         animOnScroll();
      }, 300);
   }

   const mouseParallax = new MousePRLX();

});
class MousePRLX {
   constructor(props, data = null) {
      let defaultConfig = {
         init: true,
         logging: true,
      }
      this.config = Object.assign(defaultConfig, props);
      if (this.config.init) {
         const paralaxMouse = document.querySelectorAll('[data-prlx-mouse]');
         if (paralaxMouse.length) {
            this.paralaxMouseInit(paralaxMouse);
         } else {
         }
      }
   }
   paralaxMouseInit(paralaxMouse) {
      paralaxMouse.forEach(el => {
         const paralaxMouseWrapper = el.closest('[data-prlx-mouse-wrapper]');

         const paramСoefficientX = el.dataset.prlxCx ? +el.dataset.prlxCx : 100;
         const paramСoefficientY = el.dataset.prlxCy ? +el.dataset.prlxCy : 100;
         const directionX = el.hasAttribute('data-prlx-dxr') ? -1 : 1;
         const directionY = el.hasAttribute('data-prlx-dyr') ? -1 : 1;
         const paramAnimation = el.dataset.prlxA ? +el.dataset.prlxA : 50;


         let positionX = 0, positionY = 0;
         let coordXprocent = 0, coordYprocent = 0;

         setMouseParallaxStyle();

         if (paralaxMouseWrapper) {
            mouseMoveParalax(paralaxMouseWrapper);
         } else {
            mouseMoveParalax();
         }

         function setMouseParallaxStyle() {
            const distX = coordXprocent - positionX;
            const distY = coordYprocent - positionY;
            positionX = positionX + (distX * paramAnimation / 1000);
            positionY = positionY + (distY * paramAnimation / 1000);
            el.style.cssText = `transform: translate3D(${directionX * positionX / (paramСoefficientX / 10)}%,${directionY * positionY / (paramСoefficientY / 10)}%,0) rotate(0.02deg);`;
            requestAnimationFrame(setMouseParallaxStyle);
         }
         function mouseMoveParalax(wrapper = window) {
            wrapper.addEventListener("mousemove", function (e) {
               const offsetTop = el.getBoundingClientRect().top + window.scrollY;
               if (offsetTop >= window.scrollY || (offsetTop + el.offsetHeight) >= window.scrollY) {
                  const parallaxWidth = window.innerWidth;
                  const parallaxHeight = window.innerHeight;
                  const coordX = e.clientX - parallaxWidth / 2;
                  const coordY = e.clientY - parallaxHeight / 2;
                  coordXprocent = coordX / parallaxWidth * 100;
                  coordYprocent = coordY / parallaxHeight * 100;
               }
            });
         }
      });
   }
}

