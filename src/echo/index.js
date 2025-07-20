import Echo from 'laravel-echo';
import store from '@/store';

import Pusher from 'pusher-js';
window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_WS_HOST,
    wsPort: import.meta.env.VITE_WS_PORT,
    forceTLS: false,
    enabledTransports: ['ws'],
    authEndpoint: `http://${import.meta.env.VITE_API_HOST}/broadcasting/auth`,
    auth: {
        headers: {
            Authorization: `Bearer ${store.state.auth.token}`,
        },
    },
});

export default echo;