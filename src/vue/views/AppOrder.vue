<template lang="pug">
    router-view
</template>

<script>
import UiKit from '%components%/ui-kit/ui-kit'

export default {
    updated() {
        new UiKit()
    }
}
</script>
