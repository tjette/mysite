function Clicker(count) {
this.count = count;

this.newClick = function() {
//add 1 for every Click
this.count += 1;
};


};

var x = new Clicker(0);

//coolClicker.count;
//console.log("the value of coolclicker count is " + coolClicker.count);