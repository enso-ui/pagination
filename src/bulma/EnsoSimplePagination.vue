<template>
    <simple-pagination v-bind="$attrs"
        :i18n="i18n"/>
</template>

<script setup>
import { inject } from 'vue';
import SimplePagination from './SimplePagination.vue';

defineOptions({
    inheritAttrs: false,
});

const i18n = inject('i18n', value => value);
</script>
