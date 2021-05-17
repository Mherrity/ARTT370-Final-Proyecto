import React, { useRef, useState, useEffect, useMemo} from 'react'
import Fragment from './shaders/fragment'
import Vertex from './shaders/vertex'
import { useFrame, useThree } from 'react-three-fiber'


let args = [1,1,1]


export default (props) => {
    // This reference will give us direct access to the mesh
    const mesh = useRef()


  const uniforms = useMemo(
    () => ({
        uTexture : {value : 0 },
        uTime : {value : 0},
        ...props.uni
    }),
    []
  )

  const { viewport } = useThree()

  console.log({viewport})
  let args = [viewport.width,viewport.height,1]

        return (
            <mesh
              {...props}
              wireFrame={true}
              ref={mesh}>
        
                <planeBufferGeometry
                    wireFrame = {true}
                     args={args} />
                <shaderMaterial 
                                fragmentShader = {Fragment}
                                vertexShader = {Vertex}
                                color={'orange'} 
                                uniforms = {uniforms}
                                />
        
            </mesh>
          )
    
}