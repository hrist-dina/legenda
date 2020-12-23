<template lang="pug">
    include ../../../blocks/components/ui-kit/ui-kit
    include ../../../views/helpers/mixins
    .lk
        +container
            .lk-header
                .lk-header__top
                    h1.lk-title Личный кабинет
                    +button-link('Выйти', false, 'bordered-md')(
                        v-if="isAuth"
                        @click.prevent="onLogout"
                    )
                template(v-if="isLoaded")
                    lk-meta(
                        v-if="isAuth"
                        :bottle="person.bottle"
                        :bonus="person.bonus"
                        :balance="person.balance"
                    ).lk-header__meta
                    .lk-meta.lk-center-message(v-else)
                        | Доступно авторизованным пользователям, пожалуйста,
                        |
                        a(href="/auth").link зарегистрируйтесь
                        |
                        | или
                        |
                        a(href="/auth/#/login").link войдите
                template(v-else)
                    .lk-loading
                        loader
            .lk-body(v-if="isAuth && isLoaded")
                .lk-repeat
                    +link-icon('Повторить последний заказ', 'repeat')(
                        @click.prevent="onRepeat"
                    ).link--repeat
                .lk-nav.swiper-container.js-tabs-scroll
                    .lk-nav__list.swiper-wrapper
                        router-link(
                            v-for="tab in tabNav"
                            :key="tab.name"
                            :to="{name: tab.name}"
                            active-class="active"
                            :class="{active: isActive(tab)}"
                        ).swiper-slide.lk-nav__item {{ tab.title }}
                    +link-icon('Повторить последний заказ', 'repeat')(
                        @click.prevent="onRepeat"
                    ).link--repeat.lk-nav__repeat
                .lk-tabs
                    router-view
        app-modal(:show-modal="isEmptyEmail" :show-cross="false")
            template(#header)
                h4 Чтобы продолжить укажите электронную почту
            form(@submit.prevent="onSendEmail")
                .field
                    input-text(
                        :required="email.required"
                        :name="email.name"
                        :value="email.value"
                        @input="onInputEmail($event)"
                        @validate="onValidateEmail($event)"
                        :placeholder="email.placeholder"
                        :valid-type="email.validType"
                    )
                .error-message(v-if="!!errorMessage" v-html="errorMessage")
                +button('default')(
                    :disabled="false"
                    :class="{'is-loading': false}"
                ) Сохранить
        modal-select-type(:show-modal="isSelectType")
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
import LkMeta from '%vue%/views/lk/LkMeta'
import AppModal from '%vue%/components/AppModal'
import InputText from '%vue%/components/InputText'
import Loader from '%vue%/components/Loader'
import DeliveryTypeList from '%vue%/components/DeliveryTypeList'
import ModalSelectType from '%vue%/components/ModalSelectType'
import { LK_ORDER_REPEAT, LK_ORDERS } from '%vue%/router/constants'
import { toggleAdditionalProducts } from '%common%/helper'
import { showNotification } from '%vue%/store/common/helper'
import TabsScroll from '%classes%/TabsScroll'

export default {
    components: {
        AppModal,
        InputText,
        LkMeta,
        Loader,
        DeliveryTypeList,
        ModalSelectType
    },
    data: () => ({
        tabNav: null,
        baseRout: null,
        errorMessage: null,
        isLoaded: false,
        userType: null,
        email: {
            placeholder: 'Электронная почта',
            name: 'email',
            value: '',
            required: true,
            isValid: false,
            validType: 'email'
        }
    }),
    computed: {
        ...mapGetters('user', {
            person: 'getPerson',
            isAuth: 'isAuth',
            hasSelectType: 'hasSelectType',
            hasNeedEmail: 'hasNeedEmail',
            deliveryTypes: 'getDeliveryTypes'
        }),
        isActive: el => data => {
            // Нужно чтобы определять вложенные элементы
            return el.$route.path.includes(data.path)
        },
        isEmptyEmail() {
            return this.hasNeedEmail && this.isAuth
        },
        isSelectType() {
            return this.hasSelectType && !this.isEmptyEmail
        }
    },
    methods: {
        ...mapMutations('user', {
            setNeedEmail: 'setNeedEmail'
        }),
        ...mapActions('user', {
            logout: 'logout',
            getOrderLast: 'getOrderLast',
            editPersonalData: 'editPersonalData'
        }),
        onLogout() {
            this.isLoaded = true
            this.logout().then(response => {
                this.isLoaded = false
                if (response.status) {
                    window.location = '/'
                }
            })
        },
        toggleAdditional() {
            if (this.$route.name === LK_ORDERS) {
                toggleAdditionalProducts(false)
            } else {
                toggleAdditionalProducts()
            }
        },
        onRepeat() {
            this.getOrderLast().then(response => {
                const data = response.data
                if (response.status && data.order_id) {
                    this.$router.push({
                        name: LK_ORDER_REPEAT,
                        params: { number: data.order_id }
                    })
                } else {
                    showNotification(this.$store.commit)({
                        status: false,
                        error: 'Что-то пошло не так'
                    })
                }
            })
        },
        onSendEmail() {
            this.editPersonalData({
                email: this.email.value
            }).then(response => {
                if (response.status) {
                    this.setNeedEmail({
                        needEmail: false
                    })
                } else {
                    this.errorMessage = response.error
                }
            })
        },
        onInputEmail(data) {
            this.email.value = data.value

            if (this.errorMessage) {
                this.errorMessage = null
            }
        },
        onValidateEmail(data) {
            this.email.isValid = data.isValid
        }
    },
    created() {
        const baseRoute = this.$router.options.routes.filter(
            i => i.baseRoute
        )[0]

        if (baseRoute) {
            this.tabNav = baseRoute.children.map((i, n) => ({
                title: i.meta.tabTitle || `Таб №${n}`,
                name: i.meta.tabName || i.name,
                path: i.path
            }))
        } else {
            console.error('Not set routes for LK')
        }
        this.toggleAdditional()
    },
    watch: {
        $route() {
            this.toggleAdditional()
        }
    },
    mounted() {
        this.isLoaded = true
        new TabsScroll()
    }
}
</script>

<!-- style in bem components lk -->
