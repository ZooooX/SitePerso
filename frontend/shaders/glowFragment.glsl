uniform vec3 color;
varying float intensity;



void main() {

    vec3 atmosphere = color * intensity;

    gl_FragColor = vec4(atmosphere,1.0);
}