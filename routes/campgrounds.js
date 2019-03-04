var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// =========================
// Campgrounds Route
// =========================

// show all campgrounds : /campgrounds
router.get("/", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

// create new campground : /campgrounds
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    // adding author data to campground
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, image: image, description: description, author: author};
    Campground.create(newCampground, function(err, newlyCreated){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.redirect("/campgrounds");
        }
    });
});

// show create campground form : /campgrounds/new
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");    
});

// show a particular campground : /campgrounds/:id
router.get("/:id", function(req, res){
    var id = req.params.id;
    Campground.findById(id).populate("comments").exec(function(err, particularCampground){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("campgrounds/show", {campground: particularCampground});
        }
    });
});

// Edit campground form
router.get("/:id/edit", middleware.checkCampOwner, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err)
        {
            res.redirect("/campgrounds");
        }
        else
        {
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
});

// update campground
router.put("/:id", middleware.checkCampOwner, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updated){
        if(err)
        {
            res.redirect("/campgrounds");
        }
        else
        {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// delete campground, associated comments should also be deleted
router.delete("/:id", middleware.checkCampOwner, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err, campground){
        if(err)
        {
            res.redirect("/campgrounds");
        }
        else
        {
            Comment.deleteMany({_id: { $in: campground.comments }}, function(err){
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    res.redirect("/campgrounds");
                }
            });
            
        }
    });
});

module.exports = router;