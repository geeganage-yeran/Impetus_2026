import AOS from 'aos';
import 'aos/dist/aos.css';

const initAOS = () => {
  AOS.init({
    disable: false,
    startEvent: 'DOMContentLoaded',
    initClassName: 'aos-init',
    animatedClassName: 'aos-animate',
    useClassNames: false,
    disableMutationObserver: false,
    debounceDelay: 50,
    throttleDelay: 99, 
    
   
    offset: 120,
    delay: 0,
    duration: 1300,
    easing: 'ease',
    once: false, 
    mirror: false,
    anchorPlacement: 'top-bottom',
  });
};

export default initAOS;