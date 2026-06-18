const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Payment = sequelize.define('Payment', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    jobId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    platformFee: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    collectorAmount: {
      type: DataTypes.FLOAT,
    },
    method: {
      type: DataTypes.ENUM('mtn_momo', 'airtel_money', 'bank'),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'failed'),
      defaultValue: 'pending',
    },
    transactionId: {
      type: DataTypes.STRING,
    },
  }, {
    timestamps: true,
  });

  return Payment;
};
