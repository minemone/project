module.exports = (sequelize, DataTypes) => {
    const Agent = sequelize.define('Agent', {
        name: DataTypes.STRING,
        thumbnail: DataTypes.STRING,
        pictures: DataTypes.TEXT,
        role: DataTypes.STRING,
        sex: DataTypes.STRING,     
        details: DataTypes.STRING,
    })
    return Agent
}