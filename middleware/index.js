var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {};

// middleware to check that the user who created the campground can update and delete it only
middlewareObj.checkCampOwner = function(req, res, next)
{
    if(req.isAuthenticated())
    {
        Campground.findById(req.params.id, function(err, campground){
            if(err)
            {
                req.flash("error", "Something went wrong");
                res.redirect("back");
            }
            else
            {
                // can't use === because campground.author.id is of ObjectId(mongoose) and req.user._id is String
                if(campground.author.id.equals(req.user._id))
                {
                    next();
                }
                else
                {
                    req.flash("error", "You are not authorised to do that");
                    res.redirect("back");
                }
            }
        });
    }
    else
    {
        req.flash("error", "You are not authorised to do that");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwner = function(req, res, next)
{
    if(req.isAuthenticated())
    {
        Comment.findById(req.params.comment_id, function(err, comment){
            if(err)
            {
                req.flash("error", "Something went wrong");
                res.redirect("back");
            }
            else
            {
                // can't use === because campground.author.id is of ObjectId(mongoose) and req.user._id is String
                if(comment.author.id.equals(req.user._id))
                {
                    next();
                }
                else
                {
                    req.flash("error", "You are not authorised to do that");
                    res.redirect("back");
                }
            }
        });
    }
    else
    {
        req.flash("error", "You are not authorised to do that");
        res.redirect("back");
    }
}

// =========================
// Middleware
// =========================
middlewareObj.isLoggedIn = function(req, res, next)
{
    if(req.isAuthenticated())
    {
        return next();
    }
    req.flash("error", "Please Login First");
    res.redirect("/login");
}

module.exports = middlewareObj;