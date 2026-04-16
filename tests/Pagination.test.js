import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Pagination from '../src/bulma/Pagination.vue';
import SimplePagination from '../src/bulma/SimplePagination.vue';

describe('Pagination', () => {
    it('renders default info from the provided length', () => {
        const wrapper = mount(Pagination, {
            props: {
                length: 26,
                page: 2,
                pageSize: 10,
            },
        });

        expect(wrapper.text()).toContain('From 11 to 20 of 26');
    });

    it('renders slot info with pagination props', () => {
        const wrapper = mount(Pagination, {
            props: {
                length: 26,
                page: 3,
                pageSize: 10,
            },
            slots: {
                info: ({ from, to, total }) => `Rows ${from}-${to} / ${total}`,
            },
        });

        expect(wrapper.text()).toContain('Rows 21-26 / 26');
    });

    it('emits page changes for valid targets', async () => {
        const wrapper = mount(Pagination, {
            props: {
                length: 26,
                page: 2,
                pageSize: 10,
            },
        });

        await wrapper.find('.pagination-next').trigger('click');

        expect(wrapper.emitted('page-changed')).toEqual([[3]]);
    });

    it('does not render controls when there are no items', () => {
        const wrapper = mount(Pagination, {
            props: {
                length: 0,
                page: 1,
                pageSize: 10,
            },
        });

        expect(wrapper.find('.pagination-controls').exists()).toBe(false);
    });
});

describe('SimplePagination', () => {
    it('renders default info from the provided length', () => {
        const wrapper = mount(SimplePagination, {
            props: {
                length: 26,
                page: 2,
                pageSize: 10,
            },
        });

        expect(wrapper.text()).toContain('From 11 to 20 of 26 entries');
    });

    it('renders slot info with pagination props', () => {
        const wrapper = mount(SimplePagination, {
            props: {
                length: 26,
                page: 3,
                pageSize: 10,
            },
            slots: {
                info: ({ from, to, total }) => `Rows ${from}-${to} / ${total}`,
            },
        });

        expect(wrapper.text()).toContain('Rows 21-26 / 26');
    });

    it('emits page changes for valid targets', async () => {
        const wrapper = mount(SimplePagination, {
            props: {
                length: 26,
                page: 2,
                pageSize: 10,
            },
        });

        await wrapper.find('.pagination-next').trigger('click');

        expect(wrapper.emitted('page-changed')).toEqual([[3]]);
    });

    it('renders ellipsis info when total length is unknown', () => {
        const wrapper = mount(SimplePagination, {
            props: {
                length: null,
                page: 2,
                pageSize: 10,
            },
        });

        expect(wrapper.text()).toContain('From 11 to ... of ... entries');
    });

    it('keeps next enabled when total length is unknown', async () => {
        const wrapper = mount(SimplePagination, {
            props: {
                length: null,
                page: 2,
                pageSize: 10,
            },
        });

        await wrapper.find('.pagination-next').trigger('click');

        expect(wrapper.emitted('page-changed')).toEqual([[3]]);
    });

    it('does not render controls when there are no items', () => {
        const wrapper = mount(SimplePagination, {
            props: {
                length: 0,
                page: 1,
                pageSize: 10,
            },
        });

        expect(wrapper.find('.simple-pagination-controls').exists()).toBe(false);
    });
});
