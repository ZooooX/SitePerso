varying vec3 vNormal;
varying vec3 vNormel;

uniform vec3 objectPosition;

void main() {
    vNormal = normalize(normalMatrix * normal);
    vNormel = normalize( normalMatrix * (cameraPosition - objectPosition));

    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}