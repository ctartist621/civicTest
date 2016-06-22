import { Mongo } from 'meteor/mongo';

export let Calls = new Mongo.Collection('calls');;

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('calls', function callsPublication(limit) {
    return Calls.find({}, { limit: limit, sort: { timestamp: -1 } });
  });

  Calls.allow({
    insert: function (userId, doc, fields, modifier) {
      return true;
    },
  });
}
