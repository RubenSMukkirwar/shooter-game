const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;


class Player{
    constructor(x,y,radius,color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI *2,false);
        
        ctx.fillStyle = this.color;
        ctx.fill();
        
    }
}
class Projectile{
    constructor(x,y,radius,color,velocity){
        this.x =x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI *2,false);
        
        ctx.fillStyle = this.color;
        ctx.fill();
        
    }
    update(){
        this.draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
}
class Enemy{
    constructor(x,y,radius,color,velocity){
        this.x =x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI *2,false);
        
        ctx.fillStyle = this.color;
        ctx.fill();
        
    }
    update(){
        this.draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
}
var x = canvas.width /2;
const y = canvas.height /2;
const player = new Player(x,y,20,'white') ;

function spawnEnemy(){
    setInterval(() => {
        let x;
        let y;
        const radius = Math.random() * (30 -7) + 7;
        if(Math.random() < 0.5){
            x =Math.random() <0.5 ? 0 -radius : canvas.width + radius;
            y =Math.random() * canvas.height;
            //
        }else{
            x =Math.random() * canvas.width;
            y =Math.random() <0.5 ? 0 -radius : canvas.height + radius;
        }
        
        
        const color = generateRandomColor();
        const angle = Math.atan2(canvas.height/2 - y,canvas.width/2  - x);
        const velocity ={
        x :4*Math.cos(angle),
        y: 4*Math.sin(angle)
    }
        enemies.push(new Enemy(x,y,radius,color,velocity));
    },1000)
}
const projectiles = [];
const enemies = [];

function generateRandomColor() {
    var colors = [
        "#FFD700", // Gold
        "#FF4500", // Orange Red
        "#FF69B4", // Hot Pink
        "#00FF00", // Lime Green
        "#00FFFF", // Cyan
        "#FF00FF", // Magenta
        "#FFA500", // Orange
        "#FF0000", // Red
        "#FFFF00", // Yellow
        "#00FF7F"  // Spring Green
      ];
    
      var randomIndex = Math.floor(Math.random() * colors.length);
      return colors[randomIndex];
  }
let animationID;
function animate(){
    animationID = requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    player.draw();
    projectiles.forEach(projectile =>{
        projectile.update();
        if(projectile.x + projectile.radius < 0|| projectile.x -projectile.radius >canvas.width||
            projectile.y + projectile.radius < 0 || projectile.y - projectile.radius > canvas.height){
            setTimeout(() =>{
                
                projectiles.splice(index, 1); 
            },0)
        }

    });
    enemies.forEach((enemy, index) => {
        enemy.update(); // Update the enemy's state
        let dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);
        if(dist - enemy.radius - player.radius<0){
            alert('GAME OVER !!!')
            cancelAnimationFrame(animationID);

        }
        projectiles.forEach((projectile, pindex) => {
          let dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y); // Calculate the distance between the projectile and enemy
          let tot = projectile.radius + enemy.radius; // Calculate the total radius of the projectile and enemy
      
          if (dist - tot < 1) {
            setTimeout(() =>{
                enemies.splice(index, 1); // Remove the enemy from the enemies array
            projectiles.splice(pindex, 1); // Remove the projectile from the projectiles array
            },0) 
            
          }
        });
      });
      
}

window.addEventListener('click', (event) =>{
    const angle = Math.atan2(event.clientY - canvas.height/2,
    event.clientX - canvas.width/2 );
    const velocity ={
        x :15* Math.cos(angle),
        y: 15 *Math.sin(angle)
    }
    console.log(angle)
    projectiles.push(new Projectile(canvas.width/2,
    canvas.height/2,5,'white',velocity)); 
})
animate();
spawnEnemy();

