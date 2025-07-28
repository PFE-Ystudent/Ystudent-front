import axios from '@/axios';
import { useToast } from '@/plugins/useToast';

export default {
    computed: {
        actions () {
            const actions = [
                { value: 'show', label: 'Voir' },
            ];
            if (this.user.id === this.authUser.id) {
                actions.push({ value: 'edit', label: 'Modifier' });
            } else {
                if (!this.user.relationType) {
                    actions.push(
                        { value: 'add', label: 'Ajouter' },
                        { value: 'block', label: 'Bloquer' },
                    );
                }
                if (this.user.relationType === 1) {
                    actions.push({ value: 'uncontact', label: 'Retirer le contact' });
                } else {
                    actions.push({ value: 'report', label: 'Signaler' });
                }
                if (this.user.relationType === 4) {
                    actions.push({ value: 'unblock', label: 'Débloquer' });
                } else {
                    actions.push({ value: 'message', label: 'Message' });
                }
            }
            return actions;
        },
    },
    methods: {
        selectAction (action) {
            if (action === 'message') {
                axios.post('/api/conversations', { user_id: this.user.id }).then((res) => {
                    this.$router.push({ name: 'Conversation', params: { id: res.data.conversation.id } });
                });
            } else if (action === 'show') {
                this.$router.push({ name: 'UserDetails', params: { id: this.user.id } });
            } else if (action === 'edit') {
                this.$router.push({ name: 'Account' });
            } else if (action === 'add') {
                axios.post(`/api/users/${this.user.id}/relations/request`).then(() => {
                    const { sucessToast } = useToast();
                    sucessToast('Demande envoyée !');
                });
            } else if (action === 'unblock') {
                axios.post(`/api/users/${this.user.id}/relations/unblocked`).then(() => {
                    const { sucessToast } = useToast();
                    sucessToast('Utilisateur débloqué !');
                    this.$emit('update-relation', this.user.id);
                });
            }  else if (action === 'block') {
                axios.post(`/api/users/${this.user.id}/relations/blocked`).then(() => {
                    const { sucessToast } = useToast();
                    sucessToast('Utilisateur bloqué !');
                    this.$emit('update-relation', this.user.id);
                });
            } else if (action === 'uncontact') {
                axios.delete(`/api/users/${this.user.id}/relations/contact`).then(() => {
                    const { sucessToast } = useToast();
                    sucessToast('Utilisateur retiré !');
                    this.$emit('update-relation', this.user.id);
                });
            }
        }
    }
};