var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");
    
var data = [
        {
            name: "Manchester United",
            image: "https://www.premierleague.com/resources/ver/i/default-thumbnails/t1.png",
            description: "Manchester United Football Club, commonly known as Man United, or simply United, is a professional football club based in Old Trafford, Greater Manchester, England, that competes in the Premier League, the top flight of English football. Nicknamed 'the Red Devils', the club was founded as Newton Heath LYR Football Club in 1878, changed its name to Manchester United in 1902 and moved to its current stadium, Old Trafford, in 1910."
        },
        {
            name: "Delhi Dynamos",
            image: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Official_Delhi_Dynamos_FC_Logo.png/240px-Official_Delhi_Dynamos_FC_Logo.png",
            description: "Delhi Dynamos (DDFC) is an Indian professional football club based in Delhi, which competes in the Indian Super League under license from All India Football Federation (AIFF).The club began to play in October 2014 during the inaugural season of the Indian Super League. The team is owned by United States-based ship recycling company GMS Inc."
        }
    ]    
    
function seedDB()
{
    Campground.remove({}, function(err){
        if(err)
        {
            console.log(err);
        }
        /*else
        {
            console.log("Teams Removed");
            Comment.remove({}, function(err){
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    console.log("Comments removed");
                    
                    data.forEach(function(seed){
                        Campground.create(seed, function(err, campground){
                            if(err)
                            {
                                console.log(err);
                            }
                            else
                            {
                                console.log("Team added");
                                
                                Comment.create({
                                    text: "This is the best team in the world",
                                    author: "Arjun Majithia"
                                }, function(err, comment){
                                    if(err)
                                    {
                                        console.log(err);
                                    }
                                    else
                                    {
                                        campground.comments.push(comment);
                                        campground.save();
                                        console.log("Created new comment");
                                    }
                                });
                            }
                        });
                    });
                }
            });
        }*/
    });
}

module.exports = seedDB;