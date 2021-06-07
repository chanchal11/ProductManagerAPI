const { Sequelize } = require('sequelize');
const { applyAssociation } = require('./associations');

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: 'chanchal.sqlite',
	logQueryParameters: true,
	benchmark: true
});

const modelDefiners = [
	require('./models/product.model'),
    require('./models/category.model')
];

for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

applyAssociation(sequelize);

sequelize.sync();

module.exports = sequelize;