import Quadtree from './qt.js';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const AMOUNT_OF_ENTITIES = 50;

const SCALE = 0.6;
canvas.width = 1920 * SCALE;
canvas.height = 1080 * SCALE;

const qt = new Quadtree({
	x: 0,
	y: 0,
	width: canvas.width,
	height: canvas.height,
});

class Mouse {
	constructor() {
		this.x = 0;
		this.y = 0;
		this.width = canvas.width / 4;
		this.height = canvas.height / 4;
	}
	update() {
		this.draw();
		qt.retrieve({
			x: this.x - this.width / 2,
			y: this.y - this.height / 2,
			width: this.width,
			height: this.height,
		}).forEach(ent => (ent.color = 'green'));
	}
	draw() {
		c.save();
		c.strokeStyle = 'white';
		c.rect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
		c.stroke();
		c.restore();
	}
}
const mouse = new Mouse();

window.onmousemove = e => {
	mouse.x = e.clientX;
	mouse.y = e.clientY;
};

class Circle {
	constructor() {
		this.radius = this.width = this.height = randomNumber(4, 15);
		this.x = randomNumber(this.radius, canvas.width - this.radius);
		this.y = randomNumber(this.radius, canvas.height - this.radius);
		this.color = 'red';
	}
	draw() {
		c.save();
		c.beginPath();
		c.fillStyle = this.color;
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		c.fill();
		c.restore();
		this.color = 'red';
	}
}

let entities = [];
for (let i = 0; i < AMOUNT_OF_ENTITIES; i++) entities.push(new Circle());

function animate() {
	c.clearRect(0, 0, canvas.width, canvas.height);

	// reset quadtree
	qt.clear();
	entities.forEach(ent => qt.insert(ent));

	mouse.update();

	entities.forEach(ent => ent.draw());

	requestAnimationFrame(animate);
}
animate();

function randomNumber(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}
