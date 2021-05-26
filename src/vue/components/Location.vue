<script>
import HTTP, { urlAjax } from '%common%/http'
import AppModal from '%vue%/components/AppModal'
import { mapActions } from 'vuex'
import { getCityCookie, setCookie } from '%common%/helper'

export default {
    components: { AppModal },
    data: () => ({
        active: false,
        showModal: false,
        selectedItem: null
    }),
    methods: {
        ...mapActions('cart', { update: 'update' }),
        open() {
            this.active = !this.active
        },
        onItem({ target }) {
            const cityCookie = getCityCookie()
            const targetCode = target.dataset.code
            const codeItem =
                cityCookie === targetCode
                    ? targetCode
                    : cityCookie || targetCode
            const isDelivery = !!target.dataset.delivery
            const title = this.$refs['title']
            if (title.dataset.code === codeItem) {
                this.active = false
                return
            }
            const text = target.textContent
            if (!isDelivery) {
                this.showModal = true
                this.selectedItem = {
                    codeItem,
                    text
                }
                return
            }

            this.onSubmit(codeItem, text)
        },
        onSubmit(codeItem, text) {
            const title = this.$refs['title']
            return new HTTP(urlAjax.location, { code: codeItem }, data => {
                title.textContent = text
                title.dataset.code = codeItem
                this.active = false
                this.showModal = false
                setCookie('BVK_CITY', data.id)
                setCookie('BVK_CITY_CODE', codeItem)
                window.location.reload()
            }).post()
        },
        closeModal() {
            this.showModal = !this.showModal
            this.active = !this.active
        },
        onChangeLocation() {
            const item = this.selectedItem
            this.onSubmit(item.codeItem, item.text).then(() => {
                this.update()
            })
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
