module.exports = (sequelize, DataTypes) => {
    const Weapon = sequelize.define('Weapon', {
        name: DataTypes.STRING,
        thumbnail: DataTypes.STRING,
        pictures: DataTypes.TEXT,
        type: DataTypes.STRING,  
        details: DataTypes.STRING,
    })
    return Weapon
}