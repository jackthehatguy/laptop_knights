attribute vec3 aSquareVertexPosition; // expects one vertex position
attribute vec2 aTextureCoordinate;

// texture coordinate: map img -> squ
varying vec2 vTexCoord;

// to transform the vertex position
uniform mat4 uModelTransform;
uniform mat4 uViewProjTransform;

void main(void) {
  // mult order IS important!
  gl_Position = uViewProjTransform * uModelTransform * vec4(aSquareVertexPosition, 1.0);

  // frag(vTexCoord)
  vTexCoord = aTextureCoordinate;
}
