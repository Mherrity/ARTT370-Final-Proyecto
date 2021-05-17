import React, { useRef, useState, useEffect, useMemo} from 'react'
import { useFrame, useThree, extend } from 'react-three-fiber'
import GeoPierce from 'geo-piecering'
import * as THREE from 'three'

extend({GeoPierce})


//const { audioContext, data , analyser } =  Analyzer('source', true)

export default (props) => {


  return (

<mesh>
    <geoPierce
    cellSize ={3} 
    x={0}
    y={0}
    z={-1}
    radius = {2} 
    pieceSize = {Math.PI * 0.15}
    startRadian = {0}
    numPieces = {8}
    quadsPerPiece = {5}
    height = {10}
    drawOutline = {true}
    /*
    //3, // 1 == points, 2 == lines, 3 == triangles
    x: 0, // x position of the center of the piece ring
    y: 0, // y position of the center of the piece ring
    z: 0 // z position of the center of the piece ring
    radius: 200, // the radius of the piece ring
    pieceSize: Math.PI * 0.15, // size of the pieces
    startRadian: 0, // radian to start drawing pieces from
    numPieces: 8, // how many pieces to place
    quadsPerPiece: 5, // how many times the piece is split
    height: 10, // the height of the ring
    drawOutline: true // if cellSize == 2 draw only the outside of the shape 
     */
    />

    <meshNormalMaterial />

</mesh>


  )
}