import React, { useEffect, useRef } from 'react';
import styles from './background.module.sass';
import * as THREE from 'three';
import { FireLevel, FireSim, FireUpdateEvent } from './fire-sim';

let camera: THREE.OrthographicCamera, scene: THREE.Scene, renderer: THREE.WebGLRenderer;
const meshes: THREE.Mesh[] = []
const AMOUNT = 50;
const AMPLITUDE = 0.5
const FREQUENCY = 0.0002
const BOX_LENGTH = 0.05
const SPACING = BOX_LENGTH/10
const COLORS: number[] = [0x886797, 0xb9a2bddc, 0xcfcd2a, 0x3f3f3f, 0x6868687c]
const DIMENSION_SCALER = 0.05

let raycaster: THREE.Raycaster, pointer: THREE.Vector2;
let isClick = false
let fireSim: FireSim

function Background() {
    const refContainer = useRef(null);

    useEffect(() => {
        fireSim = new FireSim(meshes.map(mesh => mesh.id))
        const levelToColorMap: Record<FireLevel, number> = {
            red: 0xff0000,
            orange: 0xff9100,
            black: 0x424242
        }

        fireSim.emitter.on('update', (event: FireUpdateEvent) => {
            console.log({event})
            const mesh = meshes.find(mesh => mesh.id === event.meshId)
            if (!mesh) {
                return
            }

            mesh.material =  new THREE.MeshPhongMaterial( { color: levelToColorMap[event.level]} );
        })

        const {width, height, aspectRatio} = getScreenDimensions()
        console.log(width, height)
        camera = new THREE.OrthographicCamera(-width * DIMENSION_SCALER, width * DIMENSION_SCALER, height * DIMENSION_SCALER, -height * DIMENSION_SCALER)
        // camera = new THREE.PerspectiveCamera( 150, aspectRatio, 0.1, 10 );

        camera.viewport = new THREE.Vector4( Math.floor(width ), Math.floor(height ), Math.ceil( width ), Math.ceil( height ) );
        camera.position.set(0,1,0)
        camera.lookAt(0, 0, 0);
    
        scene = new THREE.Scene();
    
        scene.add( new THREE.AmbientLight( 0x999999 ) );
    
        const light = new THREE.DirectionalLight( 0xffffff, 3 );
        light.position.set( 0, 100,0);
        light.castShadow = true;
        light.shadow.camera.zoom = 4; // tighter shadow map
        scene.add( light );
    
        
        for (let i=-AMOUNT; i<AMOUNT; i++) {
            for (let j=-AMOUNT; j<AMOUNT; j++) {
                createCube(new THREE.Vector3(i*(BOX_LENGTH+SPACING),0,j*(BOX_LENGTH+SPACING)), getRandomColor())
            }
        }

        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        // renderer.shadowMap.enabled = true;
        document.body.appendChild( renderer.domElement );
        refContainer.current && refContainer.current.appendChild(renderer.domElement);
        
        // raycasting for user interaction
        raycaster = new THREE.Raycaster();
        pointer = new THREE.Vector2();

        renderer.setAnimationLoop( animate );
        // window.addEventListener( 'pointermove', onPointerMove );
        window.addEventListener('click', onPointerMove)
        window.addEventListener( 'resize', onWindowResize );
    }, []);
    
    return <div className={styles.background} ref={refContainer}></div>;
}

function createCube(pos: THREE.Vector3, color: number) {
    const boxGeometry = new THREE.BoxGeometry( BOX_LENGTH, BOX_LENGTH, BOX_LENGTH );
    const materialCylinder = new THREE.MeshPhongMaterial( { color } );

    const mesh = new THREE.Mesh( boxGeometry, materialCylinder)
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.position.x = pos.x
    mesh.position.y = pos.y
    mesh.position.z = pos.z
    meshes.push(mesh)
    scene.add( mesh );
}

function onWindowResize() {
    const {width, height} = getScreenDimensions()
    camera.left = -width * DIMENSION_SCALER,
    camera.right = width * DIMENSION_SCALER
    camera.top = height * DIMENSION_SCALER
    camera.bottom = -height * DIMENSION_SCALER

    camera.updateProjectionMatrix();
    camera.viewport.set(
        Math.floor( width ),
        Math.floor( height ),
        Math.ceil( width ),
        Math.ceil( height ) );

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
    camera.updateMatrixWorld();
    meshes.forEach((mesh, index) => {
        const changeColor = Math.random()>0.999
        if (changeColor) {
            mesh.material = new THREE.MeshPhongMaterial( { color: getRandomColor() } );
        }
        // const offset = (index/meshes.length) * AMPLITUDE * 2
        // mesh.position.y = (AMPLITUDE) * Math.sin(FREQUENCY * time + offset)
    })
    if (isClick) {
        raycast()
    }
    renderer.render( scene, camera );
}

function raycast() {
    raycaster.setFromCamera( pointer, camera );
    const intersects = raycaster.intersectObjects( scene.children, false );

    for (const intersect of intersects ) {
        const mesh = meshes.find(mesh => mesh.id === intersect.object.id)
        if (!mesh) {
            continue
        }

        fireSim.startFire(mesh.id)
    }
}

function getRandomColor() {
    const colorIndex = Math.floor(Math.random() *COLORS.length)
    return COLORS[colorIndex]
}

function onPointerMove(event: PointerEvent) {
    isClick = true
    setTimeout(() => isClick = false, 100)
    // values between -1 and 1
    pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;


}

export default Background