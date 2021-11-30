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

 

 // https://abrakadaba.github.io/accordion/
 // https://github.com/AbrakaDaba/accordion