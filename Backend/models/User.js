const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM('client', 'collector', 'admin'),
      defaultValue: 'client',
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    language: {
      type: DataTypes.ENUM('en', 'lg', 'sw'),
      defaultValue: 'en',
    },
  }, {
    timestamps: true,
  });

  User.beforeCreate(async (user) => {
    const bcrypt = require('bcryptjs');
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
  });

  User.prototype.comparePassword = function(password) {
    const bcrypt = require('bcryptjs');
    return bcrypt.compareSync(password, this.password);
  };

  return User;
};
