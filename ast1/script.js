

var increment = true;
var temp ="";
var maxStar = 5;
var minStar = 1;
var count = 0;

var temp ="";
setInterval(function(){

if(increment){
    temp+='*';
  
    count++;
    if(count ===maxStar){
        increment =!increment;
        
    }
   
}
else{
    temp = temp.slice(0,-1);
    count--;
   
    if(count ===minStar){
        increment =!increment;
        
    }
  
}
console.log(temp);

},100);




