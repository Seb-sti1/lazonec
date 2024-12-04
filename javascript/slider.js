class Slider {

    constructor(elements, quantite, prevArrow, nextArrow, container, type) {
        this.elements = elements;
        this.quantite = quantite;
        this.type = type;
        
        this.pos = 0;
        
        this.prevArrow = prevArrow;
        this.nextArrow = nextArrow;
        
        this.idle = false;
        this.container = container;

        this.resetShows();
        this.actualizeArrow();
    }

    animationEnd(event) {
        if (event.target == this.container) {
            if (this.container.classList.contains("moveLeft" + this.type)) {
                this.container.classList.remove("moveLeft" + this.type);
                
                display(this.elements[(this.pos + this.quantite - 1)], true);
                this.elements[(this.pos + this.quantite - 1)].classList.add("appears");
                this.idle = false;
            } else if (this.container.classList.contains("moveRight" + this.type)) {
                this.container.classList.remove("moveRight" + this.type);

                display(this.elements[this.pos], true);
                this.elements[this.pos].classList.add("appears");
                this.idle = false;
            }
        }
        if (event.target.classList.contains("appears")) {
            event.target.classList.remove("appears");
        }
    }

    verify() {
        for (var i = 0; i < this.elements.length; i++) {
            if (!(this.elements[i].classList.length == 1//si ya aucune autre class que visible ou hide
                && (i >= this.pos && i < this.pos + this.quantite && this.elements[i].style.display == "")//si l'element doit et est montré
                && ((i < pos || i >= this.pos + this.quantite) && this.elements[i].style.display == "none"))) {//si l'element ne doit, et n'est pas montré
                    return false;
                }
        }
    }

    actualizeArrow() {
        if (this.elements.length > this.quantite) {
            if (this.pos > 0) {
                visibility(this.prevArrow, true);
            } else {
                visibility(this.prevArrow, false);
            }
            if (this.pos + this.quantite < this.elements.length) {
                visibility(this.nextArrow, true);
            } else {
                visibility(this.nextArrow, false);
            }
        } else {
            visibility(this.prevArrow, false);
            visibility(this.nextArrow, false);
        }
    }

    next() {
        if (this.idle == true) { return; }
        this.idle = true;
        
        this.pos += 1;
        
        this.actualizeArrow();
        
        var element = this.elements[(this.pos - 1)];
        var container = this.container;
        var type = this.type;
        element.classList.add("disappears");

        element.addEventListener("animationend", function() {
            element.classList.remove("disappears");
            display(element, false);
            
            
            container.classList.add("moveLeft" + type);
        }, {once: true});
    }

    prev() {
        if (this.idle == true) { return; }
        this.idle = true;
        
        this.pos -= 1;
        
        this.actualizeArrow();
        
        var element = this.elements[(this.pos + (this.quantite))];
        var container = this.container;
        var type = this.type;
        element.classList.add("disappears");
        
        element.addEventListener("animationend", function() {
            element.classList.remove("disappears");
            display(element, false);
            
            container.classList.add("moveRight" + type);
        }, {once: true});
    }

    resetShows() {
        if (!this.verify()) {
            if (this.pos + this.quantite > this.elements.length) {
                this.pos = this.elements.length - this.quantite;
            }
            
            for (var i = 0; i < this.elements.length; i++) {
                if (i >= this.pos && i < this.pos + this.quantite) {
                    display(this.elements[i], true);
                } else {
                    display(this.elements[i], false);
                }
            }
        }
    }

    changeQuantite (quantite) {
        if (quantite != this.quantite) {
            this.quantite = quantite;
            this.resetShows();
        }
        this.actualizeArrow();
    }
}
