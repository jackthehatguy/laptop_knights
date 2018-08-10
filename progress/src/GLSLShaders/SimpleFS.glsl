// precision mediump float;  // sets the precision for floating point computation
precision lowp float;  // sets the precision for floating point computation

uniform vec4 uPixelColor; // to transform the fragment color

void main(void) {
  gl_FragColor = uPixelColor;
}
