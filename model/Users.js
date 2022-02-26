const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class User extends Model{};

User.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false
          },
          email: {
            type: DataTypes.STRING,
            allowsNull: false,
            unique: true
          },

          //Min length of password is set to 4
          password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [4]
            }
        }
    },
    {
        hooks: {
        // set up beforeCreate lifecycle "hook" functionality
        beforeCreate: async (newUserData) => {
            //Encrypts the password
          newUserData.password = await bcrypt.hash(newUserData.password, 10);
          return newUserData;
        },

        // set up beforeUpdate lifecycle "hook" functionality
        beforeUpdate: async (updatedUserData) => {
          updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
          return updatedUserData;
        }
      },
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'User'
    }
)

module.exports = User;