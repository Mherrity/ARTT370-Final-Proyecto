import React, { useRef, useState, useEffect, useMemo} from 'react'
import { useFrame, useThree, extend  } from 'react-three-fiber'
import Fragment from './shaders/fragment'
import Vertex from './shaders/vertex'
import {Analyzer, String2Bin} from '../../utils'
import {xmur3} from '../../utils/HashUtils'
import AnalyzeMusic,{createDataTexture} from './MusicAnalysis'
import GeoPierce from 'geo-piecering'
import * as THREE from 'three'

const TransactionHash = '0x1f9ce64a16bac9d63029cea00febbc5b16fc9a1bef8aa0c2f4e0e3cfcdfc8fc8'
const userAddy = '0x59dda3141f6dba6bc9a0a348e750d8c890f0f1cc'

extend({GeoPierce})


//const { audioContext, data , analyser } =  Analyzer('source', true)

export default (props) => {
  // This reference will give us direct access to the mesh
  const mesh = useRef()

  let {audioCtx, data, analyser, sizeBox} = props

  let seedStrings = String2Bin(TransactionHash+userAddy)

  let generator = xmur3(TransactionHash+userAddy)

  const size = [sizeBox,sizeBox,sizeBox] //new Float32Array(3).fill(props.sizeBox)

  console.log({size})

  const [texture,setText] = useState(new THREE.DataTexture( new Uint8Array([224,154,83,
                                                                224,14,84,
                                                                224,200,180,
                                                                65,200,120]), 2, 2, THREE.RGBFormat ) )

  const uniforms = useMemo(
    () => ({
        uTexture : {value : texture },
        uTime : {value : 0},
        ...props.uni
    }),
    []
  )


  
  const { viewport } = useThree()
  //const size = viewport.width / 5

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame((state) => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01

    uniforms.uTime.value = state.clock.elapsedTime

    if(data){
        createDataTexture(analyser,data,mesh,uniforms)
    }
  })



  return (
    <mesh
      {...props}
      wireFrame={true}
      ref={mesh}>

        <boxBufferGeometry
            wireFrame = {true}
             args={size} />
        <shaderMaterial 
                        fragmentShader = {Fragment}
                        vertexShader = {Vertex}
                        color={'orange'} 
                        uniforms = {uniforms}
                        />

    </mesh>
  )
}