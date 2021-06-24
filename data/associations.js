function applyAssociation(sequelize) {
    const { product, category } = sequelize.models;

    product.belongsTo(category);
    category.hasMany(product);
    
}

module.exports = { applyAssociation };