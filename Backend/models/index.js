const { sequelize: db } = require('../config/database');
const UserModel = require('./User');
const JobModel = require('./Job');
const PaymentModel = require('./Payment');
const FeedbackModel = require('./Feedback');
const MessageModel = require('./Message');
const LocationModel = require('./Location');

const User = UserModel(db);
const Job = JobModel(db);
const Payment = PaymentModel(db);
const Feedback = FeedbackModel(db);
const Message = MessageModel(db);
const Location = LocationModel(db);

const initModels = () => {
  User.hasMany(Job, { foreignKey: 'clientId', as: 'clientJobs' });
  User.hasMany(Job, { foreignKey: 'collectorId', as: 'collectorJobs' });
  Job.belongsTo(User, { foreignKey: 'clientId', as: 'client' });
  Job.belongsTo(User, { foreignKey: 'collectorId', as: 'collector' });

  User.hasMany(Feedback, { foreignKey: 'userId' });
  Feedback.belongsTo(User, { foreignKey: 'userId' });
  Job.hasMany(Feedback, { foreignKey: 'jobId' });
  Feedback.belongsTo(Job, { foreignKey: 'jobId' });

  User.hasMany(Payment, { foreignKey: 'userId' });
  Payment.belongsTo(User, { foreignKey: 'userId' });
  Job.hasMany(Payment, { foreignKey: 'jobId' });
  Payment.belongsTo(Job, { foreignKey: 'jobId' });

  User.hasMany(Message, { foreignKey: 'senderId', as: 'sentMessages' });
  User.hasMany(Message, { foreignKey: 'receiverId', as: 'receivedMessages' });
  Message.belongsTo(User, { foreignKey: 'senderId', as: 'sender' });
  Message.belongsTo(User, { foreignKey: 'receiverId', as: 'receiver' });

  User.hasMany(Location, { foreignKey: 'userId' });
  Location.belongsTo(User, { foreignKey: 'userId' });
  Job.hasMany(Location, { foreignKey: 'jobId' });
  Location.belongsTo(Job, { foreignKey: 'jobId' });
};

initModels();

module.exports = {
  db,
  User,
  Job,
  Payment,
  Feedback,
  Message,
  Location,
};
