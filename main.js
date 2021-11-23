 

class AccordionFunction {
    
    init() {
        this.selectors = {
            ctx: ".js-wrapper",
            accordion_item: ".accordion__item",
            button: ".js-question",
            content_wrap: ".js-a-wrap",
            content: ".js-answer"
        }
       
        this.ctx = document.querySelector(this.selectors.ctx);
        console.log(this.ctx);
        this.questions = this.ctx.querySelectorAll(this.selectors.button);
        this.contentWrapper = this.ctx.querySelectorAll(this.selectors.content_wrap);
        

        this.activateButtons(); 
    }

    activateButtons(){
        console.log(this);
        this.questions.forEach((el) => {
            el.addEventListener("click", this.handleClick.bind(this)) //prosledili smo objekat
        });
    }
 

    handleClick(el) { 
        console.log(el);
        let button = el.target; //bolje button nego clicked / this.button
        let answerWrap = button.closest(this.selectors.accordion_item).querySelector(this.selectors.content_wrap);
        let answClasses = answerWrap.classList;

        if (answClasses.contains("active")) {
            this.deactivateEl(button, answerWrap, answClasses);
        } else {
            this.contentWrapper.forEach((el) => {
                this.deactivateAll(el);
            });
            this.activateEl(button, answerWrap, answClasses);
        }
    }
    deactivateEl(button, answerWrap, answClasses) {
        button.classList.remove('active');
        answClasses.remove('active');
        answerWrap.style.height = 0;
    }
    deactivateAll(el) {
        let currentBtn = el.closest(this.selectors.accordion_item).querySelector(this.selectors.button);
        currentBtn.classList.remove("active");
        el.classList.remove("active");
        el.style.height = 0;
    }
    activateEl(button, answerWrap, answClasses){
        let answerHeight = this.getAnswerHeight(button) + "px";
        answClasses.add('active');
        button.classList.add('active');
        answerWrap.style.height = answerHeight;
    }
    getAnswerHeight(el) {
        let answerHeight = el.closest(this.selectors.accordion_item);
        answerHeight = answerHeight.querySelector(this.selectors.content).offsetHeight;
        return answerHeight;
    }


}


function letsAccordion() {   
        const Accordion = new AccordionFunction(); 
        Accordion.init(); 
}
window.addEventListener('DOMContentLoaded', letsAccordion); 