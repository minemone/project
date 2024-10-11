module.exports = (sequelize, DataTypes) => {
    const Skill = sequelize.define('skill', {
        name: DataTypes.STRING,
        abilities: DataTypes.STRING,
        name1: DataTypes.STRING,
        pictures1: DataTypes.TEXT,
        details1: DataTypes.STRING,
        name2: DataTypes.STRING,
        pictures2: DataTypes.TEXT,
        details2: DataTypes.STRING,
        name3: DataTypes.STRING,
        pictures3: DataTypes.TEXT,
        detail3: DataTypes.STRING,
        name4: DataTypes.STRING,
        details4: DataTypes.STRING,
        pictures4: DataTypes.TEXT,
        thumbnail: DataTypes.STRING, 
    })
    return Skill
}