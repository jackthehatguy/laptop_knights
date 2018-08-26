precision mediump float;  // sets the precision for floating point computation

// fetches data from texture
// must be set outside texture
uniform sampler2D uSampler;

uniform vec4 uPixelColor; // to transform the fragment color

// interpolated
varying vec2 vTexCoord;

void main(void) {
  // texel color lookup based on uv val in vTexCoord
  vec4 c = texture2D(uSampler, vec2(vTexCoord.s, vTexCoord.t));

  // tint the textured area. leave transparent area as defined by texture
  vec3 r = vec3(c) * (1.0-uPixelColor.a) + vec3(uPixelColor) * uPixelColor.a;
  vec4 result = (r, c.a);

  gl_FragColor = result;
}
