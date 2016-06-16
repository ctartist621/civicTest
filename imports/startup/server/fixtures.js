import { Meteor } from 'meteor/meteor';
import { Calls } from '../../api/calls/calls.js';
import async from 'async';
import url from 'url';
import moment from 'moment';
import Chance from 'chance';

const chance = new Chance();

const seedCalls = function (cb) {
  async.times(1000, function (n, next) {
    const call = {
      timestamp: moment(faker.date.past()).valueOf(),
      clientName: faker.internet.userName(),
      endpointCalled: url.parse(chance.url()).path,
      result:  chance.pickone(['success', 'error']),
    };
    Calls.insert(call);
    next();
  }, function (err, results) {

    if (err) {
      throw new Error(err);
    } else {
      return cb && cb(err, results);
    }
  });
};

const seedCallsAsync = Meteor.wrapAsync(seedCalls);

Meteor.startup(() => {
  if (Calls.find().count() === 0) {
    return seedCallsAsync();
  }
});
