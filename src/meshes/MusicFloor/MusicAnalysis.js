import {Analyzer} from '../../utils'
import { Canvas, useFrame } from 'react-three-fiber'
import * as THREE from 'three'


export default (analyser,data,mesh) => {
            analyser.getByteFrequencyData(data)

            const four = new Float32Array(mesh.current.geometry.attributes.position.count)

            let o = 0;
            for(let i = 0; i < four.length; i++){
                if (o >= data.length){
                    o=0
                }
                four[i] = data[o]/100
                o++
            }

        mesh.current.geometry.setAttribute('aFourier', new THREE.BufferAttribute(four,1))

        }

export const createDataTexture=(analyser,data,mesh,uniforms)=>{
    // create a buffer with color data

    analyser.getByteFrequencyData(data)

    const width = 512;
    const height = 512;

    const size = width * height;
    const textureData = new Uint8Array( 3 * size );

    let o = 0;

    for ( let i = 0; i < size; i ++ ) {

        const stride = i * 3;

        if (o >= data.length){
            o=0
        }

        textureData[ stride ] = data[o];
        textureData[ stride + 1 ] = data[o];
        textureData[ stride + 2 ] = data[o];
        o++

    }

    // used the buffer to create a DataTexture

    const texture = new THREE.DataTexture( textureData, width, height, THREE.RGBFormat );

    uniforms.uTexture.value = texture;
    
}
