const { Schema, model } = require('mongoose');

module.exports.RootFolder = model('RootFolder', Schema({
    folderName: {
        type: String,
    },
    folderPath: {
        type: String,
        required: true,
    },
}, { timestamps: true }));