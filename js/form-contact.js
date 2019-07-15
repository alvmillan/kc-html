export class FormContact {
    constructor() {

        this.oFormContact =  document.querySelector('#contact')
        this.oInputName = document.querySelector('#name')
        this.oInputEmail = document.querySelector('#email')
        this.oInputPhone = document.querySelector('#phone')
        this.oTextMessage = document.querySelector('#message')
        this.oCheckCondiciones = document.querySelector('#condiciones')
        this.oInputOtros = document.querySelector('#selection-otro')
        this.oSelectSeleccion = document.querySelector('#selection')

        this.oData = {
            name: '',
            email: '',
            phone: '',
            message: '',
            condiciones: '',
            opciones: '',
            seleccion: ''
        }

        this.oFormContact.addEventListener('submit', this.leerContact.bind(this)) 
        this.oSelectSeleccion.addEventListener('change', this.watchSelect.bind(this))
        this.definirValidaciones()
    }

    leerContact(oE) {
        oE.preventDefault();
        this.guardarDatos()
    }

    guardarDatos() {
        this.oData = {
            name:  this.oInputName.value,
            email: this.oInputEmail.value,
            phone: this.oInputPhone.value,
            message: this.oTextMessage.value,
            seleccion: this.isOtrosSelected() ? this.oInputOtros.value :
                this.oSelectSeleccion.options[this.oSelectSeleccion.selectedIndex].value,
        }

        console.dir(this.oData)
    }

    isOtrosSelected() {
        return this.oSelectSeleccion.options[this.oSelectSeleccion.selectedIndex].value === "otros";
    }

    watchSelect() {
        if (this.isOtrosSelected()) {
            this.oInputOtros.parentElement.classList.remove('oculto')
            console.log( this.oInputOtros.parentElement)
        } else {
            this.oInputOtros.parentElement.classList.add('oculto')
        }
    }

    definirValidaciones() {
        this.validaNombre()
        this.oInputName.addEventListener('input', this.validaNombre.bind(this) )

        this.validaTexto()
        this.oTextMessage.addEventListener('input', this.validaTexto.bind(this) )

    }

    validaNombre() {
        let msg = ''
        this.oInputName.setCustomValidity(msg)
        if(!this.oInputName.checkValidity()){
            msg = 'Es necesario indicar el nombre'
        } 
        this.oInputName.setCustomValidity(msg)
        console.log(msg)
    }

    validaTexto() {
        let msg = ''
        this.oTextMessage.setCustomValidity(msg)
        console.log("Validando texto", this.oTextMessage.value )
        if (!this.oTextMessage.value) {
            msg = 'Es necesario incluir algún texto en el mensaje'
        } else if (this.oTextMessage.value.split(' ').length > 150) {
            msg = 'El texto no debe sobrepasar 50 palabras'
        } 
        this.oTextMessage.setCustomValidity(msg)
        console.log('Validando texto', msg)
        console.log(this.oTextMessage.value.length)
    }

}
