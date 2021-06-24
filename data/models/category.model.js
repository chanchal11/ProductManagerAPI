const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('category', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
        name: {
			allowNull: true,
			type: DataTypes.STRING,
			validate: {
				is: /[\s\w]{3,}/
			}
		},
        image: {
			allowNull: false,
			type: DataTypes.STRING
		}
	});
};