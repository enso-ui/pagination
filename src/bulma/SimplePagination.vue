<template>
    <nav v-if="hasResults"
        class="simple-pagination-wrapper pagination"
        role="navigation"
        aria-label="pagination">
        <slot name="info"
            :from="from"
            :page="page"
            :page-size="pageSize"
            :to="displayTo"
            :total="displayTotal"
            :total-pages="totalPages">
            <p class="pagination-info">
                {{ i18n('From') }} {{ from }} {{ i18n('to') }} {{ displayTo }} {{ i18n('of') }} {{ displayTotal }} {{ i18n('entries') }}
            </p>
        </slot>
        <div v-if="showControls"
            class="pagination-controls">
            <a class="pagination-previous"
                :disabled="page === 1 || loading || null"
                @click="jumpTo(page - 1)">
                {{ i18n('Previous') }}
            </a>
            <a class="pagination-next"
                :disabled="nextDisabled || null"
                @click="jumpTo(page + 1)">
                {{ i18n('Next') }}
            </a>
        </div>
    </nav>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    i18n: {
        type: Function,
        default: value => value,
    },
    length: {
        type: [Number, null],
        default: null,
    },
    loading: {
        type: Boolean,
        default: false,
    },
    page: {
        type: Number,
        required: true,
    },
    pageSize: {
        type: Number,
        required: true,
    },
});

const emit = defineEmits(['page-changed']);

const totalPages = computed(() => (props.length === null
    ? null
    : Math.max(Math.ceil(props.length / props.pageSize), 1)));
const hasResults = computed(() => props.length === null || props.length > 0);
const from = computed(() => ((props.page - 1) * props.pageSize) + 1);
const to = computed(() => props.page * props.pageSize);
const displayTo = computed(() => (props.length === null
    ? '...'
    : Math.min(to.value, props.length)));
const displayTotal = computed(() => props.length ?? '...');
const showControls = computed(() => props.length === null || totalPages.value > 1);
const nextDisabled = computed(() => props.loading || (props.length !== null && props.page === totalPages.value) || null);

const jumpTo = page => {
    if (page < 1 || page === props.page) {
        return;
    }

    if (props.length !== null && page > totalPages.value) {
        return;
    }

    if (props.loading) {
        return;
    }

    if (props.length === null || page <= totalPages.value) {
        emit('page-changed', page);
    }
};
</script>

<style lang="scss">
.simple-pagination-wrapper {
    display: flex;
    align-items: center;
    gap: 1rem;

    .simple-pagination-info {
        margin-inline-end: auto;
        color: var(--bulma-text-weak);
    }

    .pagination-controls {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 0.5rem;
    }
}
</style>
