import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './app-body.html';

Template.Calls_call.onCreated(function () {
  this.getCallId = () => FlowRouter.getParam('_id');

  this.autorun(() => {
    this.subscribe('calls', this.getCallId());
  });
});

Template.Calls_call.helpers({
  // We use #each on an array of one item so that the "call" template is
  // removed and a new copy is added when changing calls, which is
  // important for animation purposes.
  callIdArray() {
    const instance = Template.instance();
    const callId = instance.getCallId();
    return Calls.findOne(callId) ? [callId] : [];
  },

  callArgs(callId) {
    const instance = Template.instance();
    return {
      callsReady: instance.subscriptionsReady(),

      // We pass `call` (which contains the full call, with all fields, as a function
      // because we want to control reactivity. When you check a todo item, the
      // `call.incompleteCount` changes. If we didn't do this the entire call would
      // re-render whenever you checked an item. By isolating the reactiviy on the call
      // to the area that cares about it, we stop it from happening.
      call() {
        return Calls.findOne(callId);
      },
    };
  },
});
