import React, { useEffect, useRef } from 'react';
import styles from './background.module.sass';
import * as THREE from 'three';

let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGLRenderer;
const meshes: THREE.Mesh[] = []
const AMOUNT = 50;
const AMPLITUDE = 1
const FREQUENCY = 0.0002
const BOX_LENGTH = 0.9
const COLORS: number[] = [0x886797, 0xb9a2bddc, 0xcfcd2a, 0x3f3f3f, 0x6868687c]

function Background() {
    const refContainer = useRef(null);

    useEffect(() => {
        const {aspectRatio, width, height} = getScreenDimensions()
    
        camera = new THREE.PerspectiveCamera( 150, aspectRatio, 0.1, 10 );
        camera.viewport = new THREE.Vector4( Math.floor(width ), Math.floor(height ), Math.ceil( width ), Math.ceil( height ) );
        camera.position.set(0,5,0)
        camera.lookAt(0, 0, 0);
        camera.updateMatrixWorld();
    
        scene = new THREE.Scene();
    
        scene.add( new THREE.AmbientLight( 0x999999 ) );
    
        const light = new THREE.DirectionalLight( 0xffffff, 3 );
        light.position.set( 0.5, 0.5, 1 );
        light.castShadow = true;
        light.shadow.camera.zoom = 4; // tighter shadow map
        // scene.add( light );
    
        
        for (let i=-AMOUNT; i<AMOUNT; i++) {
            for (let j=-AMOUNT; j<AMOUNT; j++) {
                createCube(new THREE.Vector3(i,0,j), getRandomColor())
            }
        }
        // const geometryBackground = new THREE.PlaneGeometry( 100, 100 );
        // const materialBackground = new THREE.MeshPhongMaterial( { color: 0x000066 } );
        
        // const background = new THREE.Mesh( geometryBackground, materialBackground );
        // background.receiveShadow = true;
        // background.position.set( 0, 0, - 1 );
        // scene.add( background );
    
        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setAnimationLoop( animate );
        renderer.shadowMap.enabled = true;
        document.body.appendChild( renderer.domElement );
        refContainer.current && refContainer.current.appendChild(renderer.domElement);
    
        window.addEventListener( 'resize', onWindowResize );
    }, []);
    
    return <div className={styles.background} ref={refContainer}></div>;
}

function createCube(pos: THREE.Vector3, color: number) {
    const geometryCylinder = new THREE.BoxGeometry( BOX_LENGTH, BOX_LENGTH, BOX_LENGTH );
    const materialCylinder = new THREE.MeshPhongMaterial( { color } );

    const mesh = new THREE.Mesh( geometryCylinder, materialCylinder)
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.position.x = pos.x
    mesh.position.y = pos.y
    mesh.position.z = pos.z
    meshes.push(mesh)
    scene.add( mesh );
}

function onWindowResize() {
    const {aspectRatio, width, height} = getScreenDimensions()
    camera.aspect = aspectRatio;
    camera.updateProjectionMatrix();

    camera.viewport.set(
        Math.floor( width ),
        Math.floor( height ),
        Math.ceil( width ),
        Math.ceil( height ) );

    camera.aspect = aspectRatio;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function getScreenDimensions() {
    const aspectRatio = window.innerWidth / window.innerHeight;
    const width = (window.innerWidth/AMOUNT) * window.devicePixelRatio;
    const height = (window.innerHeight/AMOUNT)  * window.devicePixelRatio
    return {aspectRatio, width, height}
}

function animate(time: number) {
    meshes.forEach((mesh, index) => {
        const changeColor = Math.random()>0.999
        if (changeColor) {
            mesh.material = new THREE.MeshPhongMaterial( { color: getRandomColor() } );
        }
        const offset = (index/meshes.length) * AMPLITUDE * 2
        mesh.position.y = (AMPLITUDE) * Math.sin(FREQUENCY * time + offset)
        // mesh.rotation.z += 0.01;
    })

    renderer.render( scene, camera );
}

function getRandomColor() {
    const colorIndex = Math.floor(Math.random() *COLORS.length)
    return COLORS[colorIndex]
}

export default Background