
export default `
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
            highp int num = max(3, int(floor(uSeed_3 * 6.0)) );
            vec3 c;
            float z = 0.1 * uTime; //* 10.0;
            vec2 uv =  vUv; //gl_FragCoord.xy;
            vec2 p = uv - 0.5;
            float l = 0.2 * length(p) * (2. + 2.0*uSeed_2 );
            for (int i = 0; i < 2; i++) {
              z += 0.07;
              uv += p / l * (sin(z) + 1.0) * abs(sin(l * 9.0 - z * 2.0 ));
              c[i] = (0.01 + (0.02 *  uSeed_4) ) / length(abs(mod(uv, 1.0) - 0.5));
            }

            float intensity =  texture2D(uTexture, vec2(l, 0.5)).x ; //* (1.0 + uSeed_3 ) ;
          // texture2D(uTexture, vUv).xyz ;

         gl_FragColor = vec4(vec2(c / l * intensity), 1.0 * (uSeed_4 * intensity), uTime);

            
           // gl_FragColor = vec4(intensity.xy, 0.5, 1.0);
        }
`

const galaxy = `

varying vec2 vUv;
uniform float uTime;
uniform float uRevSpeed;
uniform sampler2D texture;
uniform sampler2D uTexture;
uniform float uSeed_1;
uniform float uSeed_2;
uniform float uSeed_3;
uniform float uSeed_4;
uniform float uSeed_5;


vec2 uResolution = vec2(1);
vec2 iResolution = vec2(1,1);

float field(in vec3 p,float s) {
	float strength = 7. + .03 * log(1.e-6 + fract(sin(uTime) * 4373.11));
	float accum = s/4.;
	float prev = 0.;
	float tw = 0.;
	for (int i = 0; i < 26; ++i) {
		float mag = dot(p, p);
		p = abs(p) / mag + vec3(-.5, -.4, -1.5);
		float w = exp(-float(i) / 7.);
		accum += w * exp(-strength * pow(abs(mag - prev), 2.2));
		tw += w;
		prev = mag;
	}
	return max(0., 5. * accum / tw - .7);
}

// Less iterations for second layer
float field2(in vec3 p, float s) {
	float strength = 7. + .03 * log(1.e-6 + fract(sin(uTime) * 4373.11));
	float accum = s/4.;
	float prev = 0.;
	float tw = 0.;
	for (int i = 0; i < 18; ++i) {
		float mag = dot(p, p);
		p = abs(p) / mag + vec3(-.5, -.4, -1.5);
		float w = exp(-float(i) / 7.);
		accum += w * exp(-strength * pow(abs(mag - prev), 2.2));
		tw += w;
		prev = mag;
	}
	return max(0., 5. * accum / tw - .7);
}

vec3 nrand3( vec2 co )
{
	vec3 a = fract( cos( co.x*8.3e-3 + co.y )*vec3(1.3e5, 4.7e5, 2.9e5) );
	vec3 b = fract( sin( co.x*0.3e-3 + co.y )*vec3(8.1e5, 1.0e5, 0.1e5) );
	vec3 c = mix(a, b, 0.5);
	return c;
}


void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
    vec2 uv = 2. * fragCoord.xy / iResolution.xy - 1.;
	vec2 uvs = uv * iResolution.xy / max(iResolution.x, iResolution.y);
	vec3 p = vec3(uvs / 4., 0) + vec3(1., -1.3, 0.);
	p += .2 * vec3(sin(uTime / 16.), sin(uTime / 12.),  sin(uTime / 128.));
	
	float freqs[4];
	//Sound
	freqs[0] = texture( iChannel0, vec2( 0.01, 0.25 ) ).x;
	freqs[1] = texture( iChannel0, vec2( 0.07, 0.25 ) ).x;
	freqs[2] = texture( iChannel0, vec2( 0.15, 0.25 ) ).x;
	freqs[3] = texture( iChannel0, vec2( 0.30, 0.25 ) ).x;

	float t = field(p,freqs[2]);
	float v = (1. - exp((abs(uv.x) - 1.) * 6.)) * (1. - exp((abs(uv.y) - 1.) * 6.));
	
    //Second Layer
	vec3 p2 = vec3(uvs / (4.+sin(uTime*0.11)*0.2+0.2+sin(uTime*0.15)*0.3+0.4), 1.5) + vec3(2., -1.3, -1.);
	p2 += 0.25 * vec3(sin(uTime / 16.), sin(uTime / 12.),  sin(uTime / 128.));
	float t2 = field2(p2,freqs[3]);
	vec4 c2 = mix(.4, 1., v) * vec4(1.3 * t2 * t2 * t2 ,1.8  * t2 * t2 , t2* freqs[0], t2);
	
	
	//Let's add some stars
	//Thanks to http://glsl.heroku.com/e#6904.0
	vec2 seed = p.xy * 2.0;	
	seed = floor(seed * iResolution.x);
	vec3 rnd = nrand3( seed );
	vec4 starcolor = vec4(pow(rnd.y,40.0));
	
	//Second Layer
	vec2 seed2 = p2.xy * 2.0;
	seed2 = floor(seed2 * iResolution.x);
	vec3 rnd2 = nrand3( seed2 );
	starcolor += vec4(pow(rnd2.y,40.0));
	
	fragColor = mix(freqs[3]-.3, 1., v) * vec4(1.5*freqs[2] * t * t* t , 1.2*freqs[1] * t * t, freqs[3]*t, 1.0)+c2+starcolor;
}
`