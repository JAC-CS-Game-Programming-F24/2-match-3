import Images from '../lib/Images.js';
import StateMachine from '../lib/StateMachine.js';

export const canvas = document.createElement('canvas');
export const context =
	canvas.getContext('2d') || new CanvasRenderingContext2D();
const configFile = './src/config.json';
const config = await fetch(configFile).then((response) => response.json());
export const CANVAS_WIDTH = config.width;
export const CANVAS_HEIGHT = config.height;

const resizeCanvas = () => {
	const scaleX = window.innerWidth / CANVAS_WIDTH;
	const scaleY = window.innerHeight / CANVAS_HEIGHT;
	const scale = Math.min(scaleX, scaleY); // Maintain aspect ratio

	canvas.style.width = `${CANVAS_WIDTH * scale}px`;
	canvas.style.height = `${CANVAS_HEIGHT * scale}px`;
};

window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Call once to scale initially

// Set the dimensions of the play area.
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
canvas.setAttribute('tabindex', '1'); // Allows the canvas to receive user input.

// Now that the canvas element has been prepared, we can add it to the DOM.
document.body.appendChild(canvas);

export const images = new Images(context);
export const stateMachine = new StateMachine();

// Load all the assets from their definitions.
images.load(config.images);
