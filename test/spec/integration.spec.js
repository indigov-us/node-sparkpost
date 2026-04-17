'use strict'

var chai = require('chai'),
  expect = chai.expect,
  SparkPost = require('../../lib/sparkpost')

describe('Integration Tests (Real API)', function () {
  var client

  // Skip these tests if no API key is provided
  var apiKey = process.env.SPARKPOST_API_KEY
  var testCondition = apiKey ? it : it.skip

  before(function () {
    if (apiKey) {
      client = new SparkPost(apiKey)
    }
  })

  testCondition('should make a real GET request to retrieve account information', function (done) {
    // this.timeout(10000) // Real API calls may take longer

    client.get({ uri: 'account' }, function (err, data) {
      expect(err).to.be.null
      expect(data).to.be.an('object')
      expect(data).to.have.property('results')

      // Account should have some basic properties
      if (data.results) {
        expect(data.results).to.have.property('company_name')
      }

      done()
    })
  })

  testCondition('should handle errors from real API gracefully', function (done) {
    this.timeout(10000)

    // Try to get a non-existent resource
    client.get({ uri: 'invalid-endpoint-12345' }, function (err, data) {
      expect(err).to.not.be.null
      expect(err.name).to.equal('SparkPostError')
      expect(err.statusCode).to.be.oneOf([404, 400])

      done()
    })
  })

  testCondition('should make a real GET request to retrieve sending domains', function (done) {
    this.timeout(10000)

    client.sendingDomains.get('test.com').then((err, data) => {
      expect(err).to.be.null
      expect(data).to.be.an('object')
      expect(data).to.have.property('results')
    })
    done()
  })

  testCondition('should make a real GET request to retrieve sending domains', function (done) {
    this.timeout(10000)

    client.sendingDomains.verify('test.com').then((err, data) => {
      expect(err).to.be.null
      expect(data).to.be.an('object')
      expect(data).to.have.property('results')
    })
    done()
  })

  testCondition('should make a real GET request with debug mode', function (done) {
    this.timeout(10000)

    client.get({ uri: 'account', debug: true }, function (err, data) {
      expect(err).to.be.null
      expect(data).to.be.an('object')
      expect(data).to.have.property('debug')
      expect(data.debug).to.have.property('request')
      expect(data.debug).to.have.property('statusCode')
      expect(data.debug).to.have.property('headers')
      expect(data.debug.request).to.have.property('method')
      expect(data.debug.request.method).to.equal('GET')

      done()
    })
  })

  // Info message when tests are skipped
  if (!apiKey) {
    it('⚠️  Integration tests skipped - Set SPARKPOST_API_KEY environment variable to run', function () {
      this.skip()
    })
  }
})
