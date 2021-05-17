import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useThree, useFrame } from 'react-three-fiber'
import {FSShader} from '../../meshes'


export default ()=>(
    <Canvas>
        <FSShader/>
    </Canvas>
)
