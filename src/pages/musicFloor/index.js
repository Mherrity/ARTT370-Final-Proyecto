import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useThree, useFrame } from 'react-three-fiber'
import {MusicFloor,FloatingFloor} from '../../meshes'
import * as Styled from './styles'
import {Analyzer} from '../../utils'
import { Flex, Box } from '@react-three/flex'
import {xmur3} from '../../utils/HashUtils'
import { useAspect } from '@react-three/drei'

const blocks = [['0x2a85ac3848ed06475ab245d3d9a58f64a59ed3c8d28f1b173c0f2e0188c43545','0x0242d2cab2a48f7e4ceff2ff63845d535c31c148'],
['0xfc370d58f733a11262860d0f3435e9b93664e94939ce9cbb0fb9e3278cb3cfcd','0x444c8ac72e03eb9c56db3c4024a1d3a17cf1fee3'],
['0x6f275a45e7f98859a1e884adb36b1338074e158f25cabd80f5d26f45f6e4e0b2','0xaef280bf78f9595a1c5d85c2aa2fcc12bd392279'],
['0xeca3fceac0e0e403e32780a7f2ea408b4ea31532718501bf6e4b300fd14060bc', '0xc2005844b82c94491eee5eba2dfa7bfa83fc8735'],
['0x63ba07392c657afc578e111e2f5f827db2151777f754258bb1254834b35d462f','0x0f4240d670afa710ecbcb814eee1567d12ef1584']
]

const block = blocks[Math.floor(Math.random() * 5)]

let generator = xmur3(blocks[0]+blocks[1])

const generate= (generator=generator) => ({
    uSeed_1 : {value : generator()},
    uSeed_2 : {value : generator()},
    uSeed_3 : {value : generator()},
    uSeed_4 : {value : generator()},
    uSeed_5 : {value : generator()}
})


const superFunMapTime = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,19]

const superFun = [1,2,3]



const MusicBox = ({dir, audioCtx, data, analyser,size,sizeBox}) => (
    <Box 
    margin={ 0.5 }
    centerAnchor>
            <MusicFloor
            uni = {generate(generator)}
            sizeBox={sizeBox}
            dir={dir}
            audioCtx = {audioCtx}
            data = {data}
            analyser = {analyser}
            />
    </Box>
)

const Layout = ({dir,audioCtx,data,analyser,position,num,sizeBox}) =>{

    let toMap = new Array(num)

 return (

    <Flex justify="center" 
            align="center"
            wrap="wrap"
           flexDirection={dir=="bottom"?"row":dir}
           size = {[20,-10,10]}
           position = {[-10,5,0]}
           centerAnchor
                    >
{superFunMapTime.map((k,i)=>(
                 <MusicBox 
                        sizeBox = {sizeBox}
                        dir={dir}
                        key={i}
                        audioCtx = {audioCtx}
                        data = {data}
                        analyser = {analyser} />
                        ))}
                                            

            </Flex>
)

 }

 export default ()=>{



    const [audio, setAudio] = useState()
    const [d, setData] = useState()
    const [analy, setAnalyser] = useState()
    const [started, start] = useState(false)

    let startAnalysis = () =>{
        const { audioCtx, data , analyser } =  Analyzer('source')
        setAudio(audioCtx)
        setData(data)
        setAnalyser(analyser)
        start(true)

       // setTimeout(startAnalysis,1000)
    }
    // useEffect(_=>{
    //     let startAnalysis = () =>{
    //     const { audioCtx, data , analyser } =  Analyzer('source')
    //     setAudio(audioCtx)
    //     setData(data)
    //     setAnalyser(analyser)
    //     }
    //     setTimeout(startAnalysis,1000)
    // },[])
     
    
 return  (
     <>
    <Styled.LFG>

        {started?  

        <Canvas camera={{ position: [0, 0, 10 /* superFunMapTime.length */]}} onCreated={state => {}}
        >
   
            <Layout dir="row"
                    sizeBox = {2}
                    position = {[ 10 , 0, 0]}
                    num = {10}
                    audioCtx = {audio}
                    data = {d}
                    analyser = {analy}
            />
        {/*
            <Layout dir="row"
                    position = {[ 0 , 0.5, 0]}
                    //num = {3}
                    audioCtx = {audio}
                    data = {d}
                    analyser = {analy}
            />

            <Layout dir="row"
                    position = {[ 0 , 2.5, 0]}
                    //num = {3}
                    audioCtx = {audio}
                    data = {d}
                    analyser = {analy}
            />

            <Layout dir="row"
                    position = {[ 0 , 4.5, 0]}
                    //num = {3}
                    audioCtx = {audio}
                    data = {d}
                    analyser = {analy}
            /> */}


        </Canvas> : 
        <div style = {{display : 'flex', flexDirection : 'row', width: '100%', justifyContent : 'center'}} >
        <button onClick={_=>startAnalysis()}>Play Me! </button> 
        </div>
        
        }
    </Styled.LFG> 
    </>

 )
}