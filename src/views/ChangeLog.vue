<template>
    <div class="flex justify-center">
        <div class="text-color w-full px-4 md:px-0 md:w-1/2">
            <div v-for="(log, index) in logs"
                 :key="index">
                <div class="font-semibold text-lg mb-2 flex gap-4"
                     aria-level="1">
                    <div>{{ log.date }}</div>
                    <div class="border-l border-secondary" />
                    <badge color="#38bdf8">
                        {{ log.version }}
                    </badge>
                </div>
                <ul class="ml-2">
                    <li v-for="(line, lineIndex) in log.content"
                        :key="lineIndex"
                        aria-level="2"
                        class="flex gap-2 mb-2">
                        <badge :color="line.type === 'add' ? '#00bc7d' : '#fbbf24'">
                            <font-awesome-icon :icon="`fa-solid fa-${line.type}`" />
                        </badge>
                        {{ line.text }}
                    </li>
                </ul>
                <hr class="border-secondary mb-8">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ChangeLog',
    data () {
        return {
            logs: [
                {
                    version: 'v1.0.1',
                    date: '27/07/2025',
                    content: [
                        { type: 'add', text: 'Navigation au clavier' },
                        { type: 'add', text: 'Formulaire de rapport de bug' },
                        { type: 'add', text: 'Ajout de notification de validation lorsque des actions effectués sont validées' },
                    ]
                },
                {
                    version: 'v1.0.2',
                    date: '28/07/2025',
                    content: [
                        { type: 'wrench', text: 'Ajout d\'un message dans la page de conversation, lorsqu\'aucune conversation n\'existe' },
                        { type: 'wrench', text: 'Mise en place d\'un onglet de recherche dans les relations' },
                        { type: 'wrench', text: 'Les informations utilisateurs sont maintenant rafraichi correctement lors de leurs modifications' },
                        { type: 'wrench', text: 'Correction de l\'affichage lors de l\'envoi du premier message dans une conversation' },
                        { type: 'wrench', text: 'Lors de la première connexion, l\'envoi de post ne marchais pas' },
                    ]
                },
            ]
        };
    },
};
</script>
