
(function() {
    'use strict';

    module.exports = function(sequelize) {
        var SysAdmin = sequelize.define('SysAdmin',
            {}, {
                timestamps: false
            }
        );
        return SysAdmin;
    };
}());
