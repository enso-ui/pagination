<template>
    <div class="pagination-controls mt-4"
        v-if="length > 0">
        <slot name="info"
            :from="from"
            :page="page"
            :page-size="pageSize"
            :to="to"
            :total="length"
            :total-pages="totalPages">
            <p class="pagination-info">
                {{ i18n('From') }} {{ from }} {{ i18n('to') }} {{ to }} {{ i18n('of') }} {{ length }}
            </p>
        </slot>
        <nav class="pagination is-small"
            role="navigation"
            aria-label="pagination"
            v-if="totalPages > 1">
            <ul class="pagination-list">
                <li>
                    <a class="pagination-link"
                        :class="{ 'is-current': page === 1 }"
                        :disabled="loading || null"
                        @click="jumpTo(1)">
                        1
                    </a>
                </li>
                <li v-if="totalPages > 5 && !atStart">
                    <span class="pagination-ellipsis">
                        &hellip;
                    </span>
                </li>
                <li v-for="middlePage in middlePages"
                    :key="middlePage">
                    <a class="pagination-link"
                        :class="{ 'is-current': page === middlePage }"
                        :disabled="loading || null"
                        @click="jumpTo(middlePage)">
                        {{ middlePage }}
                    </a>
                </li>
                <li v-if="totalPages > 5 && !atEnd">
                    <span class="pagination-ellipsis">
                        &hellip;
                    </span>
                </li>
                <li v-if="totalPages > 1">
                    <a class="pagination-link"
                        :class="{ 'is-current': page === totalPages }"
                        :disabled="loading || null"
                        @click="jumpTo(totalPages)">
                        {{ totalPages }}
                    </a>
                </li>
            </ul>
            <a class="pagination-previous"
                :disabled="page === 1 || loading || null"
                @click="jumpTo(page - 1)">
                {{ i18n('Previous') }}
            </a>
            <a class="pagination-next"
                :disabled="page === totalPages || loading || null"
                @click="jumpTo(page + 1)">
                {{ i18n('Next') }}
            </a>
        </nav>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    i18n: {
        type: Function,
        default: value => value,
    },
    length: {
        type: Number,
        required: true,
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

const totalPages = computed(() => Math.max(
    Math.ceil(props.length / props.pageSize),
    1,
));
const from = computed(() => (props.length === 0 ? 0 : ((props.page - 1) * props.pageSize) + 1));
const to = computed(() => Math.min(props.page * props.pageSize, props.length));

const atStart = computed(() => props.page <= 3);
const atEnd = computed(() => props.page >= totalPages.value - 2);

const middlePages = computed(() => {
    if (totalPages.value <= 2) {
        return [];
    }

    if (totalPages.value <= 5) {
        return Array.from({ length: totalPages.value - 2 }, (_, index) => index + 2);
    }

    if (props.page <= 3) {
        return [2, 3, 4];
    }

    if (props.page >= totalPages.value - 2) {
        return [
            totalPages.value - 3,
            totalPages.value - 2,
            totalPages.value - 1,
        ];
    }

    return [
        props.page - 1,
        props.page,
        props.page + 1,
    ];
});

const jumpTo = page => {
    if (page >= 1 && page <= totalPages.value && page !== props.page) {
        emit('page-changed', page);
    }
};
</script>

<style scoped>
.pagination-controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
}

.pagination-controls :deep(.pagination) {
    margin-top: 0;
    justify-content: flex-end;
}

.pagination-info {
    color: var(--bulma-text-weak);
    font-size: var(--bulma-size-small);
}
</style>
