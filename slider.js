// First we run checkPositionStatus(), then changeToSlide()

class Slider {
    constructor(slider) {
        this.ctx = slider;  
    }
    init() {
 
        this.params = {  
            autoplay: this.ctx.getAttribute("data-autoplay") ? this.ctx.getAttribute("data-autoplay") : false,
            interval: this.ctx.getAttribute("data-interval") ? parseInt(this.ctx.getAttribute("data-interval")) : 4000,
            infinite: this.ctx.getAttribute("data-infinite") ? this.ctx.getAttribute("data-infinite") : false,
            animationType: this.ctx.getAttribute("data-animation-type") ? this.ctx.getAttribute("data-animation-type") : "slide",
            bullets: this.ctx.getAttribute("data-bullets") ? this.ctx.getAttribute("data-bullets") : "false",
        }

        //selectors
        this.selectors = {
            ctx: ".js-slider",
            sliderWrapp: ".js-slider__wrapper",
            slide: ".js-slider__item",
            title: ".js-slider__title",
            button: ".js-slider__btn",
            rightArrow: ".js-arrow-right",
            leftArrow: ".js-arrow-left",
            bullets: ".slider__bullet"
        }

        // dynamic classes
        this.dynamicClasses = {
            bulletBox: "slider__bulletBox",
            bullet: "slider__bullet"
        }

        //  state classes
        this.stateClasses = {
            arrowDisabled: "slider__arrow--disabled",
            fade: "slider__wrapper--fade",
            currentBullet: "slider__bullet--active"
        }

        // variables(elements, width & position)
        this.leftArrowBtn = this.ctx.querySelector(this.selectors.leftArrow);
        this.rightArrowBtn = this.ctx.querySelector(this.selectors.rightArrow);
        this.slides = Array.from(this.ctx.querySelectorAll(this.selectors.slide));
        this.slidesNum = this.ctx.querySelectorAll(this.selectors.slide).length;
        this.sliderWrapp = this.ctx.querySelector(this.selectors.sliderWrapp);
        this.bullets;
        this.currentWidth = this.getCurrentWidth(); 
        this.position = 1; //first slide in the viewport

        // init slider      
        this.setAnimation();
        this.checkPositionStatus(); // handling buttons regarding position status
        this.startPosition();
        this.checkAutoplay();
        this.setBullets();  

        // event listeners
        window.addEventListener('resize', this.handleWindowResize.bind(this));
        this.ctx.onmouseenter = this.stopAutoPlay.bind(this);
        this.ctx.onmouseleave = this.checkAutoplay.bind(this);
        this.leftArrowBtn.onclick = this.slidePrev.bind(this);
        this.rightArrowBtn.onclick = this.slideNext.bind(this);
    }
    startPosition(){
        this.changeToSlide(this.position)
    }
    handleWindowResize() {
        this.getCurrentWidth();
        this.changeToSlide(this.position);
    }
    setAnimation() {
        if(this.params.animationType == "slide"){ 
            this.sliderWrapp.classList.remove(this.stateClasses.fade);
        }else if(this.params.animationType == "fade"){ 
            this.sliderWrapp.classList.add(this.stateClasses.fade);
            this.slides.forEach(element => { 
                element.classList.add("inactive")
            }); 
            let route = 0;
            this.sliderWrapp.style.transform = "translateX(-" + route + "px)";  
         }else{
            console.warn("this Animation type is unknown! Deafult Animation type is 'slide'")
            this.params.animationType == "slide";
         }
    }
    setBullets(){
        if (this.params.bullets == "true"){
            const bulletBox = document.createElement("div");
            bulletBox.classList.add(this.dynamicClasses.bulletBox);
            bulletBox.style.width = 30 * this.slidesNum + 'px';
            this.slides.forEach((el, index) => {
                const bullet = document.createElement("span");
                bullet.classList.add(this.dynamicClasses.bullet);
                bullet.addEventListener("click", this.chooseSlide.bind(this, index))
                bulletBox.append(bullet)
            })
            this.ctx.append(bulletBox);
            this.bullets = this.ctx.querySelectorAll(this.selectors.bullets)
        }
    }

    chooseSlide(index, el){ 
        this.position = index+1;
        this.changeToSlide(this.position);
        this.markBullet(el.target);
        
    }
    markBullet(el){
        this.bullets.forEach((element) => { 
            element.classList.remove(this.stateClasses.currentBullet)
        });
        el.classList.add(this.stateClasses.currentBullet)
    }
    checkInfiniteStatus() { 

    }
    checkPositionStatus(index = 1) {
        if(index == this.slidesNum){
            index = this.slidesNum
            this.position = index;
            if(this.params.infinite !== "true"){
                this.disableRightArrow();
            }
            return index;
        }else if(index == 1){
            index = 1;
            this.position = index;
            if(this.params.infinite !== "true"){
                this.disableLeftArrow();
            }
            return index;
        } else {
            this.enableBothArrows();
            return index;
        } 
    }

    checkAutoplay() { 
        (this.params.autoplay == "true") ? this.sliderInterval = setInterval(this.autoPlay.bind(this, this.params.animationType), this.params.interval): "";
        
    }
    autoPlay(type) { 
        let index;
        if (this.position !== this.slidesNum) {
            index = this.checkPositionStatus(++this.position); 
            this.changeToSlide(index);          
        } else {
            if (this.params.infinite == "true"){ 
                 this.setInfiniteSliding(index);
            } else { 
                this.stopAutoPlay();
            }             
        }
    }
    setInfiniteSliding(index){
        this.enableBothArrows();
        this.position = 1; 
        index = this.position;
        this.changeToSlide(index)
    }
 
    disableRightArrow() {
        this.rightArrowBtn.classList.add(this.stateClasses.arrowDisabled);
    }
    disableLeftArrow() {
        this.leftArrowBtn.classList.add(this.stateClasses.arrowDisabled);
    }
    enableBothArrows() {
        this.rightArrowBtn.classList.remove(this.stateClasses.arrowDisabled); 
        this.leftArrowBtn.classList.remove(this.stateClasses.arrowDisabled); 
    }
    getCurrentWidth() {
        let currentWidth = this.ctx.querySelector(this.selectors.slide).offsetWidth;
        return currentWidth;
    }
    slidePrev() {
        if (this.params.infinite == "true" && this.position == 1){ 
            this.position = this.slidesNum;
            let index = this.position; 
            this.changeToSlide(index)
        }else{
            let index = this.checkPositionStatus(--this.position);
            this.changeToSlide(index);
            (this.params.autoplay == "true") ? this.stopAutoPlay() : "";
        }
        this.markBullet(this.bullets[this.position-1]);
    }
    slideNext() {
        if (this.params.infinite == "true" && this.position == this.slidesNum){ 
            this.setInfiniteSliding()
        }else{
            let index = this.checkPositionStatus(++this.position);
            this.changeToSlide(index);
            (this.params.autoplay == "true") ? this.stopAutoPlay() : "";
        }
        this.markBullet(this.bullets[this.position-1]);
    }
    changeToSlide(index) { //changeToSLide, slide.., fade...
        if(this.params.animationType == "slide"){
            this.slideToSlide(index);
        }else if(this.params.animationType == "fade"){
           
            this.fadeToSlide(index-1);
        }
    }
    slideToSlide(index){
        let route = this.currentWidth * (index-1);
            this.sliderWrapp.style.transform = "translateX(-" + route + "px)";
    }
    fadeToSlide(index){ 
        this.slides.forEach(element => { 
            element.classList.add("inactive")
        });
        this.slides[index].classList.add("active");
        this.slides[index].classList.remove("inactive");
    }
    stopAutoPlay(){
        clearInterval(this.sliderInterval);
    }
}

export { Slider }