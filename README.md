# Vite Three.js Shaders Test

## Overview

This project is derived from the repository: [vite-js-basic-template](https://github.com/czampath/vite-js-basic-template).

First post-processing attempt, the project is the actual learning/testing ground for experimenting with various post-processing techniques using Three.js and Vite. The aim was to learn, explore and implement different shader effects to enhance the visual quality of 3D scenes.

## Preview

You can view a live preview of this project on GitHub Pages: [Preview](https://czampath.github.io/vite-three-shaders-test/)

## Custom Sobel Shader

This project includes a custom Sobel shader for edge detection, which can be toggled between grayscale and color modes. The shader is implemented in `CustomSobelOperatorShader.js` and offers flexibility for various post-processing effects.

### Features

- **Edge Detection**: Uses the Sobel operator to detect edges in the scene.
- **Intensity Control**: Adjust the intensity of the edges.
- **Grayscale Toggle**: Option to switch between grayscale and colored edge detection.


## Getting Started

To run the build locally, follow these steps:

### Prerequisites

Ensure you have `http-server` installed globally. If not, you can install it using npm:

    npm install -g http-server

### Running the Build

1. Clone the repository and navigate to the project directory.
2. Build the project if it is not already built. This typically involves running a build script such as:

    npm run build

3. Navigate to the `docs` directory where the build is located:

    cd docs

4. Start the HTTP server:

    http-server -p 8000

5. Open your browser and go to `http://localhost:8000` to see the project in action.

## Features

- **Three.js Integration**: Utilize Three.js for rendering 3D graphics.
- **Vite for Development**: Fast and efficient development with Vite.
- **Post-Processing Effects**: Experiment with various shader effects for post-processing.
- **Custom SobelShader with Full Colors**: Experiment with various shader effects for post-processing.

## Contributing

Feel free to fork this repository and submit pull requests. Contributions are welcome!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

