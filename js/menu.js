export class Menu {
    constructor () {
        // navs
        this.oBotonMenu1 = document.querySelector('#menu-btn-1')
        this.oBotonMenu2 = document.querySelector('#menu-btn-2')
        this.oMenuTop =  document.querySelector('#menu-top')
        this.oMenuBottom = document.querySelector('#menu-bottom')
        // Otros
        this.aMenuItems = document.querySelectorAll("nav#menu-top a")
        this.aSections = document.querySelectorAll("section")
        this.aOffsets = []
        this.calcularOffsets()
        this.seccionActiva = 0
        // Manejadores de eventos
        this.oBotonMenu1.addEventListener('click', this.toggleMenu.bind(this))
        this.oBotonMenu2.addEventListener('click', this.toggleMenu.bind(this))
        this.aMenuItems.forEach(
            (item) => { item.addEventListener('click', this.navegar.bind(this))}
        )
        window.addEventListener('scroll', this.scrollDetect.bind(this))
    }

    toggleMenu(oE) {
        oE.preventDefault()
        // cambia su visibilidad
        oE.target.classList.toggle('hide')
        // cambia la visibilidad del otro icono
        if (oE.target.previousElementSibling) {
            oE.target.previousElementSibling.classList.toggle('hide')
        } else {
            oE.target.nextElementSibling.classList.toggle('hide')
        }
         // cambia la visibilidad del menu top para mobile
        this.oMenuTop.classList.toggle('hide')
    }


    activarItem(oE) {
        this.aMenuItems.forEach(
            (item) => { item.classList.remove('active')}
        )
        oE.target.classList.add('active')
    }


    changeMenuStyle () {
        let pageOffset = window.pageYOffset
        let menuItem = 0

        if (pageOffset >=  this.oOffsets['#home'] && pageOffset < this.oOffsets['#whoami']) {
            menuItem = 0
        } else if (pageOffset >= this.oOffsets['#whoami'] && pageOffset < this.oOffsets['#education']) {
             menuItem = 1
        } else if (pageOffset >= this.oOffsets['#education'] && pageOffset < this.oOffsets['#experience']) {
            menuItem = 2
        } else if (pageOffset >= this.oOffsets['#experience'] && pageOffset < this.oOffsets['#about']) {
            menuItem = 3
        } else if (pageOffset >= this.oOffsets['#about'] && pageOffset < this.oOffsets['#contact']) {
            menuItem = 4
        } else {
            menuItem = 5
        }
        this.aMenuItems.forEach(
            (item) => item.classList.remove('active')
        );
        this.aMenuItems[menuItem].classList.add('active');
    }

    navegar(oE) {
        console.log(oE)
        let i = oE.target.dataset.index
        console.log(i)
        oE.preventDefault()
        window.scroll({
            top: this.aOffsets[i], 
            left: 0, 
            behavior: 'smooth'
        })
    }

    scrollDetect (oE) {
        let position = oE.target.scrollingElement.scrollTop
        let index
        this.aOffsets.every(
            (offset, i) => { 
                if( position >= offset) {
                    index = i
                    return true}
                else { return false}
            })
        
        console.log(index)
        if (this.seccionActiva != index) {
            this.aMenuItems.forEach(
                (nodoMenu) => {nodoMenu.classList.remove('active')}
            )
            this.aMenuItems[index].classList.add('active')   
            this.seccionActiva = index
        }

   }

    prepararNavegacion() {
        this.aSections.forEach(
            (item) => {
                let cumulative =  this.cumulativeOffset(item);
                this.oOffsets['#'+item.id] = cumulative;
                // this.oOffsets['#'+item.id] = item.offsetTop
            }
        )
    
    }
    
    calcularOffsets() {
        this.aSections.forEach(
            (section) => {
                this.aOffsets.push(section.offsetTop-60)
            }
        )
        this.aOffsets[0] = 0
        console.log(this.aOffsets)
    }

    cumulativeOffset (element) {
        var top = 0;
        do {
            top += element.offsetTop || 0;
            element = element.offsetParent;
        } while(element);
        return top;
    };


}