function randomFunction (startValue , stopValue){

    return Math.floor(Math.random()*(stopValue - startValue +1) + startValue);
}



function generateData(){
    var plottingData  = [];

    for(var i = 0;i< 100;i++){
        var x = randomFunction(0,500);
        var y = randomFunction(0,500);

        var data = {left:x,top1:y};
        plottingData.push(data);

    }
    return plottingData;
}


function plot(){
var data = generateData();
for(var i = 0;i<data.length ;i++){

    var point = document.createElement("div");
    point .style.background="blue";
    point.style.height ="10px"
    point.style.width = "10px"
    // point.style.borderRadius = "50%";
    point.style.position = "absolute";

    var top1 = data[i].top1;
    var left = data[i].left;


    point.style.left = left+"px";
    point.style.top = top1+"px";

    graph.appendChild(point);

    point.onclick = function(){

       var top1 = this.style.top;
        var left = this.style.left;
        var list = document.createElement("li");
        list.style.color = "black";
        list.innerHTML = "("+top1+","+left+")"  ;
        document.getElementsByTagName('ul')[0].appendChild(list);

        this.parentNode.removeChild(this);

    };



}



}

var graph = document.getElementById("wrapper");
graph.style.height = "510px";
graph.style.width = "510px";
graph.style.position = "relative";
graph.style.background ="grey"




plot();
