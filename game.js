// Iteration 1: Declare variables required for this game
var seconds = parseInt(document.getElementById("timer").textContent)
const body = document.getElementById("game-body")
var lives = document.getElementById("lives")
var zombieId = 0;
const Img = [
    "zombie-1.png",
    "zombie-2.png",
    "zombie-3.png",
    "zombie-4.png",
    "zombie-5.png",
    "zombie-6.png"
]

// Iteration 1.2: Add shotgun sound
body.onclick=()=>{
   const audio =  new Audio("./assets/shotgun.wav")
   audio.currentTime = 0; 
   audio.play()
}

// Iteration 1.3: Add background sound

body.addEventListener("onmouseenter", ()=>{
   
        const backgroundSound = new Audio("./assets/bgm.mp3");
    backgroundSound.volume = 1;
    backgroundSound.play()
    backgroundSound.loop = true;

})


// Iteration 1.4: Add lives
let noOfLives = 4
// Iteration 2: Write a function to make a zombie
function makeZombie(){
    let randomImage = Img[getRandomInt(0,Img.length)]
    body.innerHTML  += `<img src="./assets/${randomImage}" class = "zombie-image" id="zombie${zombieId}">`
    let zombie = document.getElementById("zombie"+zombieId)

    zombie.style.transform = `translateX(${getRandomInt(20,80)}vw)`
    zombie.style.animationDuration = `${getRandomInt(2,6)}`
    zombie.onclick=()=>{
        zombieDestroy(zombie)
    }
}
// Iteration 3: Write a function to check if the player missed a zombie
function checkCollision(zombie){
    if(zombie.getBoundingClientRect().top<=0){
        noOfLives--
        return true
    }
    return false
}

// Iteration 4: Write a function to destroy a zombie when it is shot or missed
function zombieDestroy(zombie){
    zombie.style.display = "none"
    zombieId++
    makeZombie()
}

// Iteration 5: Creating timer
var timer = setInterval(() => {
    seconds--;
    document.getElementById("timer").textContent = parseInt(seconds);
    let zombie = document.getElementById("zombie" + zombieId);
    if (checkCollision(zombie) == true) {
        zombieDestroy(zombie);
        if (noOfLives == 0) { 
            location.href = "./game-over.html";
        }
    }
    if (seconds == 0) {
        location.href = "./win.html";
    }
}, 1000);
// Iteration 6: Write a code to start the game by calling the first zombie
makeZombie()


// Iteration 7: Write the helper function to get random integer
function getRandomInt(min,max){
    min = Math.ceil(min); //min should be exclusive
    max = Math.floor(max) //max is inclusive

    return Math.floor(Math.random()*(max-min))+min;//we can use it again in the code
}
