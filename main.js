import {
    data
} from './faq.js'

class Component {
    constructor(parentEl, data) {
        this.parentEl = parentEl;
        this.data = data;
    }
    init() {
        this.selectors = {
            ctx: [".accordion", ".js-wrapper"],
            accordion_item: ".accordion__item",
            button: ".js-q",
            content_wrap: ".js-a-wrap",
            content: ".js-a"
        }
        this.dynamicClasses = {
            ctx: ["accordion", "js-wrapper"],
            accordion_item: "accordion__item",
            button: "js-q",
            content_wrap: "js-a-wrap",
            content: "js-a"
        }
        // this.stateClasses = {
        //     buttonActive: "accordion__btn--active"
        // }
        this.ctx = this.createCtx();
        this.content = this.createContent();
        this.getElements = this.getElementsSetClicks();
    }
    createCtx() {
        let ctx = document.createElement("section");
        ctx.classList.add(...this.dynamicClasses.ctx);
        document.querySelector(this.parentEl).appendChild(ctx);
        return ctx;
    }
    createContent() {
        this.data.items.forEach((el) => {
            let newItem = document.createElement("article");
            newItem.classList.add(this.dynamicClasses.accordion_item);
            let newItemContent = `
                <button class="accordion__q js-q">${el.title}</button>
                <div class="accordion__a-wrapper js-a-wrap">
                    <p class="accordion__a js-a">${el.content}</p>
                </div>`
            newItem.innerHTML = newItemContent;
            this.ctx.appendChild(newItem);
        }) 
    }
    getElementsSetClicks() {
        this.question = this.ctx.querySelectorAll(this.selectors.button); 
        this.contentWrapper = this.ctx.querySelectorAll(this.selectors.content_wrap);
        this.question.forEach((el) => {
            el.addEventListener("click", this.handleClick.bind(this))
        });
    }
   
    handleClick(el) { 
        let clicked = el.target;//bolje button
        let answerWrap = clicked.closest(this.selectors.accordion_item).querySelector(this.selectors.content_wrap);
        let answClasses = answerWrap.classList;  
        
        if(answClasses.contains("active")){
            clicked.classList.remove('active');
            answClasses.remove('active'); 
            answerWrap.style.height = 0;
        }else{ 
            this.contentWrapper.forEach((el) => {
                let currentWrap = el.closest(this.selectors.accordion_item).querySelector(this.selectors.button);
                currentWrap.classList.remove("active");
                el.classList.remove("active");
                el.style.height = 0;
            });
            let answerHeight = this.getAnswerHeight(clicked) + "px";
            answClasses.add('active');
            clicked.classList.add('active');
            answerWrap.style.height = answerHeight;
        }
    }
    getAnswerHeight(el){  
        let answerHeight = el.closest(this.selectors.accordion_item);
        answerHeight = answerHeight.querySelector(this.selectors.content).offsetHeight;
        return answerHeight;
    }
    

}


function createComponent() {
    const Accordion = new Component('.main', data);
    Accordion.init();
}

createComponent();
createComponent();
createComponent();