precision mediump float;  // sets the precision for floating point computation

// Color of the object
uniform vec4 uPixelColor;

// lighting
uniform vec4 uGlobalAmbientColor;
uniform float uGlobalAmbientIntensity;

void main(void) {
  gl_FragColor = uPixelColor * uGlobalAmbientIntensity * uGlobalAmbientColor;
}
