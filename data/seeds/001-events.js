
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('events').truncate()
      .then(function() {
      // Inserts seed entries
        return knex('events').insert([
          {
            id: 1,
            title: 'Zoom conference',
            description: 'A conference call for business owners',
            start_date: '09/28/21',
            end_date: '09/30/21'},
        ]);
      });
};
