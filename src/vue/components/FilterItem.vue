<script>
export default {
    data: () => ({
        active: false,
        count: 0,
        inputs: []
    }),
    computed: {
        isActive() {
            return { active: this.active }
        },
        hasCount() {
            return { 'has-count': !!this.count }
        },
        countChecked() {
            return this.inputs.filter(i => i.checked).length
        }
    },
    methods: {
        open() {
            if (!this.active) {
                this.$el.style.minWidth = `${this.$el.offsetWidth}px`
            }
            this.active = !this.active
        },
        initInputs() {
            this.inputs = [...this.$el.querySelectorAll('input[type=checkbox]')]
        },
        setCount() {
            this.initInputs()
            this.count = this.countChecked
        },
        change() {
            this.setCount()
        }
    },
    mounted() {
        this.setCount()
        document.addEventListener('click', ({ target }) => {
            const el = target.closest(`.${this.$el.classList[0]}`)
            if ((this.active && !el) || this.$el !== el) {
                this.active = false
            }
        })
    }
}
</script>
