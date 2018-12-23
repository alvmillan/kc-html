export class FormContact {
    constructor() {

        this.oFormContact =  document.querySelector('#contact-form')
        this.oInputName = document.querySelector('#nombre')
        this.oInputEmail = document.querySelector('#email')
        this.oInputPhone = document.querySelector('#phone')
        this.oTextMessage = document.querySelector('#message')
        this.oSelectSeleccion = document.querySelector('#selection')
        this.oOtherSelectionInput = document.querySelector('#otherSelection')

        this.oData = {
            name: '',
            email: '',
            phone: '',
            message: '',            
            seleccion: '',
            otherSelection: ''
        };

        this.oFormContact.addEventListener('submit', this.leerContact.bind(this));
        this.oSelectSeleccion.addEventListener('change', this.shouldOtherSelectionInputBeVisible.bind(this));
    }

    leerContact(oE) {
        oE.preventDefault();
        if (this.validar()) {
            this.guardarDatos()
        }
    }

    guardarDatos() {
        this.oData = {
            name:  this.oInputName.value,
            email: this.oInputEmail.value ,
            phone: this.oInputPhone.value,
            message: this.oTextMessage.value,
            seleccion: this.oSelectSeleccion.options[this.oSelectSeleccion.selectedIndex].value,
            otherSelection: this.oOtherSelectionInput.value
        }

        let msg = document.querySelector('#succ_post');
        msg.classList.remove('hidden');
        setTimeout(() => msg.classList.add('hidden'), 3000);
    }

    shouldOtherSelectionInputBeVisible(oE) {
        oE.preventDefault();
        if ( this.oSelectSeleccion.options[this.oSelectSeleccion.selectedIndex].value === 'other') {            
            this.oOtherSelectionInput.parentElement.classList.remove('form-toggle');
        } else {
            this.oOtherSelectionInput.parentElement.classList.add('form-toggle');
        }
    }

    validar() {
        if (this.validateTextArea()) {
            document.querySelector('#err_message').classList.add('hidden');
            return true;
        } else {
            document.querySelector('#err_message').classList.remove('hidden');
        }
    }

    validateTextArea() {
        const maxWords = 150;
        let getNumberOfWords = this.oTextMessage.value.split(' ').length;
        if (getNumberOfWords > maxWords ) {
            return false;
        } else {
            return true;
        }
    }
}
