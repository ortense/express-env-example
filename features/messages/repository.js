'use strict'

const { mongo } = require('../../commons/db')
const env = require('../../commons/env')

const dependencies = {
  db: mongo,
  collectionName: env.db.collenctions.message,
}

const factory = ({ db, collectionName }) => {
  const format = record => ({ id: record._id, text: record.text })

  return {
    create: data =>
      db.collection(collectionName)
        .insertOne({ text: data.text })
        .then(result => format(result.ops[0])),

    retrieve: () =>
      db.collection(collectionName)
        .find()
        .toArray()
        .then(records => records.map(format)),

    getById: id =>
      db.collection(collectionName)
        .findOne({ _id: mongo.ObjectID(id) })
        .then(format)
  }
}

exports.factory = factory
exports.repository = factory(dependencies)
