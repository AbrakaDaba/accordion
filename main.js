// import {data} from "./faq.js"

// let accordion = document.querySelector(".js-wrapper");
// let answerWrapper;
// let questions; 

function createNewAccordion(parentEl, accDataFile) {
    let myObj = new NewAccordion(parentEl, accDataFile);
    myObj.getData()
    console.log(myObj);
    //  myObj.createAccordion();
    // console.log(myObj.data);
}

// const newData = {
//     components:[
//         {
//             name: "accordion",
//             items:[
//                 {
//                     title: "title",
//                     content: "asd"
//                 }
//             ]
//         },
//         {
//             name: "slider"
//         }
//     ]
// }

class NewAccordion {
    constructor(parentEl, accDataFile) {
        this.parentEl = parentEl;
        this.accDataFile = accDataFile;
       
        this.createAccordion = function (data) {
            let ctx = document.createElement("section");
            ctx.classList.add("accordion");
            let answerWrapper;
            let questions; 
            // let accordion = document.querySelector(`.${this.parentEl}`);
            console.log(data);
            data.items.forEach((el) => {
                let newItem = document.createElement("article");
                newItem.classList.add("accordion__item");
                let newItemContent = `
                    <button class="accordion__q js-q">${el.title}</button>
                    <div class="accordion__a-wrapper js-a-wrap">
                        <p class="accordion__a js-a">${el.content}</p>
                    </div>`
                newItem.innerHTML = newItemContent;
                ctx.appendChild(newItem);
                document.querySelector(parentEl).appendChild(ctx);
            })
            questions = ctx.querySelectorAll(".js-q");
            answerWrapper = ctx.querySelectorAll(".js-a-wrap");
            questions.forEach((el) => {
                el.addEventListener("click", expandAnswer)
            });
        }


        // createHTML
        this.getData = function () {
            let newData = import(`${this.accDataFile}`)
                .then((module) => { 
                    this.createAccordion(module.data); 
                })
            return newData;
        }

        // this.data = this.getData();
        // this.createAccordion = function () {
        //     console.log(this.parentEl);
        // }
        console.log(this);
        console.log(this.data);
    }
}

// function createAccordion() {
//     document.querySelector('.js-main-title').innerHTML = data.main_title;
//     data.items.forEach((el) => {
//         let newItem = document.createElement("article");
//         newItem.classList.add("accordion__item");
//         let newItemContent = `
//             <button class="accordion__q js-q">${el.title}</button>
//             <div class="accordion__a-wrapper js-a-wrap">
//                 <p class="accordion__a js-a">${el.content}</p>
//             </div>`
//         newItem.innerHTML = newItemContent;
//         accordion.appendChild(newItem);
//     })
//     questions = document.querySelectorAll(".js-q");
//     answerWrapper = document.querySelectorAll(".js-a-wrap");
//     questions.forEach((el) => {
//         el.addEventListener("click", expandAnswer)
//     });
// }


// function expandAnswer(el){ 
//     let answerHeight = getAnswerHeight(this) + "px";  
//     let answClasses = this.nextElementSibling.classList; 

//     if(answClasses.contains("active")){
//         el.target.classList.remove('active');
//         answClasses.remove('active');
//         this.nextElementSibling.style.height = 0;
//     }else{
//         answerWrapper.forEach((el) => {
//             el.classList.remove("active");
//             el.previousElementSibling.classList.remove("active");
//             el.style.height = 0;
//         });
//         answClasses.add('active');
//         el.target.classList.add('active');
//         this.nextElementSibling.style.height = answerHeight;
//     }
// }


// function getAnswerHeight(el){
//     let answerHeight = el.nextElementSibling.querySelector('.js-a').offsetHeight;
//     return answerHeight;
// }


createNewAccordion(".main", "./faq.js");
createNewAccordion(".main", "./faq.js");
// createNewAccordion("accordion2", "./faq.js");
// printData("./faq.js");  
//  console.log(printData("./faq.js"));