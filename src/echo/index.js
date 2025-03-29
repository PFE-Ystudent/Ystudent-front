import Echo from 'laravel-echo';
import store from '@/store';

import Pusher from 'pusher-js';
window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: 'reverb',
    key: 'o3bzov3fzsxoqsb83rtv',
    wsHost: 'localhost',
    wsPort: 8008,
    wssPort: 8008,
    forceTLS: false,
    enabledTransports: ['ws', 'wss'],
    authEndpoint: 'http://localhost:8000/broadcasting/auth',
    auth: {
        headers: {
            Authorization: `Bearer ${store.state.auth.token}`,
        },
    },
});

export default echo;