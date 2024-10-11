// Skill.js
module.exports = (sequelize, DataTypes) => {
    const Skill = sequelize.define('Skill', {
        name: DataTypes.STRING,
        pictures: DataTypes.TEXT,
        thumbnail: DataTypes.TEXT, 
        skill1: DataTypes.STRING,
        details1: DataTypes.STRING,
        skill2: DataTypes.STRING,
        details2: DataTypes.STRING,
        skill3: DataTypes.STRING,
        details3: DataTypes.STRING,
        skill4: DataTypes.STRING,
        details4: DataTypes.STRING,
    })
    return Skill
}
