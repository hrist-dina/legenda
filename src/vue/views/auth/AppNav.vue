<template lang="pug">
    .auth
        .container
            .auth__nav
                router-link(:to="{name:'register'}" active-class="active").auth__nav-item
                    span.auth__nav-text Регистрация
                router-link(:to="{name:'login'}" active-class="active" ).auth__nav-item
                    span.auth__nav-text Войти с паролем
            .auth__body
                router-view
</template>

<script>
export default {}
</script>
