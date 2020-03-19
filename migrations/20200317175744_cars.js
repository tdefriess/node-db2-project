
exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
      tbl.increments();
      tbl.string('vin', 31).notNullable().unique();
      tbl.string('make', 31).notNullable();
      tbl.string('model', 31).notNullable();
      tbl.float('milage').notNullable();
      tbl.string('transmission', 31);
      tbl.string('status', 31);
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars');
};
