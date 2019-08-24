const Profile = require("../models/profileModel");

exports.find = function (query) {
    const result =  Profile.find({
      $or: [
        {
          "firstName": {
            $regex: '.*' + query + '.*',
            $options: 'gi'
          }
        }, {
          "lastName": {
            $regex: '.*' + query + '.*',
            $options: 'gi'
          }
        }
      ]
    })
  
    if(!result) {
      return {
        status: false,
        message: "Resutl not found for query"
      }
    }
  
    return {
      status: true,
      message: "Result found",
      data: result
    }
  }

  exports.update = function (data) {

  }