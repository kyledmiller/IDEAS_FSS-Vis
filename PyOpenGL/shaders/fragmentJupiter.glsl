uniform sampler2D Tex;

varying vec3 normal;
uniform float uTime;
uniform vec4 color; //not used here


//from https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83
//simple 3D noise
float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}
float snoise(vec3 p){
    vec3 a = floor(p);
    vec3 d = p - a;
    d = d * d * (3.0 - 2.0 * d);

    vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
    vec4 k1 = perm(b.xyxy);
    vec4 k2 = perm(k1.xyxy + b.zzww);

    vec4 c = k2 + a.zzzz;
    vec4 k3 = perm(c);
    vec4 k4 = perm(c + 1.0);

    vec4 o1 = fract(k3 * (1.0 / 41.0));
    vec4 o2 = fract(k4 * (1.0 / 41.0));

    vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
    vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

    return o4.y * d.y + o4.x * (1.0 - d.y);
}

// from https://www.seedofandromeda.com/blogs/49-procedural-gas-giant-rendering-with-gpu-noise
//fractal noise
float noise(vec3 position, int octaves, float frequency, float persistence, int rigid) {
    float total = 0.0; // Total value so far
    float maxAmplitude = 0.0; // Accumulates highest theoretical amplitude
    float amplitude = 1.0;
    for (int i = 0; i < octaves; i++) {
        // Get the noise sample
	if (rigid == 0){
           total += snoise(position * frequency) * amplitude;
	} else {
	// rigid noise
	    total += ((1.0 - abs(snoise(position * frequency))) * 2.0 - 1.0) * amplitude;	       
	}
        // Make the wavelength twice as small
        frequency *= 2.0;
        // Add to our maximum possible amplitude
        maxAmplitude += amplitude;
        // Reduce amplitude according to persistence for the next octave
        amplitude *= persistence;
    }
 
    // Scale the result by the maximum amplitude
    return total / maxAmplitude;
}



void main() {


    // Use normal + time for evolution
    vec3 position = normal + vec3(uTime, 0.0, uTime);

    //fractal noise (can play with these)
    float n1 = noise(position * 100., 6, 0.1, 0.8, 0) * 0.02; //regular
    float n2 = noise(position * 100., 6, 0.1, 0.8, 1) * 0.04 - 0.01; //rigid

    //storms
    // Get the three threshold samples
    float s = 0.6;
    float f = 4.0;
    float t1 = snoise(position * f) - s;
    float t2 = snoise((position + 800.0) * f) * 0.01 - s;
    float t3 = snoise((position + 1600.0) * f) * 0.01 - s;

    // Intersect them and get rid of negatives
    float threshold = max(t1 * t2 * t3, 0.0);
    float n3 = snoise(position * f) * threshold * 0.3;

    //now add the noise terms together and get the positions for the texture
    float n = n1 + n2 + n3;
    vec2 newTexCoord = vec2(gl_TexCoord[0].y/2. + 0.5 + n , 0); 

    gl_FragColor = texture2D(Tex, newTexCoord) * gl_Color;


}
