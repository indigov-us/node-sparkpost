'use strict'

const api = 'events'

/*
 * "Class" declaration, Events API exposes one function:
 * - search: retrieves list of message events according to given params
 */
module.exports = (client) => ({
    /**
     * Search for events using given parameters
     *
     * @param {Object} parameters
     * @param {RequestCb} [callback]
     * @returns {Promise}
     */
    searchMessage (parameters, callback) {
      const options = {
        uri: `${api}/message`,
        qs: {}
      }

      Object.keys(parameters).forEach((paramname) => {
        if (Array.isArray(parameters[paramname])) {
          options.qs[paramname] = parameters[paramname].join(',')
        } else {
          options.qs[paramname] = parameters[paramname]
        }
      })
      return client.get(options, callback)
    }
  })
