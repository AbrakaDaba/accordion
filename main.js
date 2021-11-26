 import { Slider } from './slider.js'
 import { Accordion } from './accordion.js'

const components = {
    Slider, 
    Accordion
}

 function createComponents() {
     let dataComponents = [];
     document.querySelectorAll("[data-component]").forEach((el) => {
         dataComponents.push({
             ctx: el,
             attr: el.getAttribute("data-component")
         })
     })

     dataComponents.forEach((el) => { 
         if(components[el.attr] && typeof components[el.attr] == "function"){         
             const newComponent = new components[el.attr](el.ctx);
             newComponent.init();
            }else{
                console.warn(`There is no ${el.attr} component!`)
            }
     })
 }

 createComponents()


 // function createComponents(){
 //     let components = document.querySelectorAll("[data-component]");
 //     let dataComponentsArr = [];

 //     components.forEach(el => {
 //         if(el.getAttribute("data-component") == "Accordion"){
 //             const AccordionComponent = new Accordion(el);
 //             AccordionComponent.init();
 //         }
 //         if(el.getAttribute("data-component") == "Slider"){
 //             const SliderComponent = new Slider(el);
 //             SliderComponent.init();
 //         }
 //     })
 // }



 // https://github.com/AbrakaDaba/accordion/tree/html_ready
 // https://abrakadaba.github.io/accordion/