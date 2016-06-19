import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class CallsCollection extends Mongo.Collection {

}

export const Calls = new CallsCollection('Calls');

Calls.schema = new SimpleSchema({
  timestamp: { type: Number },
  clientName: { type: String },
  endpointCalled: { type: String },
  result: { type: String, allowedValues: ['success', 'error'] },
});

Calls.attachSchema(Calls.schema);

Meteor.publish('calls', function () {
  return Calls.find({}, {
    fields: Calls.publicFields,
  });
});
