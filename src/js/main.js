import '../css/style.css'
import * as THREE from 'three';
import { ColorifyShader, DotScreenShader, LuminosityShader, OrbitControls, RenderPass, SobelOperatorShader, VignetteShader } from 'three/examples/jsm/Addons.js';
import { EffectComposer } from 'three/examples/jsm/Addons.js';
import { ShaderPass } from 'three/examples/jsm/Addons.js';
import { FilmPass } from 'three/examples/jsm/Addons.js';
import { UnrealBloomPass } from 'three/examples/jsm/Addons.js';
import { CustomSobelOperatorShader } from './CustomSobelOperatorShader';
import { GlitchPass } from 'three/examples/jsm/Addons.js';

const canvas = document.querySelector("#bg");

//Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, parseInt(window.getComputedStyle(canvas).getPropertyValue("width")) / parseInt(window.getComputedStyle(canvas).getPropertyValue("height")), 0.1, 3000);
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000)
camera.position.setZ(60);
renderer.render(scene, camera);

//Sphere
const sphereGeometry = new THREE.CylinderGeometry(10,10,30,5,100);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff00ff, emissive: 0xff00ff, emissiveIntensity: .9});
const sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
sphere.position.set( 10, 10, 10);
scene.add(sphere);

// Box 
const boxGeometry = new THREE.BoxGeometry(10,10,10);
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x00FF00, emissive: 0x00FF00, emissiveIntensity: .9});
const box = new THREE.Mesh(boxGeometry,boxMaterial);
box.position.set(-10, 0, 30);
scene.add(box);

//Point Light
const pointLight = new THREE.PointLight(0xffffff, 200, 500, 1);
pointLight.position.set(100, 0, 100);
scene.add(pointLight);

//Helpers
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(400,50);
// scene.add(lightHelper, gridHelper);

//Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff,.5);
scene.add(ambientLight)

const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene,camera);

const dotEffect = new ShaderPass(DotScreenShader);
dotEffect.uniforms["scale"].value = 2;

const  bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight),.8, 1, 0.1 )
const luminosityEffect = new ShaderPass(LuminosityShader)

const sobelEffect = new ShaderPass (SobelOperatorShader);
sobelEffect.uniforms["resolution"].value.x = window.innerWidth * window.devicePixelRatio;
sobelEffect.uniforms["resolution"].value.y = window.innerHeight * window.devicePixelRatio;

const colorify = new ShaderPass(ColorifyShader);
colorify.uniforms["color"].value.setRGB(1,1,5)

//Custom Sobel
const customSobelPass = new ShaderPass(CustomSobelOperatorShader);
customSobelPass.uniforms['resolution'].value.set(window.innerWidth, window.innerHeight);
customSobelPass.uniforms['intensity'].value = 1; // Initial intensity

//Film Pass
const filmPass = new FilmPass(.75, false);

//Glitch Pass
const glitchPass = new GlitchPass(.0001);

const vignettePass = new ShaderPass(VignetteShader);
vignettePass.uniforms["offset"].value = 2;
vignettePass.uniforms["darkness"].value = 1.5;

//Camera controls
const controls = new OrbitControls(camera, renderer.domElement);

/* post-processing battle ground */

composer.addPass(renderPass);
// composer.addPass(luminosityEffect);
// composer.addPass(sobelEffect)
composer.addPass(customSobelPass);
// composer.addPass(colorify)
// composer.addPass(dotEffect)
composer.addPass(bloomPass)
composer.addPass(filmPass)
composer.addPass(glitchPass);
composer.addPass(vignettePass)

function render(){
  composer.render();
}

// Variables for circular motion
let theta = 0; // Angle in radians
const radius = 60; // Radius of the circular path
const speed = 0.02; // Speed of the movement

//Animator
function animate(){
  render();
  requestAnimationFrame(animate);
  box.rotation.z += 0.001
  sphere.rotation.z += -0.001

  theta += speed;
  pointLight.position.x = radius * Math.cos(theta);
  pointLight.position.z = radius * Math.sin(theta);

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