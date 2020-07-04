'use strict'

require('dotenv').config()
require('source-map-support').install()
require('ts-node').register()

exports.sourceNodes = require('./config/sourceNodes').sourceNodes
exports.createSchemaCustomization = require('./config/createSchemaCustomization').createSchemaCustomization
exports.createPages = require('./config/createPages').createPages
