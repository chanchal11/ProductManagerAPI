const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('product', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		name: {
			allowNull: false,
			type: DataTypes.STRING,
			unique: true,
			validate: {
				is: /[\s\w]{3,}/
			}
		},
		description: {
			allowNull: false,
			type: DataTypes.STRING,
			unique: false,
			validate: {
				is: /[\s\w]{3,}/
			}
		},
        price: {
			allowNull: false,
			type: DataTypes.NUMBER,
			unique: false,
			validate: {
				is: /[\s\w]{1,}/
			}
		},
        expiryDate: {
			allowNull: false,
			type: DataTypes.DATEONLY,
            validate: {
                isDate: true
            }
		}
	});
};