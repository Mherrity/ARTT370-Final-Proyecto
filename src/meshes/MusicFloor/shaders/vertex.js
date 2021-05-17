export default `
uniform float uTime;
uniform float uFrequency;
attribute float aFourier;
varying vec2 vUv;
uniform sampler2D uTexture;


        void main()
        {
            vec4 modelPosition = modelMatrix * vec4(position,1.0);

        //    float angle = atan(modelPosition.x,modelPosition.y);

       //     float distance = length(modelPosition.xy);

       //     modelPosition.x = sin(angle) * distance;
         //   modelPosition.y = cos(angle) * distance; 

           // modelPosition.xyz *= aFourier ;
           // modelPosition.x += sin(uFourier) ;



            vec4 viewPosition = viewMatrix * modelPosition;
            
            vec4 projectedPosition = projectionMatrix * viewPosition;


            gl_Position = projectedPosition;

            vUv = uv;
        }
`