Template.header.helpers({
  messages: function () {
    return Messages.find();
  },
})

Template.header.events({
  'click .log-out': function () {
    Meteor.logout();
  }
})
