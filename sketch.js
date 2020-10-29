const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var engine, world;
var box1, pig1;
var backgroundImg,platform;
var gameState = "start";
var score = 0;

var lives = [];

var flyingSound, selectSound, snortSound;

function preload() {
    bgChange();
    flyingSound = loadSound("bird_flying.mp3");
    selectSound = loadSound("bird_select.mp3");
    snortSound = loadSound("pig_snort.mp3");
}

function setup(){
    var canvas = createCanvas(1200,600);
    canvas.position(20, 70);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 505, 300, 250);

    box1 = new Box(700,520,70,70);
    box2 = new Box(920,520,70,70);
    pig1 = new Pig(810, 550);
    log1 = new Log(810,460,300, PI/2);

    box3 = new Box(700,440,70,70);
    box4 = new Box(920,440,70,70);
    pig3 = new Pig(810, 420);

    log3 =  new Log(810,380,300, PI/2);

    box5 = new Box(810,360,70,70);
    log4 = new Log(760,320,150, PI/7);
    log5 = new Log(870,320,150, -PI/7);

    bird = new Bird(200,225);
    bird2 = new Bird(150, 100);
    bird3 = new Bird(100, 100);
    bird4 = new Bird(50, 100);
    lives.push(bird4);
    lives.push(bird3);
    lives.push(bird2);
    lives.push(bird);

    slingshot = new Slingshot(bird.body, {x:200, y:225});

}

function draw(){
    if (backgroundImg){
    background(backgroundImg);
    }
    Engine.update(engine);

    bgChange();

    stroke("white");
    textSize(30);
    text("Score= " + score, 1000, 50);

    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    bird2.display();
    bird3.display();
    bird4.display();

    slingshot.display();

    platform.display();
}

function mouseDragged (){
    if (gameState != "flying"){
    Matter.Body.setPosition(lives[lives.length-1].body, {x:mouseX, y:mouseY});
    Matter.body.applyForce(lives[lives.length-1].body, lives[lives.length-1].body.position, {x:5, y:-5});
    selectSound();
    return false;
    }
}

function mouseReleased (){
    slingshot.fly();
    lives.pop();
    gameState = "flying";
    flyingSound.play();
    return false;
}

function keyPressed(){
    if (keyCode === 32 && gameState === "flying" && lives.length > 0){
    Matter.Body.setPosition(lives[lives.length-1].body, {x:200, y:225});
    slingshot.attach(lives[lives.length-1].body);
    bird.trajectory = [];
    gameState = "start";
    selectSound.play();
    return false;
    }
}

async function bgChange(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var rJSON = await response.json();
    var dateTime = rJSON.datetime;
    var hour = dateTime.slice(11, 13);
    console.log(hour);
    if (hour>5 && hour<19){
        bg = "sprites/bg.png";
    }
    else
        bg = "sprites/bg2.jpg";
backgroundImg = loadImage(bg);
}