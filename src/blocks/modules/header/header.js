import ComponentBase from '%classes%/ComponentBase'

export default class Header extends ComponentBase {
    constructor(select = 'header') {
        super(select)
    }

    init() {
        const header = document.getElementById(this.selector)
        const headerMenuOpen = document.getElementById(
            `${this.selector}-menu-open`
        )

        headerMenuOpen.addEventListener('click', () => {
            header.classList.toggle('menu-opened')
            document.querySelector('body').classList.toggle('o-hidden')
        })
    }
}
