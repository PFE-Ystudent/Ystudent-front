import ConversationsSection from '@/components/conversation/ConversationsSection.vue';
import MessagesSection from '@/components/conversation/MessagesSection.vue';
import ConversationView from '@/views/conversation/ConversationView.vue';
import { shallowMount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';

describe('ConversationView.vue', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(ConversationView, {
            global: {
                stubs: {
                    ConversationsSection: true,
                    MessagesSection: true
                }
            }
        });
    });

    it('render ConversationsSection and MessagesSection', () => {
        expect(wrapper.findComponent(ConversationsSection).exists()).toBe(true);
        expect(wrapper.findComponent(MessagesSection).exists()).toBe(false);
    });

    it('show MessagesSection when conversation is selected', async () => {
        const mockConversation = { id: 1, name: 'Test' };

        wrapper.vm.selectConversation(mockConversation);
        await wrapper.vm.$nextTick();

        expect(wrapper.vm.selectedConversation).toEqual(mockConversation);

        const fullWrapper = shallowMount(ConversationView, {
            data () {
                return {
                    selectedConversation: mockConversation,
                    gtLg: true,
                    showConversation: false
                };
            },
            global: {
                stubs: {
                    ConversationsSection: true,
                    MessagesSection: true
                }
            }
        });

        expect(fullWrapper.findComponent(MessagesSection).exists()).toBe(true);
    });

    it('toggleSection switch', async () => {
        wrapper.vm.gtLg = false;
        wrapper.vm.showConversation = false;

        wrapper.vm.toggleSection();
        expect(wrapper.vm.showConversation).toBe(true);
    });

    it('toggleSection props', () => {
        wrapper.vm.gtLg = true;
        wrapper.vm.showConversation = false;

        wrapper.vm.toggleSection();
        expect(wrapper.vm.showConversation).toBe(false);
    });
});
