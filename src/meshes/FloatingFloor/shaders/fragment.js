
export default `
varying vec2 vUv;
uniform float uTime;
uniform vec2 uResolution;
uniform float uRevSpeed;
uniform sampler2D uTexture;
//uniform float uTime;


float PI = 3.141592;

        void main()
        {
            vec3 c;
            float z = 0.1 * uTime;
            vec2 uv =  vUv; //gl_FragCoord.xy;
            vec2 p = uv - 0.5;
            float l = 0.2 * length(p);
            for (int i = 0; i < 3; i++) {
              z += 0.07;
              uv += p / l * (sin(z) + 1.0) * abs(sin(l * 9.0 - z * 2.0));
              c[i] = 0.01 / length(abs(mod(uv, 1.0) - 0.5));
            }

            float intensity =  texture2D(uTexture, vec2(l, 0.5)).x;
          // texture2D(uTexture, vUv).xyz ;
         gl_FragColor = vec4(c / l * intensity, uTime);

            
           // gl_FragColor = vec4(intensity.xy, 0.5, 1.0);
        }
`