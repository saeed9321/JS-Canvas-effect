c = document.getElementById("canvas");
c.width = window.innerWidth -24;
c.height = window.innerHeight-24;
c.style.border = '2px solid black';
c.style.backgroundColor = "black";
ctx = c.getContext("2d");
circleList = [];

// Circle class
class Circle {
    constructor(x, y, CircleRadius, color, collide, dx, dy) {
        this.x = x;
        this.y = y;
        this.radius = CircleRadius;
        this.color = color;
        this.collide = collide;
        this.dx = dx;
        this.dy = dy;
    }}

// Random colours
function randomColor(){
    colorList = ['#dc6900', '#eb8c00', '#e0301e', '#a32020', '#602320'];
    return colorList[Math.floor(Math.random() * 4)];
    }

// Create circles of count 1000
function rebuild(){
    while (circleList.length < 200){
        x_pos = Math.random() * c.width;
        y_pos = Math.random() * c.height;
        radius = 30+ Math.random() * 10;
        x_speed = Math.random() * 1.5;
        y_speed = Math.random() * 1;
        color = randomColor();
        new_circle = new Circle(x_pos, y_pos, radius, color, 0, x_speed, y_speed);
        circleList.push(new_circle);}
}

// re-Draw circles
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
for (var i=0; i<circleList.length; i++){ 
    new_x = Math.floor(circleList[i].x);
    new_y = Math.floor(circleList[i].y);
    radius = Math.floor(radius);
    ctx.beginPath();
    ctx.arc(new_x, new_y, circleList[i].radius, 0, Math.PI *2);
    ctx.fillStyle = circleList[i].color;
    ctx.fill();
    ctx.closePath();
    //ctx.stroke();
}}

// take click coordination
var mouse = {
    x: undefined,
    y: undefined
}
window.addEventListener('mousemove', (event)=>{
    mouse.x = event.x;
    mouse.y = event.y;})

// Increase radius if mouse over circle
function enlargeCircle(){
    for (i=0; i< circleList.length; i++){
        if (mouse.x < circleList[i].x+circleList[i].radius && mouse.x > circleList[i].x-circleList[i].radius && mouse.y < circleList[i].y+circleList[i].radius && mouse.y > circleList[i].y-circleList[i].radius){
            if (circleList[i].radius < 60){
            circleList[i].radius += 2;
            circleList[i].collide = 1; }
        } else if (circleList[i].collide == 1){
            new_radius = 20+ Math.random() * 10;
            if (circleList[i].radius > new_radius){
                circleList[i].radius -= 1;} else {
                circleList[i].collide = 0;}
        }}}

// Move Circles
function moveCircle(){
    for (i=0; i<circleList.length; i++){
        circleList[i].x += circleList[i].dx;
        circleList[i].y += circleList[i].dy;
        if (circleList[i].x+circleList[i].radius > c.width || circleList[i].x-circleList[i].radius < 0){
            circleList[i].dx *= -1;}
        if (circleList[i].y+circleList[i].radius > c.height || circleList[i].y-circleList[i].radius < 0){
            circleList[i].dy *= -1;}
    }
}

// Mainloop
setInterval(function() {
    rebuild();
    draw();
    enlargeCircle();
    moveCircle();
}, 10)

