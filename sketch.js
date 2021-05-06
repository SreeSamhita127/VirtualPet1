//Create variables here
var dog
var happydog
var database
var foods = 0;
var foodstock

function preload() {
  dogImg = loadImage("images/dogImg.png");
  dogImg1 = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  
  dog = createSprite(250,250,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.2

  database = firebase.database();
  foodstock = database.ref('food');
  foodstock.on("value",readStock);

}

function draw() { 
  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foods);
    dog.addImage(dogImg1)
  }

  textSize(20);
  fill("black");
  text("press up arrow to feed doggo milk", 20, 30);
  text("food left: " + foods, 20,80);

  drawSprites();
  
}

function readStock(data){
  foods = data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
    x = x-1;
  }
  database.ref('/').update({
    food:x
  })
}