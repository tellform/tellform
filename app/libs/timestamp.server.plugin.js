'use strict';

// Plugin
module.exports = function timestamp (schema, options) {
  options || (options = {})

  // Options
  var fields = {}
    , createdPath = options.createdPath || 'created'
    , modifiedPath = options.modifiedPath || 'modified'
    , useVirtual = (options.useVirtual !== undefined) 
      ? options.useVirtual 
      : true

  // Add paths to schema if not present
  if (!schema.paths[createdPath]) {
    fields[modifiedPath] = { type: Date }
  }
  if (useVirtual) {
    // Use the ObjectID for extracting the created time
    schema.virtual(createdPath).get(function () {
      return new Date(this._id.generationTime * 1000)
    })
  } else {
    if (!schema.paths[createdPath]) {
      fields[createdPath] = { 
        type: Date
      , default: Date.now 
      }
    }
  }
  schema.add(fields)

  // Update the modified timestamp on save
  schema.pre('save', function (next) {
    this[modifiedPath] = new Date
    next()
  })
}