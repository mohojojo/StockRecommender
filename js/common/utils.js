const utils = {
    /**
     * Joins the names with spaces, ignores falsy values.
     * @param {string} names Arbitrary amout of names.
     * @returns {string} The joined names.
     */
    joinClassNames(...names) {
        return names.filter(name => name).join(' ');
    },

    /**
     * No-op function.
     * @returns {undefined}
     */
    noop() {
        // does nothing
    },

    /**
     * Returns true if any of the parameters is truthy.
     * @param {...boolean} values Any number of boolean values.
     * @returns {boolean} True if any of the parameters is truthy.
     */
    any(...values) {
        return values.some(val => val);
    },

    anyObject(obj) {
        for (var o in obj) {
            return true;
        }
        return false;
    },

    getQueryParams(obj) {
        let query = '?';

        for (var o in obj) {
            if (obj[o] || typeof (obj[o]) === 'boolean') {
                query += `${o}=${obj[o]}&`;
            }
        }

        return query;
    },

    stopPropagation(e) {
        e.preventDefault();
        e.stopPropagation();
    },

    validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
};

export default utils;
