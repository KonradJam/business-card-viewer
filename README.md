# 3D Business Card Visualizer
#### Video Demo: [Link]
#### Final Project for Harvard CS50x
#### Author: Konrad Jamroziak
#### edX Login: Konrad Jamroziak
#### GitHub Username: Konrad Jam
#### Location: Kalisz/Poland

## Description

The **3D Business Card Visualizer** is a web-based application designed to bridge the gap between technical print preparation and client visualization. As a professional DTP (Desktop Publishing) operator with over a decade of experience, I have frequently encountered a recurring challenge: clients often struggle to imagine how specialized print finishes, such as **Spot UV varnish** or **Embossing**, will look on a physical product. 

In the printing industry, these finishes are typically represented in design files as flat, black-and-white graphics. For instance, a black shape on a separate page indicates where the varnish should be applied. While this is perfectly functional for a printing press, it is unintuitive for a customer. The goal of this project is to provide a realistic, interactive 3D environment where these effects are rendered dynamically, allowing users to rotate, flip, and inspect their designs under various lighting conditions.

The application allows users to:
1.  **Upload Custom Designs:** Users can upload PDF files for the front and back of the card.
2.  **Visualize Special Finishes:** By uploading separate PDFs for Spot UV or Embossing masks, the app applies these effects in real-time.
3.  **Adjust Material Properties:** Users can switch between different paper types (Matte/Glossy) and foil finishes.
4.  **Configure Formats:** Supports standard business card dimensions and orientations (Landscape/Portrait).
5.  **Interactive Camera:** A fully controllable 3D camera with presets for specific views.

## Technical Stack

The project is built as a modern web application using the following technologies:
*   **Three.js:** The core 3D engine used to create the scene, lighting, and the card model. I utilized the `MeshPhysicalMaterial` to simulate realistic optical properties like clearcoat (for varnish) and displacement mapping (for embossing).
*   **PDF.js:** A powerful library by Mozilla used to parse PDF files. This was crucial because PDF is the industry standard for print. The app renders PDF pages onto a hidden canvas, which is then converted into a `THREE.CanvasTexture`.
*   **Vite:** Used as the build tool and development server for its speed and efficient module handling.
*   **Vanilla JavaScript (ES6+):** I chose to avoid heavy frameworks like React or Angular to keep the application lightweight and to demonstrate a deep understanding of DOM manipulation and asynchronous programming.
*   **CSS3:** Custom styling using modern CSS features like Flexbox, Grid, and Popover API for the user interface.

## File Structure

### Project Root
*   `index.html`: The main entry point that provides the container for the 3D scene and the UI overlay.
*   `package.json`: Manages project dependencies (`three`, `pdfjs-dist`) and build scripts.
*   `vite.config.js`: Configuration for the Vite bundler.

### `src/` Folder
*   `main.js`: Initializes the application by calling `createApp`.
*   `style.css`: Contains all visual styling for the application, including the sidebar and top bar.

### `src/app/` Folder
*   `app.js`: Sets up the basic HTML structure of the app and initializes the 3D scene and menu.
*   `components/`: Contains UI modular components like `sidebar.js`, `btnSection.js`, and `uploadFileSection.js`.

### `src/camera/` Folder
*   `setCameraView.js` & `viewPresets.js`: Logic for managing camera positions and smooth transitions between different perspectives.

### `src/card/` Folder
*   `cardFormats.js`: Defines standard sizes like 90x50mm or 85x55mm.
*   `finishPresets.js` & `finishUvPresets.js`: Configuration objects for material properties (roughness, clearcoat, etc.).
*   `getCardDimensions.js`: Helper function to calculate scaled dimensions for the 3D mesh.

### `src/menu/` Folder
*   This folder contains the bulk of the UI interaction logic.
*   `initMenu.js`: Orchestrates the initialization of all UI event listeners.
*   `uploadManager.js`: Handles the complex logic of linking file inputs to the 3D model.
*   `selectSample.js`: Loads pre-defined sample files for demonstration.
*   `toggleEmboss.js` & `setFinishToggle.js`: Logic for switching between different visual states.

### `src/pdf/` Folder
*   `handlePdfUpload.js`: Acts as a bridge between the file input and the texture renderer.
*   `renderPdfToTexture.js`: The most technically challenging part of the project. It uses `pdfjs-dist` to render PDF pages to a canvas at high resolution, ensuring the 3D textures remain crisp.

### `src/scene/` Folder
*   `initScene.js`: The main orchestration file for the 3D environment.
*   `createCard.js`: Defines the 3D geometry and the sophisticated `MeshPhysicalMaterial` setup that allows for multi-layered textures (Color, Varnish, Embossing).
*   `createLights.js`: Sets up a multi-light system (Ambient, Front, Back) to ensure the card is visible from all angles.
*   `createRenderer.js`, `createCamera.js`, `createScene.js`: Modular setup for Three.js boilerplate.

## Design Choices

One of the major technical decisions was using **displacement mapping** for the embossing effect. Initially, I considered using normal maps, but normal maps only simulate how light interacts with a surface without actually moving the vertices. Displacement mapping, combined with a high-poly geometry (`BoxGeometry` with 400x400 segments), allows the card to actually physically deform in the 3D space, which is much more realistic for showing the tactile nature of embossing.

Another challenge was **PDF color spaces**. Print PDFs often use CMYK, but Three.js and web canvases operate in RGB. I implemented the texture rendering in a way that converts the PDF data into an `sRGB` color space texture, ensuring visual consistency on most monitors.

For the **Spot UV varnish**, I utilized the `clearcoat` properties of Three.js. By applying the UV mask PDF as a `clearcoatMap`, I can make specific parts of the card more reflective than others, perfectly mimicking how varnish sits on top of paper.

## Installation & Usage

To run this project locally, you will need [Node.js](https://nodejs.org/) installed on your machine.

1.  **Clone the repository:**
    ```bash
    git clone [INSERT REPO URL]
    cd business-card-viewer
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

4.  **Open the application:**
    Vite will provide a local URL (usually `http://localhost:5173`). Open this in your browser.

5.  **Using the App:**
    *   Use the **Sidebar** to load a sample project to see the effects in action.
    *   Rotate the card using your mouse (Left-click to rotate, Right-click to pan, Scroll to zoom).
    *   Upload your own PDFs to test your designs! Note: For best results, ensure your PDF masks for UV/Embossing are black on a white or transparent background.

## Acknowledgments

This project was developed as a final submission for **CS50x: Introduction to the Computer Science** from Harvard University. Special thanks to the CS50 team for an incredible learning journey.
