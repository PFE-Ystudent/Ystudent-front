import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, vi, expect, beforeEach, beforeAll } from 'vitest';
import AccountView from '@/views/user/AccountView.vue';
import axios from '@/axios';
import { createStore } from 'vuex';

const fakeStore = createStore({
    state: {
        parameter: {
            theme: 'dark'
        }
    },
    commit: vi.fn(),
    mutations: {
        switchTheme: vi.fn()
    }
});

vi.mock('@/axios', () => ({
    default: {
        get: vi.fn(),
        post: vi.fn()
    }
}));

beforeAll(() => {
  // eslint-disable-next-line no-undef
  global.URL.createObjectURL = vi.fn(() => 'blob:mock-url');
});

describe('AccountView.vue', () => {
    const mockUser = {
        username: 'JeanDupont',
        email: 'jean@exemple.com',
        about: 'Développeur passionné',
        avatar: 'avatar.jpg'
    };

    beforeEach(() => {
        vi.clearAllMocks();
        axios.get.mockResolvedValue({ data: mockUser });
    });

    it('charge et affiche les informations utilisateur au montage', async () => {
        const wrapper = mount(AccountView, {
            global: {
                plugins: [fakeStore]
            }
        });

        await flushPromises();

        expect(axios.get).toHaveBeenCalledWith('/api/users/me');
        expect(wrapper.vm.user.username).toBe('JeanDupont');
        expect(wrapper.vm.previewAvatarUrl).toBe('avatar.jpg');
    });

    it('modifie le username via text-input et sauvegarde les données', async () => {
        const mockUser = {
            username: 'AncienNom',
            email: 'user@example.com',
            avatar: 'avatar.png',
            about: 'Bio'
        };

        axios.get.mockResolvedValueOnce({ data: mockUser });
        axios.post.mockResolvedValueOnce({ data: { ...mockUser, username: 'NouveauNom' } });

        const wrapper = mount(AccountView, {
            global: {
                plugins: [fakeStore],
                stubs: ['font-awesome-icon']
            }
        });

        await flushPromises();

        // Trouver le champ username et émettre une mise à jour
        const usernameInput = wrapper.findAllComponents({ name: 'text-input' })[0];
        usernameInput.vm.$emit('update:modelValue', 'NouveauNom');
        wrapper.vm.user.username = 'NouveauNom';

        // Cliquer sur le bouton "Enregistrer"
        const submitButton = wrapper.findComponent({ name: 'submit-button' });
        submitButton.vm.$emit('click');

        await flushPromises();

        // ✅ Assertion sur l’appel API
        expect(axios.post).toHaveBeenCalledWith(
            '/api/users/me',
            expect.any(FormData)
        );

        // ✅ Vérification du contenu de la requête envoyée
        const formCall = axios.post.mock.calls[0][1];
        expect(formCall.get('username')).toBe('NouveauNom');
        expect(formCall.get('about')).toBe('Bio');
        expect(formCall.get('avatar')).toBeNull();

        // ✅ Vérification de la mise à jour dans le composant
        expect(wrapper.vm.user.username).toBe('NouveauNom');
    });

    it('gère les erreurs de validation lors de la sauvegarde', async () => {
        axios.post.mockRejectedValueOnce({
            response: {
                data: {
                    errors: {
                        username: ['Nom invalide'],
                        about: ['Champ requis']
                    }
                }
            }
        });

        const wrapper = mount(AccountView, {
            global: {
                plugins: [fakeStore]
            }
        });

        await flushPromises();

        // Simule un clic sur "Enregistrer"
        const submitButton = wrapper.findComponent({ name: 'submit-button' });
        submitButton.vm.$emit('click');

        await flushPromises();

        expect(wrapper.vm.errors).toEqual({
            username: ['Nom invalide'],
            about: ['Champ requis']
        });
    });

    it('met à jour l’avatar en prévisualisation via upload-input', async () => {
        const fileMock = new File(['dummy content'], 'avatar.png', { type: 'image/png' });

        const wrapper = mount(AccountView, {
            global: {
                plugins: [fakeStore]
            }
        });

        await flushPromises();

        const upload = wrapper.findComponent({ name: 'upload-input' });
        await upload.vm.$emit('select-files', [fileMock]);

        expect(wrapper.vm.avatar).toBe(fileMock);
        expect(wrapper.vm.previewAvatarUrl).toContain('blob:');
    });
});
