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
            new HTTP(urlAjax.location, { code: target.dataset.code }, () => {
                this.$refs['title'].textContent = target.textContent
            }).post()
        }
    }
}
</script>
