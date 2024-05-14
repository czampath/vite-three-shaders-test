import '../css/style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { EffectComposer } from 'three/examples/jsm/Addons.js';
import { RenderPass } from 'three/examples/jsm/Addons.js';

const canvas = document.querySelector("#bg");

//Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, parseInt(window.getComputedStyle(canvas).getPropertyValue("width")) / parseInt(window.getComputedStyle(canvas).getPropertyValue("height")), 0.1, 3000);
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.set(0,20,60);
renderer.render(scene, camera);

//Sphere
const cylinderGeometry = new THREE.CylinderGeometry(10,10,50);
const cylinderMaterial = new THREE.MeshStandardMaterial({ color: 0x00aa00});
const cylinder = new THREE.Mesh(cylinderGeometry,cylinderMaterial);
cylinder.position.set( 10, 0, 10);
cylinder.rotateY(-.9)
scene.add(cylinder);

// Box 
const boxGeometry = new THREE.BoxGeometry(10,10,10);
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff});
const box = new THREE.Mesh(boxGeometry,boxMaterial);
box.position.set(-20, 0, 30);
scene.add(box);

//Point Light
const pointLight = new THREE.PointLight(0xffffff, 100, 100, 1);
pointLight.position.set(-10, 20, 50);
scene.add(pointLight);

//Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff,0.2);
scene.add(ambientLight)

//Camera controls
const controls = new OrbitControls(camera, renderer.domElement);

//Helpers
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(400,50);
scene.add(lightHelper, gridHelper);

//Composer
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene,camera);

composer.addPass(renderPass);

//Render
function render(){
  // renderer.render(scene,camera); // renders W/O post-processing
  composer.render();
}

//Animator
function animate(){
  render();
  requestAnimationFrame(animate);
  box.rotation.z += 0.001
  cylinder.rotation.z += -0.001

  controls.update();
}

function onWindowResize(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
}

window.addEventListener("resize", onWindowResize);
animate();