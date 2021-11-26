class Slider {
    constructor(slider) {
        this.ctx = slider;  
    }
    init() {
 
        this.attr = { 
            autoplay: this.ctx.getAttribute("data-autoplay") ? this.ctx.getAttribute("data-autoplay") : false,
            interval: this.ctx.getAttribute("data-interval") ? parseInt(this.ctx.getAttribute("data-interval")) : 4000,
            infinite: this.ctx.getAttribute("data-infinite") ? this.ctx.getAttribute("data-infinite") : false,
            animationType: this.ctx.getAttribute("data-animation-type") ? this.ctx.getAttribute("data-animation-type") : "slide"
        }

        this.selectors = {
            ctx: ".js-slider",
            sliderWrapp: ".js-slider__wrapper",
            slide: ".js-slider__item",
            title: ".js-slider__title",
            button: ".js-slider__btn",
            rightArrow: ".js-arrow-right",
            leftArrow: ".js-arrow-left",
            arrowDisabled: "slider__arrow--disabled"
        }
 
   
        this.leftArrowBtn = this.ctx.querySelector(this.selectors.leftArrow);
        this.rightArrowBtn = this.ctx.querySelector(this.selectors.rightArrow);
        this.slidesNum = this.ctx.querySelectorAll(this.selectors.slide).length;
        this.sliderWrapp = this.ctx.querySelector(this.selectors.sliderWrapp);
        this.currentWidth = this.getCurrentWidth();
        this.position = 1; //first slide in the viewport
        this.startPosition();
        this.checkPositionStatus();
        this.checkAnimationType();
        // this.checkAutoplay(); 
        this.checkInfiniteStatus();
        
        
        window.addEventListener('resize', this.handleWindowResize.bind(this))
    }
    startPosition(){
        this.slideToSlide(this.position)
    }
    handleWindowResize() {
        this.getCurrentWidth();
        this.slideToSlide(this.position);
    }
    checkAnimationType() {
        if(this.attr.animationType == "slide"){
            this.leftArrowBtn.onclick = this.slideLeft.bind(this);
            this.rightArrowBtn.onclick = this.slideRight.bind(this);
            this.checkAutoplay();  
        }else if(this.attr.animationType == "fade"){
            this.leftArrowBtn.onclick = this.fadeForward.bind(this);
            this.rightArrowBtn.onclick = this.fadeBack.bind(this);
            this.checkAutoplay();  
            this.fadingSlides();
         }else{
            
         }
    }
    checkInfiniteStatus() { 

    }
    checkPositionStatus(index = 1) { 
        if(index == this.slidesNum){
            index = this.slidesNum
            this.position = index;
            this.disableRightArrow();
            return index;
        }else if(index == 1){
            index = 1;
            this.position = index;
            this.disableLeftArrow();
            return index;
        }else{
            this.enableBothArrows();
            return index;
        } 
    }
    checkAutoplay() { 
        if (this.attr.autoplay == "true" && this.attr.animationType == "slide") {
            this.sliderInterval = setInterval(this.autoSlide.bind(this), this.attr.interval);
        }else if(this.attr.autoplay == "true" && this.attr.animationType == "fade"){
            this.sliderWrapp.classList.add("js-fade")
            this.fadeInterval = setInterval(this.autoFade.bind(this), this.attr.interval);
        }else{ 
            return;
        }
    }
    autoSlide() { 
        if (this.position !== this.slidesNum) {
            let index = this.checkPositionStatus(++this.position);
            this.slideToSlide(index); 
        } else {
            if (this.attr.infinite == "true"){ 
                this.position = 1; 
                this.slideToSlide(this.position); 
            } else { 
                clearInterval(this.sliderInterval);
            }             
        }
    }

    autoFade(){
        console.log("fade");
    }
    fadeForward(){

    }
    fadeBack(){

    }
    fadingSlides(){

    }
    disableRightArrow() {
        this.rightArrowBtn.classList.add(this.selectors.arrowDisabled) 
    }
    disableLeftArrow() {
        this.leftArrowBtn.classList.add(this.selectors.arrowDisabled) 
    }
    enableBothArrows() {
        this.rightArrowBtn.classList.remove(this.selectors.arrowDisabled); 
        this.leftArrowBtn.classList.remove(this.selectors.arrowDisabled); 
    }
    getCurrentWidth() {
        let currentWidth = this.ctx.querySelector(this.selectors.slide).offsetWidth;
        this.currentWidth = currentWidth;
    }
    slideLeft() {
        let index = this.checkPositionStatus(--this.position);
        this.slideToSlide(index);
        (this.attr.autoplay == "true") ? this.stopAutoPlay() : "";
    }
    slideRight() { 
        let index = this.checkPositionStatus(++this.position);
        this.slideToSlide(index);
        (this.attr.autoplay == "true") ? this.stopAutoPlay() : "";
         
    }
    slideToSlide(index) {
        this.getCurrentWidth();
        let route = this.currentWidth * (index - 1);
        if(this.attr.animationType == "fade"){
            this.sliderWrapp.style.transform = "translateX(-" + route + "px)";

        }else if(this.attr.animationType == "slide"){
            this.sliderWrapp.style.transform = "translateX(-" + route + "px)";
        }
    }
    stopAutoPlay(){
        clearInterval(this.sliderInterval);
        clearInterval(this.fadeInterval);
        this.attr.autoplay = "false";
    }
}

export { Slider }