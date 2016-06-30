
var models = require('../../models');
var Brother = models.Brother;

module.exports = {
  print: function() {
    console.log(models.Brother); 
  },
  create: function(id, name, email) {
    Brother.findOrCreate({ 
      where: {id: id},
      defaults: {
        firstName: name.givenName,
        lastName: name.familyName,
        email: email[0].value
      }
    }).then(function(brother) {

    });
  }
}

