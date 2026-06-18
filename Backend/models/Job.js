const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Job = sequelize.define('Job', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    clientId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    collectorId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    wasteType: {
      type: DataTypes.ENUM('paper', 'plastic', 'organic', 'electronic', 'mixed'),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'accepted', 'in_progress', 'completed', 'cancelled'),
      defaultValue: 'pending',
    },
    description: {
      type: DataTypes.TEXT,
    },
    pickupLocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.FLOAT,
    },
    longitude: {
      type: DataTypes.FLOAT,
    },
    scheduledDate: {
      type: DataTypes.DATE,
    },
    completedDate: {
      type: DataTypes.DATE,
    },
  }, {
    timestamps: true,
  });

  return Job;
};
