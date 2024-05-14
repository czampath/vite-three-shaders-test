import * as THREE from 'three';

// CustomSobelOperatorShader.js
const CustomSobelOperatorShader = {
  uniforms: {
    tDiffuse: { value: null },
    resolution: { value: new THREE.Vector2() },
    intensity: { value: 1.0 },
    grayscale: { value: false } // New uniform to control grayscale output
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform vec2 resolution;
    uniform float intensity;
    uniform bool grayscale;
    varying vec2 vUv;

    void main() {
      vec2 texel = vec2(1.0 / resolution.x, 1.0 / resolution.y);

      mat3 Gx = mat3(-1.0, 0.0, 1.0, 
                     -2.0, 0.0, 2.0, 
                     -1.0, 0.0, 1.0);

      mat3 Gy = mat3(-1.0, -2.0, -1.0, 
                      0.0,  0.0,  0.0, 
                      1.0,  2.0,  1.0);

      vec3 sumX = vec3(0.0);
      vec3 sumY = vec3(0.0);

      for (int i = -1; i <= 1; i++) {
        for (int j = -1; j <= 1; j++) {
          vec4 color = texture2D(tDiffuse, vUv + texel * vec2(float(i), float(j)));
          sumX += color.rgb * Gx[i + 1][j + 1];
          sumY += color.rgb * Gy[i + 1][j + 1];
        }
      }

      vec3 G = sqrt(sumX * sumX + sumY * sumY);

      // Apply intensity
      vec3 finalColor = G * intensity;

      // Grayscale option
      if (grayscale) {
        float gray = dot(finalColor, vec3(0.299, 0.587, 0.114));
        gl_FragColor = vec4(vec3(gray), 1.0);
      } else {
        gl_FragColor = vec4(finalColor, 1.0);
      }
    }
  `
};

// Export the shader
export { CustomSobelOperatorShader };