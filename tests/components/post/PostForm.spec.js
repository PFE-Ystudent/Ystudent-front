import { flushPromises, mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from '@/axios';
import PostForm from '@/components/post/forms/PostForm.vue';
import CardForm from '@/components/container/CardForm.vue';
import SubmitButton from '@/components/partials/input/SubmitButton.vue';
import { nextTick } from 'vue';
import SurveyForm from '@/components/post/integrations/forms/SurveyForm.vue';
import TextInput from '@/components/partials/input/TextInput.vue';
import CancelButton from '@/components/partials/input/CancelButton.vue';

vi.mock('@/store', () => ({
    default: {
        state: {
            auth: {
                user: {
                    username: 'TestUser',
                    avatar: 'avatar.png',
                    role: { name: 'Membre' }
                }
            }
        }
    }
}));

vi.mock('@/axios', () => ({
    default: {
        post: vi.fn()
    }
}));

describe('PostForm.vue', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('send post success', async () => {
        const mockPostResponse = { data: { id: 42, title: 'Nouveau post' } };
        axios.post.mockResolvedValueOnce(mockPostResponse);
        axios.post.mockResolvedValueOnce({});

        const wrapper = mount(PostForm, {
            props: {
                categories: [{ id: 1, name: 'Catégorie A' }]
            }
        });

        const input = await wrapper.findComponent(CardForm).findComponent(SubmitButton);
        input.vm.$emit('click');

        await nextTick();
        expect(wrapper.text()).toContain('Envoyer le post');

        wrapper.vm.newPost.title = 'Titre test';
        wrapper.vm.newPost.content = 'Contenu test';
        wrapper.vm.newPost.categories = [{ id: 1, name: 'Catégorie A' }];

        input.vm.$emit('click');
        await flushPromises();

        expect(axios.post).toHaveBeenCalledWith('/api/posts', {
            title: 'Titre test',
            content: 'Contenu test',
            categories: [1],
            integrations: []
        });

        expect(wrapper.emitted('new-post')).toBeTruthy();
        expect(wrapper.vm.showPostForm).toBe(false);
    });

    it('send post fail', async () => {
        axios.post.mockRejectedValueOnce({
            response: {
                data: {
                    errors: {
                        title: ['Le titre est requis'],
                        content: ['Le contenu est requis']
                    }
                }
            }
        });

        const wrapper = mount(PostForm, {
            props: { categories: [] }
        });

        const input = await wrapper.findComponent(CardForm).findComponent(SubmitButton);
        input.vm.$emit('click');

        wrapper.vm.newPost.title = '';
        wrapper.vm.newPost.content = '';

        input.vm.$emit('click');
        await flushPromises();

        expect(wrapper.vm.errors).toEqual({
            title: ['Le titre est requis'],
            content: ['Le contenu est requis']
        });
    });

    it('add survey', async () => {
        const mockPostResponse = { data: { id: 123, title: 'Post sondage' } };
        axios.post.mockResolvedValueOnce(mockPostResponse);
        axios.post.mockResolvedValueOnce({});

        const wrapper = mount(PostForm, {
            props: {
                categories: [{ id: 3, name: 'Catégorie C' }]
            }
        });

        await wrapper.findComponent(CardForm).findComponent(SubmitButton).vm.$emit('click');
        await nextTick();

        // Remplir les champs du post
        wrapper.vm.newPost.title = 'Post sondage';
        wrapper.vm.newPost.content = 'Contenu avec sondage.';
        wrapper.vm.newPost.categories = [{ id: 3, name: 'Catégorie C' }];
        await nextTick();

        const addSurveyBtn = wrapper.findComponent(CardForm).find('button[data-testid="add-survey"]');
        addSurveyBtn.trigger('click');
        await nextTick();

        const surveyFormCompo = wrapper.findComponent(CardForm).findComponent(SurveyForm);
        expect(surveyFormCompo.exists()).toBe(true);

        let inputs = surveyFormCompo.findAllComponents(TextInput);
        inputs[0].vm.$emit('update:modelValue', 'Quel est votre langage préféré ?');

        inputs[1].vm.$emit('update:modelValue', 'JavaScript');

        await surveyFormCompo.findComponent(SubmitButton).vm.$emit('click');
        await nextTick();
        inputs = surveyFormCompo.findAllComponents(TextInput);

        inputs[2].vm.$emit('update:modelValue', 'Python');
        await surveyFormCompo.findComponent(SubmitButton).vm.$emit('click');
        await nextTick();

        inputs = surveyFormCompo.findAllComponents(TextInput);

        inputs[3].vm.$emit('update:modelValue', 'C#');
        await surveyFormCompo.findComponent(SubmitButton).vm.$emit('click');
        await nextTick();

        const cancelButton = surveyFormCompo.findAllComponents(CancelButton);
        cancelButton[cancelButton.length - 1].vm.$emit('click');
        await nextTick();

        await wrapper.vm.sendPost();
        await flushPromises();

        expect(axios.post).toHaveBeenCalledWith('/api/posts', {
            title: 'Post sondage',
            content: 'Contenu avec sondage.',
            categories: [3],
            integrations: [{
                type: 'survey',
                data: {
                    question: 'Quel est votre langage préféré ?',
                    options: ['JavaScript', 'Python']
                }
            }]
        });

        expect(wrapper.emitted('new-post')).toBeTruthy();
    });
});
