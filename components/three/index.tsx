import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

function MyThree() {
    const refContainer = useRef(null);
    useEffect(() => {
        // === THREE.JS CODE START ===
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        camera.position.set(0, 0, 0);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        // document.body.appendChild( renderer.domElement );
        // use ref as a mount point of the Three.js scene instead of the document.body
        refContainer.current && refContainer.current.appendChild(renderer.domElement);

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const cube = createMesh();
                cube.position.x = i;
                cube.position.z = j
                scene.add(cube);
            }
        }
        const animate = function () {
            requestAnimationFrame(animate);

            camera.rotation.x += 0.01;
        //   console.log(camera.rotation)
            camera.rotation.y += 0.01
            renderer.render(scene, camera);
        };
        animate();
    }, []);
    return <div ref={refContainer}></div>;
}

function createMesh() {
    const geometry = new THREE.BufferGeometry();

    const vertices = new Float32Array([
        -1.0,
        -1.0,
        1.0, // v0
        1.0,
        -1.0,
        1.0, // v1
        1.0,
        1.0,
        1.0, // v2
        1.0,
        1.0,
        1.0, // v3
        -1.0,
        1.0,
        1.0, // v4
        -1.0,
        -1.0,
        1.0, // v5
    ]);

    // itemSize = 3 because there are 3 values (components) per vertex
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

    const r = Math.random();
    const g = Math.random();
    const b = Math.random();

    const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(r, g, b),
    });
    const mesh = new THREE.Mesh(geometry, material);

    return mesh;
}

export default MyThree;
