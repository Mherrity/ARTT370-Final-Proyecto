import React, { useRef, useState, useEffect, useMemo} from 'react'
import { useFrame, useThree } from 'react-three-fiber'
import Fragment from './shaders/fragment'
import Vertex from './shaders/vertex'
import * as THREE from 'three'

const SIZE = 1


//const { audioContext, data , analyser } =  Analyzer('source', true)

export default (props) => {
  // This reference will give us direct access to the mesh
  const mesh = useRef()

  let {audioCtx, data, analyser} = props

  const [texture,setText] = useState(new THREE.DataTexture( new Uint8Array([224,154,83,
                                                                224,14,84,
                                                                224,200,180,
                                                                65,200,120]), 2, 2, THREE.RGBFormat ) )

  const uniforms = useMemo(
    () => ({
        uTexture : {value : texture },
        uTime : {value : 0}
    }),
    []
  )

  const { viewport } = useThree()
  //const size = viewport.width / 5

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame((state) => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01

    uniforms.uTime.value = state.clock.elapsedTime
  })

  return (
    <mesh
      {...props}
      wireFrame={true}
      ref={mesh}>

        <planeBufferGeometry
            wireFrame = {true}
             args={[SIZE,SIZE,SIZE]} />
        <shaderMaterial 
                        fragmentShader = {Fragment}
                        vertexShader = {Vertex}
                        color={'orange'} 
                        uniforms = {uniforms}
                        />

    </mesh>
  )
}