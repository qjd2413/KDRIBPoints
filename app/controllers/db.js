
var models = require('../../models');
var Brother = models.Brother;

module.exports = {
  sign_in: function(id, name, email) {
    Brother.findOrCreate({ 
      where: {id: id},
      defaults: {
        firstName: name.givenName,
        lastName: name.familyName,
        email: email[0].value
      }
    }).then(function() {});
  },
  findUser: function(id) {
    return Brother.findById(id);
  }
}
