export default {
    methods: {
        formatTimestamp: function (createdAt) {
            const date = new Date(createdAt)
            const today = new Date()

            if (date.toLocaleString('fr', { dateStyle: 'short' }) == today.toLocaleString('fr', { dateStyle: 'short' })) {
                return `Aujourd'hui à ${date.toLocaleString('fr', { hour12: false, hour: "2-digit", minute: "2-digit" })}`
            } else if (date.toLocaleString('fr', { dateStyle: 'short' }) == new Date(today - 24 * 60 * 60 * 1000).toLocaleString('fr', { dateStyle: 'short' })) {
                return `Hier à ${date.toLocaleString('fr', { hour12: false, hour: "2-digit", minute: "2-digit" })}`
            } else {
                return date.toLocaleString('fr', { hour12: false, dateStyle: "short", timeStyle: "short" })
            }
        }
    }
  }