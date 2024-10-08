module.exports = (sequelize, DataTypes) => {
    const Agent = sequelize.define('Agent', {
        name: DataTypes.STRING,
        role: DataTypes.STRING,
        sex: DataTypes.STRING,
        details: DataTypes.STRING
    })
    return Agent
}