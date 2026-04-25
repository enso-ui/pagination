<template>
    <nav v-if="length > 0"
        class="pagination-wrapper pagination"
        role="navigation"
        aria-label="pagination">
        <slot name="info"
            :from="from"
            :page="page"
            :page-size="pageSize"
            :to="to"
            :total="length"
            :total-pages="pages">
            <p class="pagination-info">
                {{ i18n('From') }} {{ from }} {{ i18n('to') }} {{ to }} {{ i18n('of') }} {{ length }} {{ i18n('entries') }}
            </p>
        </slot>
        <div v-if="pages > 1"
            class="pagination-controls">
            <a class="pagination-previous"
                :disabled="page === 1 || loading || null"
                @click="jumpTo(page - 1)">
                {{ i18n('Previous') }}
            </a>
            <ul class="pagination-list">
                <li>
                    <a class="pagination-link"
                        :class="{ 'is-current': page === 1 }"
                        :disabled="loading || null"
                        @click="jumpTo(1)">
                        1
                    </a>
                </li>
                <li v-if="pages > 5 && !atStart">
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
                <li v-if="pages > 5 && !atEnd">
                    <span class="pagination-ellipsis">
                        &hellip;
                    </span>
                </li>
                <li v-if="pages > 1">
                    <a class="pagination-link"
                        :class="{ 'is-current': page === pages }"
                        :disabled="loading || null"
                        @click="jumpTo(pages)">
                        {{ pages }}
                    </a>
                </li>
            </ul>
            <a class="pagination-next"
                :disabled="page === pages || loading || null"
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

const pages = computed(() => Math.max(
    Math.ceil(props.length / props.pageSize),
    1,
));
const from = computed(() => (props.length === 0 ? 0 : ((props.page - 1) * props.pageSize) + 1));
const to = computed(() => Math.min(props.page * props.pageSize, props.length));

const atStart = computed(() => props.page <= 3);
const atEnd = computed(() => props.page >= pages.value - 2);

const middlePages = computed(() => {
    if (pages.value <= 2) {
        return [];
    }

    if (pages.value <= 5) {
        return Array.from({ length: pages.value - 2 }, (_, index) => index + 2);
    }

    if (props.page <= 3) {
        return [2, 3, 4];
    }

    if (props.page >= pages.value - 2) {
        return [
            pages.value - 3,
            pages.value - 2,
            pages.value - 1,
        ];
    }

    return [
        props.page - 1,
        props.page,
        props.page + 1,
    ];
});

const jumpTo = page => {
    if (page >= 1 && page <= pages.value && page !== props.page) {
        emit('page-changed', page);
    }
};
</script>

<style lang="scss">
.pagination-wrapper {
    display: flex;
    align-items: center;
    gap: 1rem;

    .pagination-info {
        margin-inline-end: auto;
        color: var(--bulma-text-weak);
    }

    .pagination-controls {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 0.5rem;

        .pagination-list {
            flex-grow: 0;
        }
    }
    
}


</style>
