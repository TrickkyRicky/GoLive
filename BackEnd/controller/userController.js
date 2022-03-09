const User = require("../models/user.js");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");

exports.userByID = async (req, res, next, id) => {
    try {
        let user = await User.findById(id);

        if(!user) {
            return res.status('400').json({
                error: "User not found"
            })
        }

        //Attach to request
        req.user = user;
        next();

    } catch (err) {
        return res.status('400').json({
            error: "Could not retrieve user"
        })
    }
}

exports.update = async(req, res) => {
    let form = new formidable.IncomingForm();

    //include extentions of files
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
        if(err) {
            return res.status(400).json({
                error: "Photo could not be uploaded"
            })
        }

        let user = req.user;

        console.log(files.avatar)
        if(files.avatar) {
            user.avatar.data = fs.readFileSync(files.avatar.filepath);
            user.avatar.contentType = files.avatar.type;
        }

        try {
            res.json(user)
        } catch (e) {
            res.status('400').json({
                error: "Could not update user"
            })
        }
    });
}

exports.defaultAvatar = (req, res) => {
    return res.sendFile(path.resolve('BackEnd/assets/default-avatar.png'));
}