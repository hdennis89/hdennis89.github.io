var scene, camera, renderer, light, light2, loader, clock;

var player;
var playerGeometry;
var playerMaterial;

var goat;
var goatTextureMaterial;
var goatTextureGeometry;

var star;
var stars = [];
var starMaterial;
var starGeometry;

var obstacle;
var obstacles = [];
var obstacleTextureMaterial;
var obstacleTextureGeometry;

var transparentObstacle;
var transparentObstacles = [];
var transparentObstacleGeometry;
var transparentObstacleMaterial;

var powerup;
var powerups = [];
var powerupTextureMaterial;
var powerupTextureGeometry;

var transparentPowerup;
var transparentPowerups = [];
var transparentPowerupGeometry;
var transparentPowerupMaterial;

var joint;
var joints = [];
var jointTextureMaterial;
var jointTextureGeometry;

var transparentJoint;
var transparentJoints = [];
var transparentJointGeometry;
var transparentJointMaterial;

var taxisign;
var taxisigns = [];
var taxisignTextureMaterial;
var taxisignTextureGeometry;

var transparentTaxisign;
var transparentTaxisigns = [];
var transparentTaxisignGeometry;
var transparentTaxisignMaterial;

var spacetaxi;
var spacetaxiTextureMaterial;
var spacetaxiTextureGeometry;

//var fart;
//var fartMaterial;
//var fartGeometry;

var fartEmitter, lifeEmitter, shieldEmitter, taxisignEmitter;
var fartParticleGroup = new SPE.Group({
    texture: THREE.ImageUtils.loadTexture("models/smokeparticle.png"),
    maxAge:5,
    blending: THREE.AdditiveBlending
});
var particleDelta;

var ufoEmitter ;
var ufoParticleGroup = new SPE.Group({
    texture: THREE.ImageUtils.loadTexture("models/smokeparticle.png"),
    maxAge: 0.3,
    blending: THREE.AdditiveBlending
});

var obstacleEmitter;
var obstacleParticleGroup = new SPE.Group({
    texture: THREE.ImageUtils.loadTexture("models/obstacle_particle.png"),
    maxAge: 1.5,
    blending: THREE.AdditiveBlending
});

var cloudEmitter;
var cloudParticleGroup = new SPE.Group({
    texture: THREE.ImageUtils.loadTexture("models/cloudSml.png"),
    maxAge: 5
});

var smokeEmitter;
var smokeParticleGroup = new SPE.Group({
        texture: THREE.ImageUtils.loadTexture("models/smokeparticle.png"),
        maxAge: 2,
        blending: THREE.AdditiveBlending
});

var taxiEmitter1, taxiEmitter2;
var taxiParticleGroup = new SPE.Group({
    texture: THREE.ImageUtils.loadTexture("models/smokeparticle.png"),
    maxAge:1.7,
    blending: THREE.AdditiveBlending
});

var shield;
var shields = [];
var shieldMaterial;
var shieldGeometry;

var life;
var lifes = [];
var lifeTextureMaterial;
var lifeTextureGeometry;
var lifeNumber;
var lifeSymbol;

var transparentLife;
var transparentLifes = [];
var transparentLifeGeometry;
var transparentLifeMaterial;

var lava;
var lavaArray = [];
var lavaMaterial;
var lavaGeometry;
var lavaLasting = 150;

var starInterval = 1;
var obstacleInterval = 500;
var powerupInterval = 2000;
var jointInterval = 18000;
var shieldInterval = 10000;
var taxisignInterval = 43000;
var lifeInterval = 15000;
var lavaInterval = 10;
var secondCount = 0;
var speed = 0.1;

var KEYCODE_LEFT = 37;
var KEYCODE_UP = 38;
var KEYCODE_RIGHT = 39;
var KEYCODE_DOWN = 40;
var KEYCODE_A = 65;
var KEYCODE_W = 87;
var KEYCODE_D = 68;
var KEYCODE_S = 83;
var playerSpeed;
var k;
var l;
var m;
var n;
var isEnd = false;
var ms = 10;

var playalong = new Audio('./sounds/playalong.wav');
var adead = new Audio('./sounds/tot.wav');
var acoin = new Audio('./sounds/collectcoin.wav');
var afart = new Audio('./sounds/furz.wav');
var adamage = new Audio('./sounds/getroffen_1.wav');
var adamage2 = new Audio('./sounds/getroffen_2.wav');
var ashield = new Audio('./sounds/schild.wav');
var aexplode = new Audio('./sounds/explode2.wav');
var amoo = new Audio('./sounds/joint.wav');
var ataxi = new Audio('./sounds/taxi.wav');

var lives = 3;
var canCollide = true;
var canPickUpPowerup = true;
var gameOverVisible = false;
var mainscreenLink;

var backgroundObject;
var backgroundObjectMesh;
var backgroundObjectMaterial;
var backgroundObjectGeometrie;
var ufoGeometry;
var firstRun = true;


var playerLoader = new THREE.JSONLoader();
playerLoader.load('models/goat4.json', function (geometry) {
    goatTextureGeometry = geometry;
    goatTextureMaterial = new THREE.MeshLambertMaterial({
        map: THREE.ImageUtils.loadTexture('models/goat_texture.jpg')
    });
    goat = new THREE.Mesh(goatTextureGeometry, goatTextureMaterial);
    goat.position.z = 2.75;
    goat.position.y = -0.05;
    goat.scale.x = 0.4;
    goat.scale.y = 0.4;
    goat.scale.z = 0.4;
    scene.add(goat);  
	goatBehavior();   
	function goatBehavior()
	{
        

		setTimeout(function()
		{
			setInterval(function () 
			{
				if(goat.scale.x == 0.394)
				{
					goat.scale.x = 0.400;
					setTimeout(function()
					{
						goat.scale.x = 0.406;
					},100);
				}
				else
				{
					goat.scale.x = 0.400;
					setTimeout(function()
					{
						goat.scale.x = 0.394;
					},100);
				}	
			}, 200);
		},50);
			setInterval(function () 
			{
				if(goat.rotation.z == 0.02)
				{
					goat.rotation.z = 0;
					setTimeout(function()
					{
						goat.rotation.z = -0.02;
					},100);
				}
				else
				{
					goat.rotation.z = 0;
					setTimeout(function()
					{
						goat.rotation.z = 0.02;
					},100);
				}	
			}, 200);
		
	  
    }	
});

//Textscore;
var counterString;
var scoreString;
var highscoreString;
var textCounter;
var textScore;
var textHighscore;
var scoretimer = 0;
var scoretimeout = 0;
var sceneEnd;

init();
animate();

function init() {
    startScore();
    scene = new THREE.Scene();
    sceneEnd = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 6;
    camera.position.y = 0.3;

    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    //Endscene
    renderer.autoClear = false;

    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 1, 1).normalize();
    scene.add(light);

    light2 = new THREE.DirectionalLight(0xffffff);
    light2.position.set(2, 1, 3).normalize();
    sceneEnd.add(light2);

    loader = new THREE.JSONLoader();

    //Clock
    clock = new THREE.Clock();


    //Music
    playalong.loop = true;
    playalong.volume = 0.5;
    playalong.play();

    //EventListener bei Veränderung der Fenstergröße
    window.addEventListener('resize', function () {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });

    //PLAYER
    playerGeometry = new THREE.SphereGeometry(0.3, 10, 10);
    playerMaterial = new THREE.MeshPhongMaterial({color: 0x3000ff, transparent: true, opacity: 0, specular: 0xffffff, shininess: 5});

    //STARS
    starGeometry = new THREE.SphereGeometry(0.02, 10, 10);
    starMaterial = new THREE.MeshDepthMaterial();

    //OBSTACLES
    loader.load('models/obstacle.json', function (geometry) {
        obstacleTextureGeometry = geometry;
        obstacleTextureMaterial = new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture('models/obstacle_texture.jpg')
        });
    });

    //POWERUPS   
    loader.load('models/onion.json', function (geometry) {
        powerupTextureGeometry = geometry;
        powerupTextureMaterial = new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture('models/onion_texture.jpg')
        });
    });

    //JOINTS
    loader.load('models/joint.json', function (geometry) {
        jointTextureGeometry = geometry;
        jointTextureMaterial = new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture('models/joint_texture.jpg')
        });
    });

    //TAXISIGN
    loader.load('models/taxisign.json', function (geometry) {
        taxisignTextureGeometry = geometry;
        taxisignTextureMaterial = new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture('models/taxisign_texture.jpg'),
            shading: THREE.FlatShading
        });
    });

    //SPACETAXI
    loader.load('models/spacetaxi.json', function (geometry) {
        spacetaxiTextureGeometry = geometry;
        spacetaxiTextureMaterial = new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture('models/spacetaxi_texture.jpg'),
        });
    });
    
    //FARTS
    //fartGeometry = new THREE.SphereGeometry(0.3, 20, 10);
    //fartMaterial = new THREE.MeshPhongMaterial({color: 0x00ff00, transparent: true, opacity: 0});

    //SHIELDS
    shieldGeometry = new THREE.SphereGeometry(0.5, 10, 10);
    shieldMaterial = new THREE.MeshPhongMaterial({color: 0x3000ff, transparent: true, opacity: 0.6, specular: 0xffffff, shininess: 5});

    //LIFES
    loader.load('models/life.json', function (geometry) {
        lifeTextureGeometry = geometry;
        lifeTextureMaterial = new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture('models/life_texture.jpg'),
            shading: THREE.FlatShading
        });
    });

    //LAVA PARTICLES
    loader.load('models/lava.json', function (geometry) {
        lavaGeometry = geometry;
        lavaMaterial = new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture('models/lava_texture.jpg')
        });
    });
    
    //Ufo 
    loader.load("models/backgroundObjects/ufo.json", function (geometry) {ufoGeometry = geometry;});
    
    //LIFE NUMBER AND SYMBOL
    lifeNumber = document.createElement('p');
    lifeNumber.innerHTML = 'x' + lives;
    lifeNumber.style.position = 'absolute';
    lifeNumber.style.color = 'white';
    lifeNumber.style.fontSize = '25px';
    lifeNumber.style.right = '20px';
    lifeNumber.style.top = '5px';
    lifeNumber.style.textAlign = 'right';
    document.body.appendChild(lifeNumber);
    lifeSymbol = document.createElement('img');
    lifeSymbol.setAttribute('src', 'images/life.png');
    lifeSymbol.style.position = 'absolute';
    lifeSymbol.style.width = '50px';
    lifeSymbol.style.right = '75px';
    lifeSymbol.style.top = '20px';
    document.body.appendChild(lifeSymbol);

    //MAINSCREEN LINK
    mainscreenLink = document.createElement('a');
    mainscreenLink.href = 'index.html';
    mainscreenLink.innerHTML = 'return to main screen';
    mainscreenLink.style.position = 'absolute';
    mainscreenLink.style.color = 'white';
    mainscreenLink.style.textDecoration = 'none';
    mainscreenLink.style.fontSize = '8px';
    mainscreenLink.style.left = '5px';
    mainscreenLink.style.top = '5px';
    mainscreenLink.style.textAlign = 'left';
    document.body.appendChild(mainscreenLink);

    addPlayer();
    addStar();
    addObstacle();
    addPowerup();
    addJoint();
    //addFart();
    addLifeParticleEmitter();
    addFartParticleEmitter();
    addShieldParticleEmitter();
    addTaxisignParticleEmitter();
    addSmokeParticleEmitter();
    addUfoParticleEmitter();
    addTaxiParticleEmitter();
    //lifeParticle und fartParticle nutzen beide fartParticleGroup
    scene.add(fartParticleGroup.mesh);
    addObstacleParticleEmitter();
    addCloudParticleEmitter();
    addShield();
    addTaxisign();
    addLife();
    addLava();

    //CONTROLS 
    document.addEventListener('keydown', function (event) {
        playerSpeed = 0.2;
        goatRotation = 0.01;

if(lives > 0){
        switch (event.keyCode) {
            case KEYCODE_LEFT:
            if(player.position.x > -1 && !isEnd){
                var i = 0;
                isEnd = true;
                k = setInterval(function(){          
                    player.position.x -= playerSpeed;
                    goat.position.x -= playerSpeed;
                    goat.rotation.z -= goatRotation;
                    fartEmitter.position.x -= playerSpeed;
                    obstacleEmitter.position.x -= playerSpeed;
                    lifeEmitter.position.x -= playerSpeed;
                    shieldEmitter.position.x -= playerSpeed;
                    taxisignEmitter.position.x -= playerSpeed;               
                    i++;
                    
                    if(i == 10 ){
                        isEnd = false;
                        clearInterval(k);
                    }              
                }, ms);
            }
                break;

            case KEYCODE_RIGHT:
            if(player.position.x < 1 &&  !isEnd){
                var x = 0;
                isEnd = true;
                l = setInterval(function(){    
                    player.position.x += playerSpeed;
                    goat.position.x += playerSpeed;
                    goat.rotation.z += goatRotation;
                    fartEmitter.position.x += playerSpeed;
                    obstacleEmitter.position.x += playerSpeed;
                    lifeEmitter.position.x += playerSpeed;
                    shieldEmitter.position.x += playerSpeed;
                    taxisignEmitter.position.x += playerSpeed;
                    x++;
                    if( x == 10 ){
                        isEnd = false;
                        clearInterval(l);
                    }                
                }, ms);
            }
                break;

            case KEYCODE_UP:
            if(player.position.y < 1 &&  !isEnd){
                var y = 0;
                isEnd = true;
                m = setInterval(function(){
                    player.position.y += playerSpeed;
                    goat.position.y += playerSpeed;
                    goat.rotation.x -= goatRotation;
                    fartEmitter.position.y += playerSpeed;
                    obstacleEmitter.position.y += playerSpeed;
                    lifeEmitter.position.y += playerSpeed;
                    shieldEmitter.position.y += playerSpeed;
                    taxisignEmitter.position.y += playerSpeed;
                    y++;                
                    if( y == 5){
                        isEnd = false;
                        clearInterval(m);
                    }
                }, ms);
            }
                break;
            case KEYCODE_DOWN:
            if(player.position.y > -1 &&  !isEnd){
                var z = 0;
                isEnd = true;
                n = setInterval(function(){
                    player.position.y -= playerSpeed;
                    goat.position.y -= playerSpeed;
                    goat.rotation.x += goatRotation;
                    fartEmitter.position.y -= playerSpeed;
                    obstacleEmitter.position.y -= playerSpeed;
                    lifeEmitter.position.y -= playerSpeed;
                    shieldEmitter.position.y -= playerSpeed;
                    taxisignEmitter.position.y -= playerSpeed;
                    z++;            
                    if(z == 5){
                        isEnd = false;
                        clearInterval(n);
                    }
                }, ms);
            }
                break;

            case KEYCODE_A:
            if(player.position.x > -1 &&  !isEnd){
                var i = 0;
                isEnd = true;
                k = setInterval(function(){
                    player.position.x -= playerSpeed;
                    goat.position.x -= playerSpeed;
                    goat.rotation.z -= goatRotation;
                    fartEmitter.position.x -= playerSpeed;
                    obstacleEmitter.position.x -= playerSpeed;
                    lifeEmitter.position.x -= playerSpeed;
                    shieldEmitter.position.x -= playerSpeed;
                    taxisignEmitter.position.x -= playerSpeed;
                    i++;
                    if(i == 10 ){
                        isEnd = false;
                        clearInterval(k);
                    }                                
                },ms );
                
            }
                break;

            case KEYCODE_D:
            if(player.position.x < 1 &&  !isEnd){
                var x = 0;
                isEnd = true;
                l = setInterval(function(){
                    player.position.x += playerSpeed;
                    goat.position.x += playerSpeed;
                    goat.rotation.z += goatRotation;
                    fartEmitter.position.x += playerSpeed;
                    obstacleEmitter.position.x += playerSpeed;
                    lifeEmitter.position.x += playerSpeed;
                    shieldEmitter.position.x += playerSpeed;
                    taxisignEmitter.position.x += playerSpeed;
                    x++;
                    if( x == 10 ){
                        isEnd = false;
                        clearInterval(l);
                    }                              
                }, ms);
            }
                break;

            case KEYCODE_W:
            if(player.position.y < 1 &&  !isEnd){
                var y = 0;
                isEnd = true;
                m = setInterval(function(){
                    player.position.y += playerSpeed;
                    goat.position.y += playerSpeed;
                    goat.rotation.x -= goatRotation;
                    fartEmitter.position.y += playerSpeed;
                    obstacleEmitter.position.y += playerSpeed;
                    lifeEmitter.position.y += playerSpeed;
                    shieldEmitter.position.y += playerSpeed;
                    taxisignEmitter.position.y += playerSpeed;
                    y++;
                    if( y == 5){

                        isEnd = false;
                        clearInterval(m);
                    }
                }, ms);
            }
                break;

            case KEYCODE_S:
            if(player.position.y > -1 &&  !isEnd){
                var z = 0;
                isEnd = true;
                n = setInterval(function(){
                    player.position.y -= playerSpeed;
                    goat.position.y -= playerSpeed;
                    goat.rotation.x += goatRotation;
                    fartEmitter.position.y -= playerSpeed;
                    obstacleEmitter.position.y -= playerSpeed;
                    lifeEmitter.position.y -= playerSpeed;
                    shieldEmitter.position.y -= playerSpeed;
                    taxisignEmitter.position.y -= playerSpeed;
                    z++;
                    if(z == 5){
                        isEnd = false;
                        clearInterval(n);
                    }
                }, ms);
            }
                break;

        }
    }
    });



    //Intervall um die Geschwindigkeit der Hindernisse zu erhöhen
    setInterval(function () {
        secondCount += 1;
    }, 1000);
}

function animate() {
    if (lives > 0) {
        starBehavior();
        obstacleBehavior();
        powerupBehavior();
        jointBehavior();
        //fartBehavior();
        shieldBehavior();
        taxisignBehavior();
        lifeBehavior();
        lavaBehavior();
        backgroundObjectBehaviour();
        setParticleDelta();
    }
    else {
        if (!gameOverVisible) {
            clearInterval(scoretimeout);
          
            highscore();
            var text = document.createElement('p');
            text.innerHTML = 'GAME OVER';
            text.style.position = 'absolute';
            text.style.color = 'white';
            text.style.display = 'block';
            text.style.width = '100%';
            text.style.margin = '0';
            text.style.fontSize = '100px';
            text.style.top = '200px';
            text.style.textAlign = 'center';
            document.body.appendChild(text);
            var restart = document.createElement('a');
            restart.innerHTML = 'Click here to play again';
            restart.href = 'game.html';
            restart.style.textDecoration = 'none';
            restart.style.position = 'absolute';
            restart.style.color = 'white';
            restart.style.display = 'block';
            restart.style.width = '100%';
            restart.style.margin = '0';
            restart.style.fontSize = '20px';
            restart.style.top = '350px';
            restart.style.textAlign = 'center';
            document.body.appendChild(restart);
            gameOverVisible = true;
            adead.play();
            //playSound('./sounds/tot.wav');
        }
    }
    console.log(canCollide);
    requestAnimationFrame(animate);
    renderer.clear();
    renderer.render (scene,camera);
    renderer.clearDepth();
    renderer.render (sceneEnd,camera);
    renderer.setClearColor(0xff0000, 0);
}


function addPlayer() {
    player = new THREE.Mesh(playerGeometry, playerMaterial);
    player.position.z = 2.5;
    player.material.opacity = 0;
    scene.add(player);
}

function addStar() {
    star = new THREE.Mesh(starGeometry, starMaterial);

    star.position.x = Math.random() * 20 - 10;
    star.position.y = Math.random() * 20 - 10;
    star.position.z = -25;

    stars.push(star);
    scene.add(star);

    setTimeout(addStar, starInterval);
}

function starBehavior() {
    stars.forEach(function (star) {
        star.position.z += speed + secondCount * 0.01;
    });
}

function addObstacle() {
    if (obstacleTextureGeometry && obstacleTextureMaterial) {
        obstacle = new THREE.Mesh(obstacleTextureGeometry, obstacleTextureMaterial);

        var randomPositionX = (Math.floor(Math.random() * 3 - 1)) * 2;
        var randomPositionY = Math.floor(Math.random() * 3 - 1);
        var positionZ = -100;

        obstacle.position.x = randomPositionX;
        obstacle.position.y = randomPositionY;
        obstacle.position.z = positionZ;
        obstacle.scale.x = 0.3;
        obstacle.scale.y = 0.3;
        obstacle.scale.z = 0.3;
        obstacles.push(obstacle);
        scene.add(obstacle);

        //transparent Sphere for Collision Detection
        transparentObstacleGeometry = new THREE.SphereGeometry(0.5, 10, 10);
        transparentObstacleMaterial = new THREE.MeshLambertMaterial({color: 0x0000ff, transparent: true, opacity: 0});
        transparentObstacle = new THREE.Mesh(transparentObstacleGeometry, transparentObstacleMaterial);
        transparentObstacle.position.x = randomPositionX;
        transparentObstacle.position.y = randomPositionY;
        transparentObstacle.position.z = positionZ;
        transparentObstacles.push(transparentObstacle);
        scene.add(transparentObstacle);

        if (obstacleInterval > 50) {
            obstacleInterval -= 1;
        }
    }
    setTimeout(addObstacle, obstacleInterval);
}

function obstacleBehavior() {
    obstacles.forEach(function (obstacle) {
        obstacle.rotation.x += Math.random() / 100;
        obstacle.rotation.y += Math.random() / 100;
        obstacle.rotation.z += Math.random() / 100;

        obstacle.position.z += speed + secondCount * 0.01;
        if(obstacle.position.x == 0 && obstacle.position.y == 0 && obstacle.position.z > player.position.z){
            scene.remove(obstacle);
        }});

    transparentObstacles.forEach(function (transparentObstacle) {
        transparentObstacle.position.z += speed + secondCount * 0.01;
        if (transparentObstacle.position.distanceTo(player.position) < transparentObstacle.geometry.parameters.radius + player.geometry.parameters.radius) {
            if (canCollide) {
                canCollide = false;

                lives -= 1;
                aexplode.play();
                if (lives > 1)
                {
                    var rndm = (Math.random() * 2 - 0);
                    if (rndm <= 1)
                    {
                        adamage.play();
                    }
                    else
                    {
                        adamage2.play();
                    }
                }

                obstacleEmitter.alive = 1;
                lifeNumber.innerHTML = 'x' + lives;

                console.log('COLLISION, remaining lives:', lives);

                setTimeout(function () {
                    canCollide = true;
                    obstacleEmitter.alive = 0;
                }, 1000);
            }
        }
    });
}

function addPowerup() {
    if (powerupTextureGeometry && powerupTextureMaterial) {
        powerup = new THREE.Mesh(powerupTextureGeometry, powerupTextureMaterial);

        var randomPositionX = (Math.floor(Math.random() * 3 - 1)) * 2;
        var randomPositionY = Math.floor(Math.random() * 3 - 1);
        var positionZ = -100;

        powerup.position.x = randomPositionX;
        powerup.position.y = randomPositionY;
        powerup.position.z = positionZ;
        powerup.scale.x = 0.5;
        powerup.scale.y = 0.5;
        powerup.scale.z = 0.5;

        powerups.push(powerup);
        scene.add(powerup);

        //transparent Sphere for Collision Detection
        transparentPowerupGeometry = new THREE.SphereGeometry(0.5, 10, 10);
        transparentPowerupMaterial = new THREE.MeshLambertMaterial({color: 0x0000ff, transparent: true, opacity: 0});
        transparentPowerup = new THREE.Mesh(transparentPowerupGeometry, transparentPowerupMaterial);
        transparentPowerup.position.x = randomPositionX;
        transparentPowerup.position.y = randomPositionY;
        transparentPowerup.position.z = positionZ;
        transparentPowerups.push(transparentPowerup);
        scene.add(transparentPowerup);
    }
    setTimeout(addPowerup, powerupInterval);
}

function powerupBehavior() {
    powerups.forEach(function (powerup) {
        powerup.rotation.x += Math.random() / 100;
        powerup.rotation.y += Math.random() / 100;
        powerup.rotation.z += Math.random() / 100;
        powerup.position.z += 0.2;
        
        if(powerup.position.x == 0 && powerup.position.y == 0 && powerup.position.z > player.position.z){
            scene.remove(powerup);
        }});
    
    transparentPowerups.forEach(function (transparentPowerup) {
        transparentPowerup.position.z += 0.2;
        if (transparentPowerup.position.distanceTo(player.position) < transparentPowerup.geometry.parameters.radius + player.geometry.parameters.radius) {
            if (canPickUpPowerup) {
                console.log('POWERUP!');
                afart.play();
                playalong.playbackRate = 1.25;
                canPickUpPowerup = false;

                speed += 0.5;
                //fartMaterial.opacity = 0.25;
                fartEmitter.alive = 1;

                setTimeout(function () {
                    speed -= 0.5;
                    //fartMaterial.opacity = 0;
                    fartEmitter.alive = 0;
                    playalong.playbackRate = 1.0;
                }, 6000);

                setTimeout(function () {
                    canPickUpPowerup = true;
                }, 1000);
            }
        }
    });
}

function addJoint() {
    if (jointTextureGeometry && jointTextureMaterial) {
        joint = new THREE.Mesh(jointTextureGeometry, jointTextureMaterial);

        var randomPositionX = (Math.floor(Math.random() * 3 - 1)) * 2;
        var randomPositionY = Math.floor(Math.random() * 3 - 1);
        var positionZ = -100;

        joint.position.x = randomPositionX;
        joint.position.y = randomPositionY;
        joint.position.z = positionZ;

        joints.push(joint);
        scene.add(joint);

        //transparent Sphere for Collision Detection
        transparentJointGeometry = new THREE.SphereGeometry(0.5, 10, 10);
        transparentJointMaterial = new THREE.MeshLambertMaterial({color: 0x0000ff, transparent: true, opacity: 0});
        transparentJoint = new THREE.Mesh(transparentJointGeometry, transparentJointMaterial);
        transparentJoint.position.x = randomPositionX;
        transparentJoint.position.y = randomPositionY;
        transparentJoint.position.z = positionZ;
        transparentJoints.push(transparentJoint);
        scene.add(transparentJoint);
    }
    setTimeout(addJoint, jointInterval);
}

function jointBehavior() {
    joints.forEach(function (joint) {
        joint.rotation.x += Math.random() / 100;
        joint.rotation.y += Math.random() / 100;
        joint.rotation.z += Math.random() / 100;
        joint.position.z += 0.2;
        
        if(joint.position.x == 0 && joint.position.y == 0 && joint.position.z > player.position.z){
            scene.remove(joint);
        }});
    
    transparentJoints.forEach(function (transparentJoint) {
        transparentJoint.position.z += 0.2;
        if (transparentJoint.position.distanceTo(player.position) < transparentJoint.geometry.parameters.radius + player.geometry.parameters.radius) {
            if (canPickUpPowerup) {
                console.log('JOINT!');
                canPickUpPowerup = false;
                amoo.play();
                playalong.playbackRate = 0.75;
                smokeEmitter.alive = 1;

                safeSecondCount = secondCount;
                secondCount = 0;
                goat.material.map = THREE.ImageUtils.loadTexture('models/cow_texture.jpg');

                setTimeout(function () {
                    secondCount = safeSecondCount;
                    goat.material.map = THREE.ImageUtils.loadTexture('models/goat_texture.jpg');
                    playalong.playbackRate = 1.0;
                }, 6000);

                setTimeout(function () {
                    canPickUpPowerup = true;
                    smokeEmitter.alive = 0;
                }, 1000);
            }
        }
    });
}

//function addFart(){
//    fart = new THREE.Mesh(fartGeometry, fartMaterial);
//
//    fart.position.z = 3;
//    fart.position.y = -0.1;
//    fart.scale.x = 0.8;
//
//    scene.add(fart);
//}
//
//function fartBehavior(){
//    fart.rotation.z += 0.1;
//    fart.rotation.x += 0.1;
//}

function addFartParticleEmitter() {
    fartEmitter = new SPE.Emitter({
        type: 'cube',
        particleCount: 100,
        position: new THREE.Vector3(0, -0.1, 3.3),
        acceleration: new THREE.Vector3(0, 0, 2),
        accelerationSpread: new THREE.Vector3(0.1, 0.1, 0),
        sizeStart: 1.2,
        sizeEnd: 0,
        colorStart: new THREE.Color(0x40a700),
        colorStartSpread: new THREE.Vector3(0, 1, 0.1),
        colorMiddle: new THREE.Color(0xfff89f),
        colorMiddleSpread: new THREE.Vector3(0, 1, 0.1),
        colorEnd: new THREE.Color(0xffffff),
        colorEndSpread: new THREE.Vector3(0, 1, 0.1),
        opacityStart: 0.8,
        opacityEnd: 0.5,
        duration: null,
        alive: 0,
    });

    fartParticleGroup.addEmitter(fartEmitter);
    //scene.add(fartParticleGroup.mesh);
}

function addUfoParticleEmitter() {
    ufoEmitter = new SPE.Emitter({
        type: 'cube',
        particleCount: 200,
        position: new THREE.Vector3(-1, -1, -5),
        acceleration: new THREE.Vector3(0, 0, 0),
        velocity: new THREE.Vector3(0, -8, 0),
        accelerationSpread: new THREE.Vector3(0, 0, 0),
        sizeStart: 3,
        sizeEnd: 0,
        colorStart: new THREE.Color(0x66b6ff),
        colorMiddle: new THREE.Color(0xa8adff),
        colorEnd: new THREE.Color(0xdae4ff),
        opacityStart: 0.5,
        opacityEnd: 0,
        duration: null,
        alive: 0
    });

    ufoParticleGroup.addEmitter(ufoEmitter);
    scene.add(ufoParticleGroup.mesh);
}

function addTaxiParticleEmitter() {
    taxiEmitter1 = new SPE.Emitter({
        type: 'cube',
        particleCount: 700,
        position: new THREE.Vector3(-1, -1, -1),
        acceleration: new THREE.Vector3(0, 0, 2),
        velocity: new THREE.Vector3(0, 0, 0),
        accelerationSpread: new THREE.Vector3(0, 0, 0),
        sizeStart: 1,
        sizeEnd: 0,
        colorStart: new THREE.Color(0x66b6ff),
        colorMiddle: new THREE.Color(0xa8adff),
        colorEnd: new THREE.Color(0xdae4ff),
        opacityStart: 0.1,
        opacityEnd: 0,
        duration: null,
        alive: 0
    });

    taxiEmitter2 = new SPE.Emitter({
        type: 'cube',
        particleCount: 700,
        position: new THREE.Vector3(-2, -1, -1),
        acceleration: new THREE.Vector3(0, 0, 2),
        velocity: new THREE.Vector3(0, 0, 0),
        accelerationSpread: new THREE.Vector3(0, 0, 0),
        sizeStart: 1,
        sizeEnd: 0,
        colorStart: new THREE.Color(0x66b6ff),
        colorMiddle: new THREE.Color(0xa8adff),
        colorEnd: new THREE.Color(0xdae4ff),
        opacityStart: 0.1,
        opacityEnd: 0,
        duration: null,
        alive: 0
    });

    taxiParticleGroup.addEmitter(taxiEmitter1);
    taxiParticleGroup.addEmitter(taxiEmitter2);
    scene.add(taxiParticleGroup.mesh);
}

function addLifeParticleEmitter() {
    lifeEmitter = new SPE.Emitter({
        type: 'cube',
        particleCount: 1500,
        position: new THREE.Vector3(0, 0, 2.4),
        acceleration: new THREE.Vector3(0, 0, 20),
        accelerationSpread: new THREE.Vector3(40, 40, 0),
        velocity: new THREE.Vector3(0, 0, 12),
        velocitySpread: new THREE.Vector3(10, 10, 0),
        sizeStart: 0.2,
        sizeStartSpread: 0.5,
        sizeEnd: 0.3,
        //colorStart: new THREE.Color(0xffee99),
        colorStart: new THREE.Color(0xff2f39),
        opacityStart: 1,
        opacityEnd: 0,
        duration: 0.4,
        alive: 0
    });

    fartParticleGroup.addEmitter(lifeEmitter);
}

function addShieldParticleEmitter() {
    shieldEmitter = new SPE.Emitter({
        type: 'cube',
        particleCount: 1500,
        position: new THREE.Vector3(0, 0, 2.4),
        acceleration: new THREE.Vector3(0, 0, 20),
        accelerationSpread: new THREE.Vector3(40, 40, 0),
        velocity: new THREE.Vector3(0, 0, 12),
        velocitySpread: new THREE.Vector3(10, 10, 0),
        sizeStart: 0.4,
        sizeStartSpread: 0.5,
        sizeEnd: 0.3,
        colorStart: new THREE.Color(0x1f39ff),
        colorMiddle: new THREE.Color(0x93a6ff),
        colorEnd: new THREE.Color(0xd3daff),
        opacityStart: 1,
        opacityEnd: 0,
        duration: 0.4,
        alive: 0
    });

    fartParticleGroup.addEmitter(shieldEmitter);
}

function addTaxisignParticleEmitter() {
    taxisignEmitter = new SPE.Emitter({
        type: 'cube',
        particleCount: 1500,
        position: new THREE.Vector3(0, 0, 2.4),
        acceleration: new THREE.Vector3(0, 0, 20),
        accelerationSpread: new THREE.Vector3(40, 40, 0),
        velocity: new THREE.Vector3(0, 0, 12),
        velocitySpread: new THREE.Vector3(10, 10, 0),
        sizeStart: 0.6,
        sizeStartSpread: 0.8,
        sizeEnd: 0.3,
        colorStart: new THREE.Color(0xe7d100),
        opacityStart: 1,
        opacityEnd: 0,
        duration: 0.4,
        alive: 0
    });

    fartParticleGroup.addEmitter(taxisignEmitter);
}

function addObstacleParticleEmitter() {
    obstacleEmitter = new SPE.Emitter({
        type: 'sphere',
        position: new THREE.Vector3(0, 0, 1.5),
        positionSpread: new THREE.Vector3(1, 1, 1),
        radius: 0.1,
        speed: 30,
        sizeStart: 2,
        sizeStartSpread: 3,
        sizeEnd: 1,
        opacityStart: 1,
        opacityEnd: 0,
        colorStart: new THREE.Color(0x333333),
        colorStartSpread: new THREE.Vector3(0, 0, 0),
        colorEnd: new THREE.Color(0x333333),
        particleCount: 50,
        alive: 0,
        duration: 0.2
    });

    obstacleParticleGroup.addEmitter(obstacleEmitter);
    scene.add(obstacleParticleGroup.mesh);
}

function addCloudParticleEmitter() {
    cloudEmitter = new SPE.Emitter({
        position: new THREE.Vector3(0, 0, 0),
        positionSpread: new THREE.Vector3(30, 10, 5),
        colorStart: new THREE.Color('black'),
        colorStartSpread: new THREE.Vector3(0.7, 0.7, 0.7),
        colorEnd: new THREE.Color('black'),
        sizeStart: 100,
        sizeSpread: 10,
        //Falls es nicht dicht genug ist erhoehe die Opacity Start und End
        opacityStart: 0.3,
        opacityMiddle: 1,
        opacityEnd: 0.3,
        particleCount: 50
    });

    cloudParticleGroup.addEmitter(cloudEmitter);
    //In der folgenden Zeile wird die Z-Position verstellt
    cloudParticleGroup.mesh.position.z = -99;
    scene.add(cloudParticleGroup.mesh);
}

function addSmokeParticleEmitter() {
    smokeEmitter = new SPE.Emitter( {
        type: 'cube',
        particleCount: 1,
        position: new THREE.Vector3( 0, 0, 0 ),
        acceleration: new THREE.Vector3( 0, 0, 1.1 ),
        velocity: new THREE.Vector3( 0, 0, 0.8 ),
        sizeStart: 50,
        sizeEnd: 50,
        colorStart: new THREE.Color( 0xdeffbc ),
        colorMiddle: new THREE.Color( 0xe6ffc2 ),
        colorEnd: new THREE.Color( 0xffffff ),
        opacityStart: 0,
        opacityMiddle: 1,
        opacityEnd: 0,
        duration: 1,
        alive: 0,
    } );

    smokeParticleGroup.addEmitter( smokeEmitter );
    scene.add(smokeParticleGroup.mesh);
}

function setParticleDelta()
{
    particleDelta = clock.getDelta();
    fartParticleGroup.tick(particleDelta);
    obstacleParticleGroup.tick(particleDelta);
    cloudParticleGroup.tick(particleDelta);
    smokeParticleGroup.tick(particleDelta);
    ufoParticleGroup.tick(particleDelta);
    taxiParticleGroup.tick(particleDelta);
}

function addShield() {
    shield = new THREE.Mesh(shieldGeometry, shieldMaterial);
    var randomPositionX = (Math.floor(Math.random() * 3 - 1)) * 2;
    var randomPositionY = Math.floor(Math.random() * 3 - 1);
    var positionZ = -100;

    shield.position.x = randomPositionX;
    shield.position.y = randomPositionY;
    shield.position.z = positionZ;

    shields.push(shield);
    scene.add(shield);

    setTimeout(addShield, shieldInterval);
}

function shieldBehavior() {
    shields.forEach(function (shield) {
        shield.position.z += 0.2;
        if(shield.position.x == 0 && shield.position.y == 0 && shield.position.z > player.position.z){
            scene.remove(shield);
        };

        if (shield.position.distanceTo(player.position) < shield.geometry.parameters.radius + player.geometry.parameters.radius) {
            if (canPickUpPowerup) {
                console.log('SHIELD!');
                canPickUpPowerup = false;
                ashield.play();
                canCollide = false;
                playerMaterial.opacity = 0.8;
                shieldEmitter.alive = 1;

                setTimeout(function () {

                    canCollide = true;
                    playerMaterial.opacity = 0;
                    shieldEmitter.alive = 0;
                }, 6000);

                setTimeout(function () {
                    canPickUpPowerup = true;
                }, 1000);
            }
        }
    });
}

function addTaxisign() {
    if (taxisignTextureGeometry && taxisignTextureMaterial) {
        taxisign = new THREE.Mesh(taxisignTextureGeometry, taxisignTextureMaterial);

        var randomPositionX = (Math.floor(Math.random() * 3 - 1)) * 2;
        var randomPositionY = Math.floor(Math.random() * 3 - 1);
        var positionZ = -100;

        taxisign.position.x = randomPositionX;
        taxisign.position.y = randomPositionY;
        taxisign.position.z = positionZ;
        taxisign.scale.x = 0.5;
        taxisign.scale.y = 0.5;
        taxisign.scale.z = 0.5;

        taxisigns.push(taxisign);
        scene.add(taxisign);

        //transparent Sphere for Collision Detection
        transparentTaxisignGeometry = new THREE.SphereGeometry(0.5, 10, 10);
        transparentTaxisignMaterial = new THREE.MeshLambertMaterial({color: 0x0000ff, transparent: true, opacity: 0});
        transparentTaxisign = new THREE.Mesh(transparentTaxisignGeometry, transparentTaxisignMaterial);
        transparentTaxisign.position.x = randomPositionX;
        transparentTaxisign.position.y = randomPositionY;
        transparentTaxisign.position.z = positionZ;
        transparentTaxisigns.push(transparentTaxisign);
        scene.add(transparentTaxisign);
    }

    setTimeout(addTaxisign, taxisignInterval);
}

function taxisignBehavior() {
    taxisigns.forEach(function (taxisign) {
        taxisign.rotation.y += 0.1;
        taxisign.position.z += 0.2;
        if(taxisign.position.x == 0 && taxisign.position.y == 0 && taxisign.position.z > player.position.z){
            scene.remove(taxisign);
        }});
    
    transparentTaxisigns.forEach(function (transparentTaxisign) {
        transparentTaxisign.position.z += 0.2;
        if (transparentTaxisign.position.distanceTo(player.position) < transparentTaxisign.geometry.parameters.radius + player.geometry.parameters.radius) {
            if (canPickUpPowerup) {
				ataxi.play();
                console.log('TAXISIGN!');
                canPickUpPowerup = false;
                //canCollide = false;
                player.position.x += 10;
                taxisignEmitter.alive = 1;
                addSpacetaxi();
                speed += 1;

                setTimeout(function () {
                    taxiMove();
                    speed -= 1;
                    scene.add(goat);
                    //scene.add(player);


                    setTimeout(function(){
                        scene.remove(spacetaxi);
                    },2000);

                    taxisignEmitter.alive = 0;
                    

                }, 8000);

                setTimeout(function () {
                    canPickUpPowerup = true;
                    //canCollide = true;
                    player.position.x -= 10;
                }, 10000);
            }
        }
    });
}

function addSpacetaxi() {

    spacetaxi = new THREE.Mesh(spacetaxiTextureGeometry, spacetaxiTextureMaterial);
    taxiEmitter1.alive = 1;
    taxiEmitter2.alive = 1;

    spacetaxi = new THREE.Mesh(spacetaxiTextureGeometry, spacetaxiTextureMaterial);

    spacetaxi.position.x = -10;
    taxiEmitter1.position.x = spacetaxi.position.x +1;
    taxiEmitter2.position.x = spacetaxi.position.x -1;

    spacetaxi.position.y = -7;
    taxiEmitter1.position.y = spacetaxi.position.y-0.15;
    taxiEmitter2.position.y = spacetaxi.position.y-0.15;

    spacetaxi.position.z = +1;
    taxiEmitter1.position.z = spacetaxi.position.z+1.7;
    taxiEmitter2.position.z = spacetaxi.position.z+1.7;

    scene.add(spacetaxi);
    spacetaxiBehavior();

}

function spacetaxiBehavior(){

    var taxiSpeedx = 0.2;
    var taxiSpeedy = 0.1
    var taxiSpeedz = 0.04;
      

    var q = setInterval(function(){

        spacetaxi.position.x += taxiSpeedx;
        taxiEmitter1.position.x = spacetaxi.position.x +1;
        taxiEmitter2.position.x = spacetaxi.position.x -1;

        spacetaxi.position.y += taxiSpeedy;
        taxiEmitter1.position.y = spacetaxi.position.y-0.15;
        taxiEmitter2.position.y = spacetaxi.position.y-0.15;

        spacetaxi.position.z -= taxiSpeedz;
        taxiEmitter1.position.z = spacetaxi.position.z+1.7;
        taxiEmitter2.position.z = spacetaxi.position.z+1.7;

        scene.remove(goat);
        //scene.remove(player);
                                    
        if(spacetaxi.position.x >= 4){
                console.log("bewegungR");
                clearInterval(q);
        }
        
    }, 10);

}

function taxiMove(){

    var taxiSpeed = 0.8;

    var q = setInterval(function(){

        spacetaxi.position.z -= taxiSpeed;    
        taxiEmitter1.position.z = spacetaxi.position.z+1.7;
        taxiEmitter2.position.z = spacetaxi.position.z+1.7;      
        
            if(spacetaxi.position.z <= -100){
                taxiEmitter1.alive = 0;
                taxiEmitter2.alive = 0;
                clearInterval(q);
            }
    }, 10);
}

function addLife() {
    if (lifeTextureGeometry && lifeTextureMaterial) {
        life = new THREE.Mesh(lifeTextureGeometry, lifeTextureMaterial);

        var randomPositionX = (Math.floor(Math.random() * 3 - 1)) * 2;
        var randomPositionY = Math.floor(Math.random() * 3 - 1);
        var positionZ = -100;

        life.position.x = randomPositionX;
        life.position.y = randomPositionY;
        life.position.z = positionZ;
        life.scale.x = 0.5;
        life.scale.y = 0.5;
        life.scale.z = 0.5;

        lifes.push(life);
        scene.add(life);

        //transparent Sphere for Collision Detection
        transparentLifeGeometry = new THREE.SphereGeometry(0.5, 10, 10);
        transparentLifeMaterial = new THREE.MeshLambertMaterial({color: 0x0000ff, transparent: true, opacity: 0});
        transparentLife = new THREE.Mesh(transparentLifeGeometry, transparentLifeMaterial);
        transparentLife.position.x = randomPositionX;
        transparentLife.position.y = randomPositionY;
        transparentLife.position.z = positionZ;
        transparentLifes.push(transparentLife);
        scene.add(transparentLife);
    }
    setTimeout(addLife, lifeInterval);
}

function lifeBehavior() {
    lifes.forEach(function (life) {
        life.rotation.y += 0.1;
        life.position.z += 0.2;
        if(life.position.x == 0 && life.position.y == 0 && life.position.z > player.position.z){
            scene.remove(life);
        }});
    
    transparentLifes.forEach(function (transparentLife) {
        transparentLife.position.z += 0.2;
        if (transparentLife.position.distanceTo(player.position) < transparentLife.geometry.parameters.radius + player.geometry.parameters.radius) {
            if (canPickUpPowerup && lives < 9) {
                canPickUpPowerup = false;
                acoin.play();
                lifeEmitter.alive = 1;
                lives += 1;
                lifeNumber.innerHTML = 'x' + lives;

                console.log('LIFE UP, remaining lives:', lives);

                setTimeout(function () {
                    canPickUpPowerup = true;
                    lifeEmitter.alive = 0;
                }, 1000);
            }
        }
    });
}

function addLava() {
    if (lavaLasting > 0) {
        lava = new THREE.Mesh(lavaGeometry, lavaMaterial);

        var lavaSize = Math.random();

        lava.scale.x = lavaSize;
        lava.scale.y = lavaSize;
        lava.scale.z = lavaSize;
        lava.position.x = Math.random() * 20 - 10;
        lava.position.y = Math.random() * 20 - 10;
        lava.position.z = 10;

        lavaArray.push(lava);

        scene.add(lava);

        setTimeout(addLava, lavaInterval);
        lavaLasting -= 1;
    }
}

function lavaBehavior() {
    lavaArray.forEach(function (lava) {
        lava.rotation.x += Math.random() / 10;
        lava.rotation.y += Math.random() / 10;
        lava.rotation.z += Math.random() / 10;
        lava.position.z -= 0.5;
    });
}


// Background Objects

function addBackgroundObject(object)
{
    ufoEmitter.alive = 0;
    if(object.model)
    {
        backgroundObjectGeometrie = ufoGeometry;
        backgroundObjectMaterial = new THREE.MeshLambertMaterial();
        backgroundObjectMaterial.map = THREE.ImageUtils.loadTexture(object.tex);
        ufoEmitter.alive = 1;
    }
    else
    {
        backgroundObjectGeometrie = new THREE.SphereGeometry(object.geo, 32, 32);

        if (object.tex == "sunmap.jpg")
        {
            backgroundObjectMaterial = new THREE.MeshBasicMaterial();
        }
        else
        {
            backgroundObjectMaterial = new THREE.MeshPhongMaterial();
        }

    }
    
    backgroundObjectMaterial.map = THREE.ImageUtils.loadTexture(object.tex);
    backgroundObjectMaterial.transparent = true;
    backgroundObjectMaterial.opacity = 0;
    
    if (object.bump != "0")
    {
        backgroundObjectMaterial.bumpMap = THREE.ImageUtils.loadTexture(object.bump);
        backgroundObjectMaterial.bumpScale = 1;
    }

    backgroundObjectMesh = new THREE.Mesh(backgroundObjectGeometrie, backgroundObjectMaterial);
    backgroundObjectMesh.position.x = object.x;
    backgroundObjectMesh.position.y = object.y;
    backgroundObjectMesh.position.z = -1000;
    
    ufoEmitter.position.x = backgroundObjectMesh.position.x;
    ufoEmitter.position.y = backgroundObjectMesh.position.y-0.5;

    //Set Speed
    backgroundObjectMesh.speed = object.speed;

    //set Rotation
    backgroundObjectMesh.rotationSpeed = object.rotationSpeed;
    backgroundObjectMesh.rotationAxis =  object.rotationAxis;

    //addBackgroundObjectText(object.x, object.y, -1000);
    scene.add(backgroundObjectMesh);
}

function randomBackgroundObject()
{
    //random objects
    // planet textures from http://planetpixelemporium.com/planets.html and http://www.texturesforplanets.com/texture-packs.shtml (modified)

    var objects = [
        {geo: 40, tex: "models/backgroundObjects/planet_1.jpg", bump: "0"},
        {geo: 30, tex: "models/backgroundObjects/planet_2.jpg", bump: "0"},
        {geo: 60, tex: "models/backgroundObjects/planet_3.jpg", bump: "0"},
        {geo: 45, tex: "models/backgroundObjects/planet_4.jpg", bump: "0"},
        {geo: -7,tex: "models/backgroundObjects/ufo_texture.jpg", bump: "0", model: true, mesh:"models/backgroundObjects/ufo.json", rotationAxis:1},
        {geo: 100, tex: "models/backgroundObjects/jupitermap.jpg", bump: "0"},
        {geo: 45, tex: "models/backgroundObjects/mars_1k_color.jpg", bump: "models/backgroundObjects/marsbump1k.jpg"},
        {geo: 40, tex: "models/backgroundObjects/mercurymap.jpg", bump: "0"},
        {geo: 65, tex: "models/backgroundObjects/planet_5.jpg", bump: "0"},
        {geo: -7,tex: "models/backgroundObjects/ufo_texture.jpg", bump: "0", model: true, mesh:"models/backgroundObjects/ufo.json", rotationAxis:1},
        {geo: 55, tex: "models/backgroundObjects/planet_6.jpg", bump: "0"},
        {geo: 35, tex: "models/backgroundObjects/planet_7.jpg", bump: "0"},
        {geo: 75, tex: "models/backgroundObjects/planet_8.jpg", bump: "0"},
        {geo: 70, tex: "models/backgroundObjects/neptunemap.jpg", bump: "0"},
        {geo: 40, tex: "models/backgroundObjects/plutomap1k.jpg", bump: "models/backgroundObjects/plutobump1k.jpg"},
        {geo: 80, tex: "models/backgroundObjects/saturnmap.jpg", bump: "0"},
        {geo: 80, tex: "models/backgroundObjects/uranusmap.jpg", bump: "0"},
        {geo: -7,tex: "models/backgroundObjects/ufo_texture.jpg", bump: "0", model: true, mesh:"models/backgroundObjects/ufo.json", rotationAxis:1},
        {geo: 80, tex: "models/backgroundObjects/venusmap.jpg", bump: "models/backgroundObjects/venusbump.jpg"},
        {geo: 45, tex: "models/backgroundObjects/planet_9.jpg", bump: "0"},
        {geo: 50, tex: "models/backgroundObjects/planet_10.jpg", bump: "0"},
        {geo: 60, tex: "models/backgroundObjects/planet_11.jpg", bump: "0"},
        {geo: 40, tex: "models/backgroundObjects/planet_12.jpg", bump: "0"},
        {geo: 150, tex: "models/backgroundObjects/sunmap.jpg", bump: "0"},
        {geo: 30, tex: "models/backgroundObjects/moonmap1k.jpg", bump: "models/backgroundObjects/moonbump1k.jpg"},
    ];

    var randomObject;

    //random positions
    if(firstRun == true)
    {
        randomObject = objects[4];
        randomObject.speed = 100;
        firstRun = false;
    } 
    else
    {
        randomObject = objects[Math.floor((Math.random() * 23))];
        randomObject.speed = 0.5;
    }
    
    var geoP = randomObject.geo / 1.2;

    var positionsX = [  -15 - geoP, 
                        -15 - geoP, 
                         15 + geoP,
                         15 + geoP,
                        -40 - geoP,
                         40 + geoP,
                          0, 
                          0 
                      ];
    var positionsY = [   10 + geoP, 
                        -12 - geoP,  
                         10 + geoP,  
                        -12 - geoP,
                          0,
                          0,
                         45 + geoP, 
                        -45 - geoP
                    ];
                    
    if(randomObject.model)
    {
        var randomPosition = Math.floor((Math.random() * 4));
    }
    else
    {
        var randomPosition = Math.floor((Math.random() * 8));
    }

    //console.log(positionsX[randomPosition] + " " + positionsY[randomPosition]);
    randomObject.x = positionsX[randomPosition];
    randomObject.y = positionsY[randomPosition];

    //random rotation
    randomObject.rotationSpeed = Math.random() * (0.015 - 0.001) + 0.001;
    if(typeof randomObject.rotationAxis === 'undefined')
    {
        randomObject.rotationAxis = Math.floor((Math.random() * 6));
    }
    
    return randomObject;
}

function backgroundObjectBehaviour()
{
    if (typeof backgroundObjectMesh === 'undefined')
    {
        addBackgroundObject(randomBackgroundObject());
        ufoEmitter.alive = 0;
    }
    else if (backgroundObjectMesh.position.z > camera.position.z + 70)
    {
        scene.remove(backgroundObjectMesh);
        addBackgroundObject(randomBackgroundObject());
    }

    if(backgroundObjectMaterial.opacity < 1)
    {
        backgroundObjectMaterial.opacity += 1 / 256;
    }

    switch (backgroundObjectMesh.rotationAxis)
    {
        case 0:
            backgroundObjectMesh.rotation.x += backgroundObjectMesh.rotationSpeed;
            break;
        case 1:
            backgroundObjectMesh.rotation.y += backgroundObjectMesh.rotationSpeed;
            break;
        case 2:
            backgroundObjectMesh.rotation.z += backgroundObjectMesh.rotationSpeed;
            break;
        case 3:
            backgroundObjectMesh.rotation.x -= backgroundObjectMesh.rotationSpeed;
            break;
        case 4:
            backgroundObjectMesh.rotation.y -= backgroundObjectMesh.rotationSpeed;
            break;
        case 5:
            backgroundObjectMesh.rotation.x -= backgroundObjectMesh.rotationSpeed;
            break;
    }

    backgroundObjectMesh.position.z += backgroundObjectMesh.speed;
    ufoEmitter.position.z = backgroundObjectMesh.position.z;
}

function startScore() 
{
    //Start score
    scoretimeout = setInterval("countScore()", 300); 
}

function countScore()
{
    //Stopp score
    scene.remove(textCounter);
    //console.log("jetzt");
    counterString = parseInt(scoretimer);
    createCounter();
    scoretimer = scoretimer + 1; 
}

function highscore()
{
    scoretimer=scoretimer-1;
    if (scoretimer > localStorage.getItem("highscore")) 
    {
        localStorage.setItem("highscore", scoretimer);
        highscoreString=parseInt(scoretimer);
        scene.remove(textCounter);
        createHighscoreText();
        createHighscore();

    }
    else
    {
        scoreString=parseInt(scoretimer);
        scene.remove(textCounter);
        createScoreText();    
        createScore();    

    }
}

function createCounter()
{
    var textGeom = new THREE.TextGeometry(counterString, { 
        size: 0.8, 
        height: 0.1, 
        curveSegments: 12,
        font: "arcade normal", 
        weight: "normal", 
        style: "normal",
        bevelThickness: 1, 
        bevelSize: 0.1, 
        bevelEnabled: false,
        material: 0, 
        extrudeMaterial: 0.1
    });
    
    var material = new THREE.MeshPhongMaterial({ color: 0xffffff });
   
    textCounter = new THREE.Mesh( textGeom, material );
    textCounter.position.z = -5;
    textCounter.position.x = -14;
    textCounter.position.y = -6;
    textCounter.rotation.y = 0;
 
    scene.add( textCounter );
}

function createScoreText()
{
    var textGeom = new THREE.TextGeometry( "Your Score:", { 

        size: 0.45, 
        height: 0.2, 
        curveSegments: 12,
        font: "arcade normal", 
        weight: "normal", 
        style: "normal",
        bevelThickness: 1, 
        bevelSize: 0.1, 
        bevelEnabled: false,
        material: 0, 
        extrudeMaterial: 0.1
    });
    var material = new THREE.MeshPhongMaterial({ color: 0xffffff });
   
    textScore1 = new THREE.Mesh( textGeom, material );
    textScore1.position.z = 1;
    textScore1.position.x = -3;
    textScore1.position.y = -1.5;   
    textScore1.rotation.y = 0;

    sceneEnd.add( textScore1 );
}

function createScore()
{
    var textGeom = new THREE.TextGeometry( scoreString, { 

        size: 0.45, 
        height: 0.2, 
        curveSegments: 12,
        font: "arcade normal", 
        weight: "normal", 
        style: "normal",
        bevelThickness: 1, 
        bevelSize: 0.1, 
        bevelEnabled: false,
        material: 0, 
        extrudeMaterial: 0.1
    });
    var material = new THREE.MeshPhongMaterial({ color: 0xffffff });
   
    textScore2 = new THREE.Mesh( textGeom, material );
    textScore2.position.z = 1;
    textScore2.position.x = -3;
    textScore2.position.y = -2.5;   
    textScore2.rotation.y = 0;

    sceneEnd.add( textScore2 );
}

function createHighscoreText()
{
    var textGeom = new THREE.TextGeometry( "New Highscore:", { 

        size: 0.45, 
        height: 0.2, 
        curveSegments: 12,
        font: "arcade normal", 
        weight: "normal", 
        style: "normal",
        bevelThickness: 1, 
        bevelSize: 0.1, 
        bevelEnabled: false,
        material: 0, 
        extrudeMaterial: 0.1
    });
    var material = new THREE.MeshPhongMaterial({ color: 0xffffff });
   
    textHighscore1 = new THREE.Mesh( textGeom, material );
    textHighscore1.position.z = 1;
    textHighscore1.position.x = -4.2;
    textHighscore1.position.y = -1.5;
    textHighscore1.rotation.y = 0;

    sceneEnd.add( textHighscore1 );
}

function createHighscore()
{
    var textGeom = new THREE.TextGeometry( highscoreString, { 

        size: 0.45, 
        height: 0.2, 
        curveSegments: 12,
        font: "arcade normal", 
        weight: "normal", 
        style: "normal",
        bevelThickness: 1, 
        bevelSize: 0.1, 
        bevelEnabled: false,
        material: 0, 
        extrudeMaterial: 0.1
    });
    var material = new THREE.MeshPhongMaterial({ color: 0xffffff });
   
    textHighscore2 = new THREE.Mesh( textGeom, material );
    textHighscore2.position.z = 1;
    textHighscore2.position.x = -4.2;
    textHighscore2.position.y = -2.5;
    textHighscore2.rotation.y = 0;

    sceneEnd.add( textHighscore2 );
}