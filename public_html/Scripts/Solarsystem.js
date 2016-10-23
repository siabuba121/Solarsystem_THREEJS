var renderer;
var scene;
var camera;
var pointlight;

var timeperiod;
var orbittime;

var car;

var frametimestart;
var frameactual;
var frames;

var sun,
        mercury,
        wenus,
        ziemia,
        ksiezyc,
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

var     saturn_ring;

var     sun_material,
        mercury_material,
        wenus_material,
        ziemia_material,
        ksiezyc_material,
        mars_material,
        jowisz_material,
        saturn_material,
        uran_material,
        neptun_material;

function create_renderer(width, height) {
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    return renderer;
}

function create_material(texturejpg){
   var texture = new THREE.TextureLoader().load(texturejpg);
   material = new THREE.MeshBasicMaterial({map: texture});
   return material; 
}

function create_camera(){
    var camera = new THREE.PerspectiveCamera()
	camera.position.z+=500
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

function create_ship(){
    var dae;
    var loader = new THREE.ColladaLoader();
    loader.options.convertUpAxis = true;
    loader.load( 'models/car.dae', function ( collada ) {
    dae = collada.scene;
    dae.scale.x = dae.scale.y = dae.scale.z = 1;
    dae.updateMatrix();
    scene.add(dae);
    dae.position.z+=400;
    });
    return dae
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function create_ring(inner,outer,segments){
   var geometry = new THREE.RingGeometry( inner, outer, segments );
   var material = new THREE.MeshBasicMaterial( { color: "#CCCC99", side: THREE.DoubleSide } );
   var ring = new THREE.Mesh( geometry, material );
   return ring;
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
    ksiezyc=create_planet("ksiezyc",0.3,10,10,ksiezyc_material);
    ksiezyc.position.x+=20;
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
    saturn_ring=create_ring(15,22,50);
    saturn_ring.rotation.x+=Math.PI/3;
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
    material_setup();
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
    ksiezyc_material=create_material("textures/ksiezyc_texture.jpg");
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
    ziemia.add(ksiezyc);
    ziemia_axis.add(ziemia);
    scene.add(ziemia_axis);
    mars_axis.add(mars);
    scene.add(mars_axis);
    jowisz_axis.add(jowisz);
    scene.add(jowisz_axis);
    saturn.add(saturn_ring);
    saturn_axis.add(saturn);
    scene.add(saturn_axis);
    uran_axis.add(uran)
    scene.add(uran_axis);
    neptun_axis.add(neptun);
    scene.add(neptun_axis);
    scene.add(pointlight);
    //create_ship();
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
    ziemia.rotation.y+=Math.PI/3;
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
