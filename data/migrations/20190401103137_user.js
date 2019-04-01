
exports.up = function(knex, Promise) {
    return knex.schema.createTable('user', function(user) {
        user.increments();
    
        user.string('username', 128).notNullable();
        user.string('password', 128).notNullable();
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('user');
};
