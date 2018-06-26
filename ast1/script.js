
function printUp(){
for (var i = 0; i<6;i++){
temp ="";
    for (var j = 0;j<=i;j++){
    temp+='*';
    }
    console.log(temp);
    
}

}

function printDown(){
 
    for (var i = 6; i>0;i--){
        temp ="";
            for (var j = 0;j<=i;j++){
            temp+='*';
            }
            console.log(temp);
            
        }

}

setInterval(function(){
printUp();
printDown();
},1000);

