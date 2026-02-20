// src/models/Coffee.js
module.exports = (sequelize, DataTypes) => {
    const Coffee = sequelize.define('Coffee', {
        name: DataTypes.STRING,
        price: DataTypes.INTEGER,
        type: DataTypes.STRING,
        description: DataTypes.STRING,
        status: DataTypes.STRING,
        thumbnail: DataTypes.STRING,   // เพิ่มบรรทัดนี้
        pictures: DataTypes.TEXT       // เพิ่มบรรทัดนี้
    })
    return Coffee
}