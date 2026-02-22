# Adobe CEP Panel Extension Framework

A TypeScript-based Adobe Common Extensibility Platform (CEP) panel extension that provides a reusable framework for building extensions for Adobe Creative Cloud applications. This project includes utility libraries for common ExtendScript operations and a modular structure for easy extension development.

## Overview

This is a CEP 9.0 panel extension that allows you to build custom panels for Adobe applications with a modern TypeScript/JavaScript frontend and ExtendScript backend. The extension currently targets **Adobe After Effects** (v13.0 and above) but can be easily configured to support other Adobe apps like Photoshop, Illustrator, InDesign, Premiere Pro, and more.

## Features

- **Modern Frontend**: Built with HTML/CSS/JavaScript with Topcoat styling for native Adobe look
- **TypeScript Support**: Full TypeScript support for type-safe development
- **ExtendScript Integration**: Seamless communication between the panel UI and Adobe applications via ExtendScript
- **Utility Libraries**: Pre-built utility functions for:
  - Object manipulation
  - String operations
  - Array operations
  - JSON handling
- **Build Pipeline**: Automated build process using esbuild and Babel
- **Theme Support**: Built-in dark theme support for Adobe applications

## Installation

1. **Clone or download** this extension to your Adobe CEP extensions folder:
   - **Windows**: `C:\Users\[YourUsername]\AppData\Roaming\Adobe\CEP\extensions\`
   - **Mac**: `~/Library/Application Support/Adobe/CEP/extensions/`

2. **Enable Debug Mode** (required for loading unsigned extensions):
   - Create or edit `PlayerDebugMode` file in the CEP configuration folder:
     - **Windows**: `C:\Users\[YourUsername]\AppData\Roaming\Adobe\CEP\`
     - **Mac**: `~/Library/Application Support/Adobe/CEP/`
   - Add this line: `PlayerDebugMode=1`

3. **Place extension folder** in your CEP extensions directory with the bundle ID `com.framework.panel`

4. **Restart the Adobe application** to load the extension

## Development

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Adobe application (After Effects v13.0+, or other supported Adobe apps)

### Setup

```bash
# Install dependencies
npm install

# Build the project
npm run build
```

### Build Process

The build script (`build.js`) handles:
- TypeScript compilation
- Bundling with esbuild
- Asset processing

Run the build command to generate optimized JavaScript files in the `js/` directory.

## Project Structure

```
com.framework.panel/
├── index.html              # Main panel UI
├── index.ts                # Entry point (TypeScript)
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── build.js                # Build configuration
│
├── css/                    # Stylesheets
│   ├── styles.css         # Custom styles
│   ├── boilerplate.css    # Base styles
│   └── topcoat-desktop-dark.min.css  # Adobe Topcoat theme
│
├── js/                     # Compiled JavaScript
│   ├── main.js            # UI interaction logic
│   ├── themeManager.js    # Handle Adobe theme changes
│   └── libs/
│       ├── CSInterface.js # Adobe CEP API (do not modify)
│       └── jquery-2.0.2.min.js  # jQuery library
│
├── jsx/                    # ExtendScript files
│   └── hostscript.jsx     # ExtendScript host code
│
├── library/                # Utility TypeScript libraries
│   ├── library.ts         # Main export
│   ├── object.ts          # Object utilities
│   ├── string.ts          # String utilities
│   ├── array.ts           # Array utilities
│   ├── json.ts            # JSON utilities
│   └── *.d.ts             # Type definitions
│
├── CSXS/                   # Extension configuration
│   └── manifest.xml       # CEP manifest with app support
│
└── icons/                  # Panel icons
```

## Configuration

### Supported Adobe Applications

Edit `CSXS/manifest.xml` to enable/disable support for different Adobe applications. Uncomment the desired `<Host>` tags:

```xml
<!-- Photoshop -->
<Host Name="PHXS" Version="[16.0,99.9]" />
<Host Name="PHSP" Version="[16.0,99.9]" />

<!-- Illustrator -->
<Host Name="ILST" Version="[18.0,99.9]" />

<!-- InDesign -->
<Host Name="IDSN" Version="[10.0,99.9]" />

<!-- Premiere Pro -->
<Host Name="PPRO" Version="[8.0,99.9]" />

<!-- After Effects (enabled by default) -->
<Host Name="AEFT" Version="[13.0,99.9]" />
```

## Usage

### From the Panel

1. Open the Adobe application (After Effects by default)
2. Go to **Windows → Framework** to open the panel
3. Click **"Call ExtendScript"** to execute ExtendScript code

### Extending the Panel

1. **Modify the UI**: Edit `index.html` to add new buttons, inputs, etc.
2. **Add Logic**: Update `js/main.js` to handle UI events
3. **Call ExtendScript**: Use the CSInterface API to execute code in After Effects:
   ```javascript
   const csInterface = new CSInterface();
   csInterface.evalScript('alert("Hello from After Effects!");');
   ```

4. **Build**: Run `npm run build` to compile TypeScript changes

## Dependencies

- **TypeScript**: For type-safe development
- **esbuild**: Fast JavaScript bundler
- **Babel**: JavaScript transpiler
- **Topcoat CSS**: Adobe's CSS framework for native styling
- **jQuery**: DOM manipulation library

## License

ISC

## Notes

- This extension requires debug mode to be enabled for loading unsigned extensions
- Panel size can be configured in `CSXS/manifest.xml` under the `<Geometry>` section
- The CEP version is set to 9.0; adjust if targeting specific Adobe versions
- Icon files should be placed in the `icons/` directory and referenced in `manifest.xml`

## Troubleshooting

- **Extension not appearing**: Ensure debug mode is enabled and the folder is in the correct CEP extensions location
- **Script errors**: Check the browser console (F12) in the extension panel for JavaScript errors
- **ExtendScript not working**: Verify the host application is properly targeted in `manifest.xml`
