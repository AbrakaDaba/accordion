import {data} from "./faq.js"

let accordion = document.querySelector(".js-wrapper");
let answerWrapper;
let questions; 
 

function expandAnswer(el){ 
    let answerHeight = getAnswerHeight(this) + "px";  
    let answClasses = this.nextElementSibling.classList; 
    
    if(answClasses.contains("active")){
        el.target.classList.remove('active');
        answClasses.remove('active');
        this.nextElementSibling.style.height = 0;
    }else{
        answerWrapper.forEach((el) => {
            el.classList.remove("active");
            el.previousElementSibling.classList.remove("active");
            el.style.height = 0;
        });
        answClasses.add('active');
        el.target.classList.add('active');
        this.nextElementSibling.style.height = answerHeight;
    }
}

function getAnswerHeight(el){
    let answerHeight = el.nextElementSibling.querySelector('.js-a').offsetHeight;
    return answerHeight;
}

function createAccordion(){
    document.querySelector('.js-main-title').innerHTML = data.main_title;
    data.items.forEach((el)=>{
        let newItem = document.createElement("article")
        newItem.classList.add("accordion__item")
        let newItemContent = `
        <button class="accordion__q js-q">${el.title}</button>
        <div class="accordion__a-wrapper js-a-wrap">
            <p class="accordion__a js-a">${el.content}</p>
        </div>`
        newItem.innerHTML = newItemContent;
        accordion.appendChild(newItem)
        console.log(newItem);
    })
    questions = document.querySelectorAll(".js-q");
    answerWrapper = document.querySelectorAll(".js-a-wrap");
    questions.forEach((el) => {el.addEventListener("click", expandAnswer)});
}

createAccordion()
