attribute vec3 aSquareVertexPosition; // expects one vertex position

// to transform the vertex position
uniform mat4 uModelTransform;

uniform mat4 uViewProjTransform;

void main(void) {
  // order IS important!
  gl_Position = uViewProjTransform * uModelTransform * vec4(aSquareVertexPosition, 1.0);
}
