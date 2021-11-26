class Slider {
    constructor(slider) {
        this.ctx = slider; 
        // this.infinite = data.infinite;
        // this.autoplay = data.autoplay;
        // this.interval = data.interval
        // this.animationType = data.animationType;
    }
    init() {

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
        this.slideToSlide(this.position);
        this.checkInfiniteStatus();
        this.checkAutoplay();
        this.checkAnimationType();
        this.checkPositionStatus();
        this.leftArrowBtn.onclick = this.slideLeft.bind(this);
        this.rightArrowBtn.onclick = this.slideRight.bind(this);
        window.addEventListener('resize', this.handleWindowResize.bind(this))
    }

    handleWindowResize() {
        this.getCurrentWidth();
        this.slideToSlide(this.position);
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
        if (this.autoplay == true) {
            this.sliderInterval = setInterval(this.autoPlay.bind(this), this.interval);
        }
    }
    autoPlay() {
        if (this.position !== this.ctx.querySelectorAll(this.selectors.slide).length) {
            this.slideRight();
            console.log("slidiiiing");
        } else {
            this.position = 0;
            this.slideRight();
            // clearInterval(this.sliderInterval);
            
            console.log("stopSliddiiiing");
        }
    }
    checkAnimationType() {

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
    }
    slideRight() { 
        let index = this.checkPositionStatus(++this.position);
        this.slideToSlide(index);
    }
    slideToSlide(index) {
        this.getCurrentWidth();
        let route = this.currentWidth * (index - 1);
        this.sliderWrapp.style.transform = "translateX(-" + route + "px)";
    }
}

export { Slider }