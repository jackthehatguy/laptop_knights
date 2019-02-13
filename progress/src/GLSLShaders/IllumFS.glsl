precision mediump float;

uniform sampler2D uSampler;
uniform sampler2D uNormalSampler;

uniform vec4 uPixelColor;
uniform vec4 uGlobalAmbientColor;
uniform float uGlobalAmbientIntensity;

uniform vec3 uCameraPosition;

struct Material {
  vec4 Ka;  // ambient
  vec4 Kd;  // diffuse
  vec4 Ks;  // specular
  float Shininess;
};
uniform Material uMaterial;

// Light info
// /!\ must **ALWAYS** correspond to same var in LightShader.js
#define kGLSLuLightArraySize 4

struct Light {
  vec3 Position;
  vec4 Color;
  float Near;
  float Far;
  float Intensity;
  bool IsOn;
};
uniform Light uLights[kGLSLuLightArraySize];

varying vec2 vTexCoord;

float LightAttenuation(Light lgt, float dist) {
  float atten = 0.0;
  if (dist <= lgt.Far) {
    if (dist <= lgt.Near) {
      atten = 1.0;
    } else {
      float n = dist - lgt.Near;
      float d = lgt.Far - lgt.Near;
      atten = smoothstep(0.0, 1.0, 1.0-(n*n)/(d*d));
    }
  }
  return atten;
}

vec4 SpecularResult(vec3 N, vec3 L) {
  vec3 V = normalize(uCameraPosition - gl_FragCoord.xyz);
  vec3 H = (L + V) * 0.5;
  return uMaterial.Ks * pow(max(0.0, dot(N, H)), uMaterial.Shininess);
}

vec4 DiffuseResult(vec3 N, vec3 L, vec4 textureMapColor) {
  return uMaterial.Kd * max(0.0, dot(N, L)) * textureMapColor;
}

vec4 ShadedResult(Light lgt, vec3 N, vec4 textureMapColor){
  vec3 L = lgt.Position.xyz - gl_FragCoord.xyz;
  float dist = length(L);
  L /= dist;
  float atten = LightAttenuation(lgt, dist);
  vec4 diffuse = DiffuseResult(N, L, textureMapColor);
  vec4 specular = SpecularResult(N, L);
  vec4 result = atten * lgt.Intensity * lgt.Color * (diffuse + specular);
  return result;
}

void main(void) {
  vec4 textureMapColor = texture2D(uSampler, vTexCoord);
  vec4 normal = texture2D(uNormalSampler, vTexCoord);
  vec4 normalMap = (2.0 * normal) - 1.0;

  vec3 N = normalize(normalMap.xyz);
  
  vec4 shadedResult = uMaterial.Ka + (textureMapColor * uGlobalAmbientColor * uGlobalAmbientIntensity);

  if (textureMapColor.a > 0.0) {
    for (int i = 0; i < kGLSLuLightArraySize; i++) {
      if (uLights[i].IsOn) {
        shadedResult += ShadedResult(uLights[i], N, textureMapColor);
      }
    }
  }

  vec3 tintResult = vec3(shadedResult) * (1.0-uPixelColor.a) + vec3(uPixelColor) * uPixelColor.a;
  vec4 result = vec4(tintResult, textureMapColor.a);

  gl_FragColor = result;
}
