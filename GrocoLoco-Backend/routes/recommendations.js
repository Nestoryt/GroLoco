var raccoon = require('raccoon')
var _ = require('lodash')
var clone = require('clone')

//RACCOON ==========================================================
raccoon.config.nearestNeighbors = 5;  
raccoon.config.className = 'groceryitem';  // prefix for your items (used for redis) 
raccoon.config.numOfRecsStore = 30;  // number of recommendations to store per user 
raccoon.config.factorLeastSimilarLeastLiked = false; 
// raccoon.connect('21099', 'ec2-54-83-199-200.compute-1.amazonaws.com', 'paonqf6qoa86pv3gs30jg35a3s7') // auth is optional, but required for remote redis instances 

module.exports = function (app){

	app.delete('/flushreccomendations', isAuthenticated, function(req,res){
        raccoon.flush()
        res.send(200)
    })

      app.post('/addtolist', isAuthenticated, function(req, res) {
        for(var i = 0; i < req.body.List.length;i++){

            //Add a liked item to the Recommendation Engine
            // raccoon.liked(req.user._id, req.body.List[i]._id.$oid)

            //Find the Add all items to the list
             GroceryList.findOneAndUpdate({
                'User': req.user,
                'GroceryListName': req.body.GroceryListName
            },{
                $push:{'List': req.body.List[i]}
            },{
                safe:true, upsert:true, new: true
            },
            function(err, groceryList){
                if(err)
                    res.send(err)
                if(groceryList)
                    res.send(200)
            })
        }
    })

	app.post('/likeitemtest', isAuthenticated, function(req, res){
        //train data with Mark's ID
        raccoon.liked('560c18022955001100873ddc', '564968036ad5a11572f7e12b')
        raccoon.liked('560c18022955001100873ddc', '564968036ad5a11572f7e12d')
        raccoon.liked('560c18022955001100873ddc', '564968036ad5a11572f7e129')

        //Morgan I
        raccoon.liked('560a0c80fb729eab18ab31fb', '564968036ad5a11572f7e12b')
        res.send(200)
    })

    app.get('/getrecommendations', isAuthenticated, function(req, res){
    //     async.parallel([
    //         function(callback){
    //             console.log('getting recommended')
    //             raccoon.recommendFor(req.user._id, 3, function(results){
    //                 callback(null, results);
    //             })
    //         },
    //         function(callback){
    //             raccoon.bestRated(function(results){
    //                 GroceryList.findOne({
    //                     'User':req.user
    //                 }, function(err,list){
    //                     if(err){
    //                         callback(null);
    //                     }else if(list){
    //                         /*
    //                         * make sure that the recommended items
    //                         * are not already contained within the users grocery list
    //                         */
    //                         var newList = []
    //                         for(var i = 0; i < results.length && newList < 2; i++){
    //                             if(!_.includes(list, results[i])){
    //                                 newList.push(results[i])
    //                             }
    //                         }
    //                         callback(null, newList)
    //                     }else{
    //                         callback(null);
    //                     }
    //                 })
    //             })
    //         }
    //     ],
    //     function(err, results){
    //         var groceryList = _.union(results[0],results[1])
    //         console.log(groceryList)
    //         GroceryItem.find({
    //             '_id': { $in: groceryList }
    //         },function(err, items){
    //             if(err){
    //                 res.send(err)
    //             }
    //             else if(items){
    //                 res.send(items)
    //             }
    //             else
    //                 res.send(404)
    //         })
    //     });
    //     res.send([])
        res.send([])
    })

}

var isAuthenticated = function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler 
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response object
    if (req.isAuthenticated()){
        console.log('User is authenticated')
        return next();
    }
    // if the user is not authenticated then redirect him to the login page
    var fail = 'Sorry a user is not logged in'
    console.log(fail)
    res.send({'status': false});
}