<template lang="pug">
    include ../../../blocks/components/ui-kit/ui-kit
    include ../../../views/helpers/mixins
    .lk-tab
        .lk-personal-data
            .lk-personal-data__block(v-if="!showEditForm")
                .lk-personal-data__box(v-if="!isEmptyData")
                    .lk-personal-data__list
                        .lk-personal-data__item(v-if="!!person.fio") {{ person.fio }}
                        .lk-personal-data__item(v-if="!!person.birthDate") {{ person.birthDate | dateSlash }}
                        .lk-personal-data__item(v-if="!!person.phone") {{ person.phone | phoneNumber }}
                        .lk-personal-data__item(v-if="!!person.email") {{ person.email }}
                    .lk-personal-data__edit
                        +link('Редактировать', false, 'bordered-md')(
                            @click.prevent="onEditPersonalData"
                        )
                .lk-personal-data__empty(v-else)
                    p Персональные данные не заполнены
                    .lk-personal-data__button
                        +link('Заполнить', false, 'bordered-md')(
                            @click.prevent="onEditPersonalData"
                        )

            .lk-personal-data__edit-block(v-else)
                personal-data-form(
                    :has-birth-date="true"
                    @submit="onSubmitForm"
                    @isValid="onValidForm"
                ).lk-personal-data__edit-form
                    template(#submit)
                        .error-message(v-if="!!errorMessage") {{ errorMessage }}
                        .lk-personal-data__button
                            +button('default')(
                                :disabled="!isValidForm || isSubmittingForm"
                                :class="{'is-loading': isSubmittingForm}"
                            ) Сохранить
                            +button-link('Отменить', false, 'bordered-md')(
                                @click.prevent="onEditPersonalData"
                            ).lk-personal-data__cancel
            app-modal(
                :showModal="showSuccessMessage"
                @close="showSuccessMessage = false"
            )
                template(#header)
                    h4 Сообщение
                template
                    p Спасибо. Ваши изменения приняты.
                    p Для уточнения данных с вами может связаться менеджер.
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import PersonalDataForm from '%vue%/components/PersonalDataForm'
import AppModal from '%vue%/components/AppModal'

export default {
    name: 'lk-personal-data',
    components: {
        PersonalDataForm,
        AppModal
    },
    data: () => ({
        showEditForm: false,
        isValidForm: false,
        isSubmittingForm: false,
        showSuccessMessage: false,
        errorMessage: ''
    }),
    computed: {
        ...mapGetters('user', {
            person: 'getPerson'
        }),
        isEmptyData() {
            return !Object.values(this.person).filter(i => i && !!i.length)
                .length
        }
    },
    methods: {
        ...mapActions('user', {
            handleEditForm: 'editPersonalData'
        }),
        onEditPersonalData() {
            this.showEditForm = !this.showEditForm
        },
        onValidForm(value) {
            this.isValidForm = value
        },
        onSubmitForm(value) {
            if (this.isValidForm) {
                this.isSubmittingForm = true
                this.handleEditForm(value)
                    .then(response => {
                        if (response) {
                            this.showEditForm = false
                            this.errorMessage = ''
                            this.showSuccessMessage = true
                        } else {
                            this.errorMessage = response.error
                        }
                        this.isSubmittingForm = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isSubmittingForm = false
                    })
            }
        }
    }
}
</script>

<!-- style in bem components lk -->
