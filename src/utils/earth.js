/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/9/2 18:16
 * @version     v1.0
 * @filename    earth.js
 * @description
 ***************************************************************************/

// import * as dat from "dat.gui"
import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLSL } from "gl-react";
import earthe from "../assets/home/earthe.jpg"
import ausProp from "../assets/home/aus_prop.png"
import {Float32BufferAttribute} from "three";

const earth = () => {
    // debug
    // const gui = new dat.GUI()
    // gui.domElement.id = "home-overview-gui"
    // canvas
    const canvas = document.getElementById("home-overview-webgl")
    // scene
    const scene = new THREE.Scene()
    // objects
    const geometry = new THREE.SphereBufferGeometry(1, 64, 64)
    // loading normal map - earth
    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load(earthe)
    // materials
    const material = new THREE.ShaderMaterial()
    material.vertexShader = GLSL`
        varying vec2 vertexUV;
        varying vec3 vertexNormal;
        void main() {
            vertexUV = uv;
            vertexNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `
    material.fragmentShader = GLSL`
        uniform sampler2D globeTexture;
        varying vec2 vertexUV;
        varying vec3 vertexNormal;
        void main() {
            float intensity = 1.05 - dot(vertexNormal, vec3(0,0,1.0));
            vec3 atmosphere = vec3(0.3,0.6,1.0) * pow(intensity, 1.5);
            gl_FragColor = vec4(
                atmosphere + texture2D(globeTexture, vertexUV).xyz, 
                1.0
            );
        }
    `
    material.uniforms = {
        globeTexture: {
            value: texture
        }
    }
    // atmosphere
    const materialA = new THREE.ShaderMaterial()
    materialA.vertexShader = GLSL`
        varying vec3 vertexNormal;
        void main() {
            vertexNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `
    materialA.fragmentShader = GLSL`
        varying vec3 vertexNormal;
        void main() {
            float intensity = pow(0.85 - dot(vertexNormal, vec3(0,0,1.0)), 2.0);
            vec3 atmosphere = vec3(0.3,0.6,1.0) * pow(intensity, 1.5);
            gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
        }
    `
    materialA.blending = THREE.AdditiveBlending
    materialA.side = THREE.BackSide

    // label
    // let spriteText = "● 14.4% of global EPs"
    // const sprite = makeTextSprite( spriteText, {
    //     fontsize: 10,
    //     borderColor: {r:255, g:0, b:0, a:0},
    //     backgroundColor: {r:255, g:100, b:100, a:0}
    // })
    const spriteTexture = textureLoader.load(ausProp)
    const spriteMaterial = new THREE.SpriteMaterial({ map: spriteTexture })
    const sprite = new THREE.Sprite(spriteMaterial)
    sprite.scale.set(1.1,1.1,1.1)
    sprite.center.set(0, 0)
    sprite.position.set(-0.62, -1.03, 0.45)

    // mesh
    const sphere = new THREE.Mesh(geometry, material)
    const atmosphere = new THREE.Mesh(geometry, materialA)
    atmosphere.scale.set(1.2, 1.2, 1.2)
    scene.add(atmosphere)

    const group = new THREE.Group()
    group.add(sprite)
    group.add(sphere)
    scene.add(group)

    // galaxy
    const starGeometry = new THREE.BufferGeometry()
    const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff
    })
    const starVertices = []
    for (let i = 0; i < 10000; i++) {
        const x = (Math.random() - 0.5) * 500 // -250 ~ 250
        const y = (Math.random() - 0.5) * 200
        const z = -Math.random() * 2500
        starVertices.push(x, y, z)
    }
    starGeometry.setAttribute("position", new Float32BufferAttribute(starVertices, 3))
    const stars = new THREE.Points(starGeometry, starMaterial)

    // size
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }
    window.addEventListener('resize', () => {
        // update sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight
        // update camera
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()
        // update renderer
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })

    // camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    camera.position.x = 0
    camera.position.y = -0.7
    camera.position.z = 1.8
    scene.add(camera)
    camera.add(stars)

    // controls
    const controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true
    controls.enableZoom = false
    controls.enablePan = false
    controls.minPolarAngle = Math.PI * 7 / 25
    controls.maxPolarAngle = Math.PI * 17 / 25
    controls.rotateSpeed = 0.3
    sphere.rotation.y = 1.3

    // renderer
    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // animation
    const clock = new THREE.Clock()
    const loop = () => {
        const elapsedTime = clock.getElapsedTime()
        // update objects
        group.rotation.y = 0.1 * elapsedTime
        // update Orbital Controls
        controls.update()
        // render
        renderer.render(scene, camera)
        // call loop again on the next frame
        window.requestAnimationFrame(loop)
    }
    loop()
}

// function makeTextSprite( message, parameters ) {
//     if ( parameters === undefined ) parameters = {}
//     let fontface = parameters.hasOwnProperty("fontface") ?
//         parameters["fontface"] : "sans-serif"
//     let fontsize = parameters.hasOwnProperty("fontsize") ?
//         parameters["fontsize"] : 18
//     let borderThickness = parameters.hasOwnProperty("borderThickness") ?
//         parameters["borderThickness"] : 4
//     let borderColor = parameters.hasOwnProperty("borderColor") ?
//         parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 }
//     let backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
//         parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 }
//     let canvas = document.createElement("canvas")
//     let context = canvas.getContext("2d")
//     context.font = "Bold " + fontsize + "px " + fontface
//     // get size data (height depends only on font size)
//     let metrics = context.measureText(message)
//     let textWidth = metrics.width
//     // background color
//     context.fillStyle = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
//         + backgroundColor.b + "," + backgroundColor.a + ")"
//     // border color
//     context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
//         + borderColor.b + "," + borderColor.a + ")"
//
//     context.lineWidth = borderThickness
//     roundRect(context, borderThickness/2, borderThickness/2, textWidth + borderThickness, fontsize + borderThickness, 1)
//     // 1.4 is extra height factor for text below baseline: g,j,p,q.
//     // text color
//     context.fillStyle = "chocolate"
//     context.fillText( message, borderThickness + textWidth/2, fontsize + borderThickness)
//
//     // canvas contents will be used for a texture
//     let texture = new THREE.Texture(canvas)
//     texture.needsUpdate = true
//
//     let spriteMaterial = new THREE.SpriteMaterial({
//         map: texture
//     })
//     let sprite = new THREE.Sprite(spriteMaterial)
//     sprite.scale.set(1.1,1.1,1.1)
//     sprite.center.set(0, 0)
//     return sprite
// }
//
// function roundRect(ctx, x, y, w, h, r) {
//     ctx.beginPath()
//     ctx.moveTo(x+r, y)
//     ctx.lineTo(x+w-r, y)
//     ctx.quadraticCurveTo(x+w, y, x+w, y+r)
//     ctx.lineTo(x+w, y+h-r)
//     ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h)
//     ctx.lineTo(x+r, y+h)
//     ctx.quadraticCurveTo(x, y+h, x, y+h-r)
//     ctx.lineTo(x, y+r)
//     ctx.quadraticCurveTo(x, y, x+r, y)
//     ctx.closePath()
//     ctx.fill()
//     ctx.stroke()
// }

export default earth