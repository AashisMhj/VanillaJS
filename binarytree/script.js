/*
x, y --> x,y co-ordinates of the center of circle
r: radius of the circle
ctrx: context of the canvas
data: data to be displayed 
*/
var Node = function(x,y,r, ctx, data){
    // left child of a node
    this.leftNode = null;
    // right child of a node
    this.rightNode = null;

    // draw function. Responsible for drawing the node
    this.draw = function(){
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2*Math.PI);
        ctx.stroke()
        ctx.closePath();
        ctx.strokeText(data, x, y);
    }
    // simple getters
    this.getData = function(){ return data;};
    this.getX = function(){ return x;};
    this.getY = function(){ return y;};
    this.getRadius = function(){ return r;};

    // retuns coordinate for the left child
    // go back 3 times radius in x axis and
    // go down 3 times radius in y axis
    this.leftCoordinate = function(){
        return {cx: (x-(3*r)), cy: (y+(3*r))}
    }
    // same but for right child
    this.rightCoordinate = function(){
        return {cx: (x + (3*r)), cy: (y+(3*r))}
    };
};

// draw a line from one circle(node) to another circle
var Line = function(){
    // x,y starting x,y coordinates
    // toX, toY ending x,y coordinate
    this.draw = function(x,y, toX, toY, r, ctx){
        var moveToX = x;
        var moveToY = y+r;
        var lineToX = toX;
        var lineToY = toY -r;
        ctx.beginPath();
        ctx.moveTo(moveToX, moveToY);
        ctx.lineTo(lineToX, lineToY);
        ctx.stroke();
    }
}

var BTree = function(){
    var c = document.getElementById('my-canvas');
    var ctx = c.getContext('2d');
    var line = new Line();
    this.root = null;
    
    var self = this;

    // get for root
    this.getRoot = function(){ return this.root;};

    // adds element to the tree
    this.add = function(data){
        // if root exists, then recursively find the place to add the new node
        if(this.root){
            this.recursiveAddNode(this.root, null, null, data);
        }else{
            // if there is no root 
            this.root = this.addAndDisplayNode(200, 200, 15, ctx, data);
        }
    };

    // if there is root traverse through tree
    this.recursiveAddNode = function(node, prevNode, coordinateCallBack, data){
        if(!node){
            // is either node.leftCoordinate or node.rightCoordinate
            var xy = coordinateCallBack();
            var newNode = this.addAndDisplayNode(xy.cx, xy.cy, ctx, data);
            line.draw(prevNode.getX(), prevNode.getY(), xy.cx, xy.cy, prevNode.getRadius(), ctx);
            return newNode;
        }
        else{
            if(data <= node.getData()){
                // if the data is less addto left
                node.left = this.recursiveAddNode(node.left, node, node.leftCoordinate, data);
            }
            else{
                node.right = this.recursiveAddNode(node.right, node, node.rightCoordinate, data);
            }
            return node;
        }
    };

    // add the node to the tree and calls the draw function
    this.addAndDisplayNode = function(x, y, r, ctx, data){
        var node = new Node(x, y, r, ctx, data);
        node.draw();
        return node;
    }
}

var addToTree = function(){
    input = document.getElementById('tree-input');
    value = parseInt(input.value);
    if(value){
        btree.add(value);
    }else{
        alert("Wrong Input");
    }
}

var btree = new BTree();