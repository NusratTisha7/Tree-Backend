const { Schema, model } = require('mongoose');

module.exports.SubFolder = model('SubFolder', Schema({
    folderName: {
        type: String,
        required: true,
    },
    rootFolder: {
        type: Schema.Types.ObjectId,
        ref: 'RootFolder'
    },
    parentFolder: {
        type: Schema.Types.ObjectId,
        ref: 'RootFolder'
    },
    folderPath: {
        type: String,
        required: true,
    },
    layer:{
        type:Number
    },
    seen:{
        type:Boolean,
        default:false
    }
}, { timestamps: true }));