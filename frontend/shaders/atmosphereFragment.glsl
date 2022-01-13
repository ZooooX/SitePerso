varying vec3 vNormal;
varying vec3 vNormel;
uniform vec3 color;

void main(){
    float intensity = pow(0.65 - dot(vNormal,vNormel),2.8);

    gl_FragColor = vec4(color,1.0) * intensity;
}