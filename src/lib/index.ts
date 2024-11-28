// place files you want to import through the `$lib` alias in this folder.
export enum ControllerBlockType {
	KNOB = 'KNOB',
	PAD = 'PAD',
	KEY = 'KEY'
}

export type ControllerBlock = {
	id: string;
	type: ControllerBlockType;
	name?: string;
	size?: number;
	color?: string;
	position?: {
		x: number;
		y: number;
	};
};
