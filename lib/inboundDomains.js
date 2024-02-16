'use strict'

const api = 'inbound-domains'

module.exports = (client) => ({
    /**
     * List an overview of all inbound domains in the account.
     *
     * @param {RequestCb} [callback]
     * @returns {Promise}
     */
    list (callback) {
      const options = {
        uri: api
      }
      return client.get(options, callback)
    },
    /**
     * Get an inbound domain by its domain name
     *
     * @param {string} domain
     * @param {RequestCb} [callback]
     * @returns {Promise}
     */
    get (domain, callback) {
      if (!domain || typeof domain !== 'string') {
        return client.reject(new Error('domain is required'), callback)
      }

      const options = {
        uri: `${api}/${domain}`
      }
      return client.get(options, callback)
    },
    /**
     * Create a new inbound domain
     *
     * @param {Object} createOpts
     * @param {RequestCb} [callback]
     * @returns {Promise}
     */
    create (createOpts, callback) {
      if (!createOpts || typeof createOpts !== 'object') {
        return client.reject(new Error('create options are required'), callback)
      }

      const options = {
        uri: api,
        json: createOpts
      }
      return client.post(options, callback)
    },
    /**
     * Delete an existing inbound domain
     *
     * @param {string} domain
     * @param {RequestCb} [callback]
     * @returns {Promise}
     */
    delete (domain, callback) {
      if (!domain || typeof domain !== 'string') {
        return client.reject(new Error('domain is required'), callback)
      }

      const options = {
        uri: `${api}/${domain}`
      }
      return client.delete(options, callback)
    }
  })
