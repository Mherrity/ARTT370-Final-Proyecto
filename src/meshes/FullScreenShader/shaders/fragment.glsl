varying vec2 vUv;
uniform float uTime;
uniform vec2 uResolution;
uniform float uRevSpeed;
uniform sampler2D uTexture;
uniform float uSeed_1;
uniform float uSeed_2;
uniform float uSeed_3;
uniform float uSeed_4;
uniform float uSeed_5;
//uniform float uTime;


float PI = 3.141592;

        void main()
        {
            gl_FragColor = vec4(vUv, 1.0, 1.0);
        }