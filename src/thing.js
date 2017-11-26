import { Render, Transform } from 'cervus/components';
import { material } from './globals';
import { Box } from 'cervus/shapes';
import { Entity } from 'cervus/core/';

export class Thing {
	constructor(options = {}) {
		this.shape = options.shape;
		this.elements = [];

		this.color = options.color || '#FFFF00';

		this.transform = new Transform();
		this.group = new Entity({
			components: [
				this.transform
			]
		});

	}

	build_from_shape(shape) {
		const group = new Entity({
			components: [
				new Transform()
			]
		});

		shape.forEach((row, y) => {
			row.forEach((el, x) => {
				if (el === 0) {
					return;
				}

				const box = new Box();
				this.elements.push(box);
				box.get_component(Transform).position = [ x, y, 0 ];
				box.render_component = box.get_component(Render);
				box.render_component.material = material;
				box.render_component.color = this.color;
				group.add(box);
			});
		});

		return group;
	}

	set scale(scale) {
		this._scale = scale;
		this.transform.scale = [
			scale,
			scale,
			scale
		]
	}

	set position({x, y}) {
		this.transform.position = [x, y, 0];
	}

	get position() {
		return {
			x: this.transform.position[0],
			y: this.transform.position[1]
		}
	}

	change_color(color) {
		this.elements.forEach((el) => {
			el.render_component.color = color;
		});
	}
}
