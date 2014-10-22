/* ---------------------------------------------------- +/

## Item ##

Code related to the location template

/+ ---------------------------------------------------- */

Template.location.created = function () {
  //
};

Template.location.helpers({

  myHelper: function () {
    //
  }

});

Template.location.rendered = function () {
  //
};

Template.location.events({

  'click .delete': function(e, instance){
    var location = this;
    e.preventDefault();
    Meteor.call('removeItem', location, function(error, result){
      alert('Item deleted.');
      Router.go('/locations');
    });
  }

});
