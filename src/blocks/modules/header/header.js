import ComponentBase from '%classes%/ComponentBase'

export default class Header extends ComponentBase {
    constructor(select = 'header') {
        super(select)
    }

    init() {
        this.onMenuOpen()
        this.onSearchMobile()
    }

    onMenuOpen() {
        const header = document.getElementById(this.selector)
        const headerMenuOpen = document.getElementById(
            `${this.selector}-menu-open`
        )

        if (!headerMenuOpen) return
        headerMenuOpen.addEventListener('click', () => {
            header.classList.toggle('menu-opened')
            document.querySelector('body').classList.toggle('o-hidden')
        })
    }

    onSearchMobile() {
        const headerSearchOpen = document.getElementById(
            `${this.selector}-search-open`
        )

        const headerSearchMobile = document.getElementById(
            `${this.selector}-search-mobile`
        )
        if (!headerSearchOpen && !headerSearchMobile) return
        headerSearchOpen.addEventListener('click', () => {
            headerSearchMobile.classList.add('active')
            document.querySelector('body').classList.add('o-hidden')
        })

        const headerSearchClose = document.getElementById(
            `${this.selector}-search-close`
        )
        if (!headerSearchClose && !headerSearchMobile) return
        headerSearchClose.addEventListener('click', () => {
            headerSearchMobile.classList.remove('active')
            document.querySelector('body').classList.remove('o-hidden')
        })
    }
}
