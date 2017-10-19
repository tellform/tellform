// Dependencies
var util = require('util')
  , assert = require('assert')
  , mongoose = require('mongoose')
  , timestamp = require('../../libs/timestamp.server.plugin')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId

// Run tests
describe('Timestamp', function () {
  describe('#default()', function () {
    var FooSchema = new Schema()
    FooSchema.plugin(timestamp)
    var FooModel = mongoose.model('timeFoo', FooSchema)
      , bar = new FooModel()
    
    before(function () {
      FooModel.remove(function (err) {
        assert.strictEqual(err, null)
      })
    })

    it('should have custom properties', function (done) {
      assert.strictEqual(typeof FooSchema.virtuals.created, 'object')
      assert.strictEqual(typeof FooSchema.paths.modified, 'object')
      done()
    })

    it('should create the default attributes', function (done) {
      bar.save(function (err, doc) {
        assert.strictEqual(err, null)
        assert.strictEqual(util.isDate(doc.created), true)
        assert.strictEqual(util.isDate(doc.modified), true)
        done()
      })
    })
  })

  describe('#custom()', function () {
    var FooSchema = new Schema()
    FooSchema.plugin(timestamp, {
      createdPath: 'oh'
    , modifiedPath: 'hai'
    , useVirtual: false
    })
    var BarModel = mongoose.model('timeBar', FooSchema)
      , bar = new BarModel()

    before(function () {
      BarModel.remove(function (err) {
        assert.strictEqual(err, null)
      })
    })

    it('should have custom properties', function (done) {
      assert.strictEqual(typeof FooSchema.paths.oh, 'object')
      assert.strictEqual(typeof FooSchema.paths.hai, 'object')
      done()
    })

    it('should create custom attributes', function (done) {
      bar.save(function (err, doc) {
        assert.strictEqual(err, null)
        assert.strictEqual(util.isDate(doc.oh), true)
        assert.strictEqual(util.isDate(doc.hai), true)
        done()
      })
    })
  })
})