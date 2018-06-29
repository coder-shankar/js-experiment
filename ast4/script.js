
    /* 
     Edit this function such that it returns {id, title, boxart} for every video in the movieLists. 
     Only boxart with dimensions of 150x200px should be selected.
     
    Solve this problem with map(), reduce(), and filter(). 
    */
     
      var movieLists = [{
          name: "Instant Queue",
          videos: [{
              "id": 70111470,
              "title": "Die Hard",
              "boxarts": [{
                  width: 150,
                  height: 200,
                  url: "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg"
                },
                {
                  width: 200,
                  height: 200,
                  url: "http://cdn-0.nflximg.com/images/2891/DieHard200.jpg"
                }
              ],
              "url": "http://api.netflix.com/catalog/titles/movies/70111470",
              "rating": 4.0,
              "bookmark": []
            },
            {
              "id": 654356453,
              "title": "Bad Boys",
              "boxarts": [{
                  width: 200,
                  height: 200,
                  url: "http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg"
                },
                {
                  width: 150,
                  height: 200,
                  url: "http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg"
                }
    
              ],
              "url": "http://api.netflix.com/catalog/titles/movies/70111470",
              "rating": 5.0,
              "bookmark": [{
                id: 432534,
                time: 65876586
              }]
            }
          ]
        },
        {
          name: "New Releases",
          videos: [{
              "id": 65432445,
              "title": "The Chamber",
              "boxarts": [{
                  width: 150,
                  height: 200,
                  url: "http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg"
                },
                {
                  width: 200,
                  height: 200,
                  url: "http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg"
                }
              ],
              "url": "http://api.netflix.com/catalog/titles/movies/70111470",
              "rating": 4.0,
              "bookmark": []
            },
            {
              "id": 675465,
              "title": "Fracture",
              "boxarts": [{
                  width: 200,
                  height: 200,
                  url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg"
                },
                {
                  width: 150,
                  height: 200,
                  url: "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg"
                },
                {
                  width: 300,
                  height: 200,
                  url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg"
                }
              ],
              "url": "http://api.netflix.com/catalog/titles/movies/70111470",
              "rating": 5.0,
              "bookmark": [{
                id: 432534,
                time: 65876586
              }]
            }
          ]
        }
      ];
    
    
      // Use one or more map, reduce, and filter calls to create an array with the following items
    /* [{
          "id": 675465,
          "title": "Fracture",
          "boxart": "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg"
        },
        {
          "id": 65432445,
          "title": "The Chamber",
          "boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg"
        },
        {
          "id": 654356453,
          "title": "Bad Boys",
          "boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg"
        },
        {
          "id": 70111470,
          "title": "Die Hard",
          "boxart": "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg"
        }
      ]; */


    movieLists   =  movieLists.map(function(movie){
         movie =  movie.videos.map(function(video){
            video.boxarts =   video.boxarts.filter(function(art){
                return art.width===150 && art.height ===200;
            });

            
            video.boxart=  video.boxarts .reduce(function(acc , val){

                return val.url;
            },0);

           

            var allowedKeys = ["id","title","boxart"];

    

            var allVal =allowedKeys.reduce(function(acc,key){
           
             
                acc[key] = video[key];
                return acc;

                

            },{});

     movieLists = []
     movieLists.push(allVal);
       

       return allVal;
    });

return movieLists;

    });

    
    console.log(movieLists);
