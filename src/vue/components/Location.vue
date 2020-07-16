<script>
import HTTP, { urlAjax } from '%common%/http'

export default {
    data() {
        return {
            active: false
        }
    },
    methods: {
        open() {
            this.active = !this.active
        },
        onItem({ target }) {
            const codeItem = target.dataset.code
            const title = this.$refs['title']
            if (title.dataset.code === codeItem) {
                this.active = false
                return
            }
            new HTTP(urlAjax.location, { code: codeItem }, () => {
                title.textContent = target.textContent
                title.dataset.code = codeItem
                this.active = false
            }).post()
        }
    },
    mounted() {
        document.addEventListener('click', ({ target }) => {
            const el = target.closest(`.${this.$el.classList[0]}`)
            if ((this.active && !el) || this.$el !== el) {
                this.active = false
            }
        })
    }
}
</script>
