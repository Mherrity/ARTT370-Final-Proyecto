

export default (id, audioCtx=false, play=true) => {
/*Play audio from an audio source 
returns the audio analysis data and 
analyser object */

    if (audioCtx){audioCtx.resume()}

    audioCtx =  audioCtx? audioCtx : new (window.AudioContext || window.webkitAudioContext)()

    
    
    let audioElement = document.getElementById(id);
    
    let play_in_time = () => {
        setTimeout(_=>audioElement.play(),5000)
    }
    
    play_in_time()
    
    let analyser = audioCtx.createAnalyser();
    
    analyser.fftSize = 2048;
    
    let source = audioCtx.createMediaElementSource(audioElement);
    
    source.connect(analyser);
    
    source.connect(audioCtx.destination);
    
    let data = new Uint8Array(analyser.frequencyBinCount);
    
    return {audioCtx, data, analyser}
    }