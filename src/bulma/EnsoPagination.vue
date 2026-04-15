<template>
    <pagination v-bind="$attrs"
        :i18n="i18n"/>
</template>

<script setup>
import { inject } from 'vue';
import Pagination from './Pagination.vue';

defineOptions({
    inheritAttrs: false,
});

const i18n = inject('i18n', value => value);
</script>
