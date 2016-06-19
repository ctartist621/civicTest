import { Mongo } from 'meteor/mongo';

export const Calls = new Mongo.Collection('calls');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('calls', function callsPublication() {
    return Calls.find();
  });
}
