export default {
    methods: {
        formatFilterData: function (data, keyContainer = null) {
            let stringParameter = '';
			if (data === null) return stringParameter;
			for (const [key, value] of Object.entries(data)) {
				if (Array.isArray(value)) {
					stringParameter += value.map(e => `${keyContainer ? `${keyContainer}[${key}][]` : `${key}[]`}=${e}`).join('&');
				} else if (typeof value === 'object' && value !== null) {
					stringParameter += this.formatFilterData(value, keyContainer ? `${keyContainer}[${key}]` : key);
				} else {
					stringParameter += `${keyContainer ? `${keyContainer}[${key}]` : key}=${value !== null ? value : ''}`;
				}
				stringParameter += '&';
			}
			return stringParameter.slice(0, -1);
        }
    }
  };