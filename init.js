/**
 * Vibly - Initialization script
 *
 * This script helps set up the development environment for Vibly.
 * Run it with: node init.js
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create directories if they don't exist
const directories = [
  'dist',
  'src/themes',
  'src/plugins',
  'src/utils',
  'src/scss/themes',
  'docs',
  'examples'
];

directories.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Install dependencies
console.log('Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('Dependencies installed successfully.');
} catch (error) {
  console.error('Error installing dependencies:', error.message);
  process.exit(1);
}

// Build the project
console.log('Building the project...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('Project built successfully.');
} catch (error) {
  console.error('Error building the project:', error.message);
  console.log('This is expected on first run if the build script requires the dist directory.');
}

console.log('\nVibly development environment is ready!');
console.log('\nAvailable commands:');
console.log('- npm run dev: Start the development server');
console.log('- npm run build: Build the project for production');
console.log('- npm run lint: Lint the code');
console.log('- npm run format: Format the code with Prettier');
console.log('\nTo view examples, open the examples directory in your browser.');
console.log('For more information, see the documentation in the docs directory.');
