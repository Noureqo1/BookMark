const { sequelize, Content } = require('./models/content');
sequelize.sync()
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.log('Error syncing database:', err));
