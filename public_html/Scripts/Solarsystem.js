var renderer;
var scene;
var camera;
var pointlight;

var timeperiod;
var orbittime;

var frametimestart;
var frameactual;
var frames;

var sun,
        mercury,
        wenus,
        ziemia,
        mars,
        jowisz,
        saturn,
        uran,
        neptun;

var mercury_axis,
        wenus_axis,
        ziemia_axis,
        mars_axis,
        jowisz_axis,
        saturn_axis,
        uran_axis,
        neptun_axis;

var sphereMaterial =
            new THREE.MeshLambertMaterial({
                color: "blue"
            });
 var sphereMaterial2 =
            new THREE.MeshLambertMaterial({
                color: 0xD84901
            });           
var sun_material=sphereMaterial2,
        mercury_material=sphereMaterial,
        wenus_material=sphereMaterial,
        ziemia_material=sphereMaterial,
        mars_material=sphereMaterial,
        jowisz_material=sphereMaterial,
        saturn_material=sphereMaterial,
        uran_material=sphereMaterial,
        neptun_material=sphereMaterial;
function create_renderer(width, height) {
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    return renderer;
}

function create_material(texturejpg){
   var texture = THREE.TextureLoader(texturejpg),
   material = new THREE.MeshBasicMaterial({map: texture});
   return material;
   
}

function create_camera(){
    var camera = new THREE.PerspectiveCamera()
    return camera;
}
function create_scene() {
    var scene = new THREE.Scene();
    return scene;
}
function create_pointlight(x, y, z, intensity, distance) {
    var pointLight = new THREE.PointLight(0xF8D898);
    //pointlight posiition 
    pointLight.position.x = 10
    pointLight.position.y = 0;
    pointLight.position.z = 1000;
    pointLight.intensity = 5;
    pointLight.distance = 10000;
    return pointLight;
}

function create_planet(name, radius, segments, rings, material) {
    var planet = new THREE.Mesh(new THREE.SphereGeometry(radius, segments, rings), material);
    planet.name = name;
    return planet;
}

function create_orbit_axis(material) {
    var cube = new THREE.Mesh(new THREE.BoxBufferGeometry(2, 2, 2), material);
    return cube;
}

function setup_planet(){
    sun=create_planet("sun",69.5,20,20,sun_material);
    //no orbit to sun
    mercury=create_planet("mercury",0.5,10,10,mercury_material);
    mercury_axis=create_orbit_axis(new THREE.MeshLambertMaterial({color: 0xD43401}));
    mercury.position.x+=100;
    
    wenus=create_planet("wenus",1.2,10,10,wenus_material);
    wenus_axis=create_orbit_axis(new THREE.MeshLambertMaterial({color: 0xD43401}));
    wenus.position.x+=120;
    
    ziemia=create_planet("ziemia",1.2,10,10,ziemia_material);
    ziemia_axis=create_orbit_axis(new THREE.MeshLambertMaterial({color: 0xD43401}))
    ziemia.position.x+=140;
    
    mars=create_planet("mars",0.6,10,10,mars_material);
    mars_axis=create_orbit_axis(new THREE.MeshLambertMaterial({color: 0xD43401}))
    mars.position.x+=150;
    
    jowisz=create_planet("jowisz",6.911,10,10,jowisz_material);
    jowisz_axis=create_orbit_axis(new THREE.MeshLambertMaterial({color: 0xD43401}))
    jowisz.position.x+=170;
    
    saturn=create_planet("saturn",12,10,10,saturn_material);
    saturn_axis=create_orbit_axis(new THREE.MeshLambertMaterial({color: 0xD43401}))  
    saturn.position.x+=200;
    
    uran=create_planet("uran",5.1,10,10,uran_material);
    uran_axis=create_orbit_axis(new THREE.MeshLambertMaterial({color: 0xD43401}))
    uran.position.x+=235;
    
    neptun=create_planet("neptun",4.9528,10,10,neptun_material);
    neptun_axis=create_orbit_axis(new THREE.MeshLambertMaterial({color: 0xD43401}))
    neptun.position.x+=250;
}
function scene_setup(){
    renderer=create_renderer(1280,720);
    scene=create_scene();
    camera=create_camera();
    pointlight=create_pointlight(0,0,0,0,0);
    var c = document.getElementById("gameCanvas");
    c.appendChild(renderer.domElement);
   // material_setup();
    setup_planet();
    add_planetsToScene();
    timeperiod=Date.now();
    frametimestart=Date.now();
    frameactual=Date.now();
    
    draw();
}
function material_setup(){
    sun_material=create_material("textures/slonce_texture.jpg");
    mercury_material=create_material("textures/mercury_texture.jpg");
    wenus_material=create_material("textures/wenus_texture.jpg");
    ziemia_material=create_material("textures/ziemia_texture.jpg");
    mars_material=create_material("textures/mars_texture.jpg");
    jowisz_material=create_material("textures/jupiter_texture.png");
    saturn_material=create_material("textures/saturn_texture.jpg");
    uran_material=create_material("textures/uran_texture.jpg");
    neptun_material=create_material("textures/neptun_texture.jpg");
}
function add_planetsToScene(){
    scene.add(sun);
    mercury_axis.add(mercury);
    scene.add(mercury_axis);
    wenus_axis.add(wenus);
    scene.add(wenus_axis);
    ziemia_axis.add(ziemia);
    scene.add(ziemia_axis);
    mars_axis.add(mars);
    scene.add(mars_axis);
    jowisz_axis.add(jowisz);
    scene.add(jowisz_axis);
    saturn_axis.add(saturn);
    scene.add(saturn_axis);
    uran_axis.add(uran)
    scene.add(uran_axis);
    neptun_axis.add(neptun);
    scene.add(neptun_axis);
    scene.add(pointlight);
}
function planet_orbiting(){
    mercury_axis.rotation.y+=Math.PI/8,8;
    wenus_axis.rotation.y+=Math.PI/22,4;
    ziemia_axis.rotation.y+=Math.PI/36,5;
    mars_axis.rotation.y+=Math.PI/68,6;
    jowisz_axis.rotation.y+=Math.PI/433,3;
    saturn_axis.rotation.y+=Math.PI/1075,6;
    uran_axis.rotation.y+=Math.PI/3070,7;
    neptun_axis.rotation.y+=Math.PI/6022,3;
}

function draw(){
    orbittime=Date.now();
    frameactual=Date.now();
    if(frametimestart-frameactual<-1000){
        var fps=document.getElementById("fps");
        fps.innerHTML=frames;
        frametimestart=Date.now();
        frames=0;
    }
    renderer.render(scene, camera);
    if(timeperiod-orbittime<-(1000/60)){
        timeperiod=Date.now();
        planet_orbiting();
    }
    frames++;
    window.requestAnimationFrame(draw);
}
/*
 slonce 695 700 km
merkury-średnica wynosi 4878 km,
mars-wynosi 6800 km
saturn-średnica równikowa 120 tysięcy km i biegunowa 108 tysięcy km
wenus-średnica 12 102 km 
ziemia-średnica równikowa 12 756 km, średnica biegunowa 12 714 km
uran-średnica równikowa 51 118 km, średnica biegunowa 49 946 km
neptun-średnica równikowa 49 528 km
pluton( już nie planeta)-średnica równikowa ok. 2300 km


W mln km
Merkury 58000000
Wenus 108
Ziemia 150
Mars 228
Ceres 415
Jowisz 778 
Saturn 1432 
Uran 2871
Neptun 4498
Pluton 5914
Eris 10122
 */
