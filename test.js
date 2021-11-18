class Component{
    constructor(parent, data){
        this.data = data;
        this.parent = parent;
        this.fun = Component.editText(data, parent)
    }
    static editText(data, parent){
        let title = "this is" + data + parent;
        return title;
    }
    init(){
        console.log(this);
        this.ctx = this.createCtx();
        this.selectors = {
            button: "accordion__button"
        }
        const button = this.createComponent();
        document.querySelector(this.parent).append(button)
    }
    createCtx(){
        const ctx = document.createElement("section");
        ctx.classList.add("component");
        return ctx;
    }
    createComponent(){
        const button = document.createElement("button");
        button.classList.add(this.selectors.button);
        button.innerHTML = "TEST"
        button.addEventListener("click", this.handleClick.bind(this));
        return button;
    }
    handleClick(e){
        console.log(this.ctx);
        let clicked = e.target;
        console.dir(clicked);

    }

}

function createPage(){
    const Accordion1 = new Component(".main");
    Accordion1.init();
}

createPage();
