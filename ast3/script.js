
var list = document.getElementsByTagName('li');
var noOfImage = list.length;

var slider = document.getElementsByTagName('ul')[0];

var sliderMargin = 0;
var increment = 20;




var next = document.getElementsByClassName('next')[0];

next.onclick = function(){
    

var x = setInterval(function(){ slider.style.marginLeft = sliderMargin-increment +"px";
sliderMargin = sliderMargin-increment;


console.log(sliderMargin);
if(sliderMargin %-400===0){ 
    clearInterval(x);
  
    
}

if(sliderMargin <-800) {
    clearInterval(x)
    sliderMargin =0;
    

}
if (sliderMargin === 0){
    clearInterval(x)
    sliderMargin = 0;
}


},100);
}


var prev = document.getElementsByClassName('previous')[0];
// sliderMargin = -1200;
maxMargin = -1200;
// sliderMargin  = maxMargin;

prev.onclick = function(){
    if(sliderMargin === 0) {
        clearInterval(x)
        sliderMargin =-1200;
        
    
    }

    var x = setInterval(function(){ slider.style.marginLeft = sliderMargin+increment +"px";
    sliderMargin = sliderMargin+increment;
    
    
    console.log(sliderMargin);
    if(sliderMargin %400===0){ 
        clearInterval(x);
      
        
    }
    
 
    
    
    },100);
    }
    

