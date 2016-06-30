
var models = require('../../models');

module.exports = {
  print: function() {
    console.log(models.Brother); 
  },
  create: function(id, name, email) {
    models.Brother.findOrCreate(
        { 
          where: {
            id: id,
            firstName: name.givenName,
            lastName: name.familyName,
            email: email[0].value
          } 
        }
    ).then(function(document, err, model) {
      
    });
  }
}

