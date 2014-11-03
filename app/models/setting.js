// app/models/setting.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SettingSchema = new Schema({
    uploadPath: { type: String, required: true },
    uploadTmpPath: { type: String, required: true },
    maxPostSize: { type: String, required: true },
    maxFileSize: { type: String, required: true }
});

module.exports = mongoose.model('Setting', SettingSchema);
