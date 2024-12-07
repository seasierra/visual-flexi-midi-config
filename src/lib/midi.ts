import { ControlChangeToReadableName } from '@midival/constants';
import { MIDIVal, MIDIValInput, type ControlChangeMessage, type NoteMessage } from '@midival/core';
import { toast } from '@zerodevx/svelte-toast';

export type MidiEvent = {
	name?: string;
	type: 'Note' | 'CC';
	data: NoteMessage | ControlChangeMessage;
};

export const LAST_MIDI_ID = 'midi.last.id';

const getDevices = async () => {
	const access = await MIDIVal.connect();

	access.onInputConnected((input) => {
		toast.push('MIDI input connected');
	});

	access.onInputDisconnected((input) => {
		toast.push('MIDI input disconnected');
	});

	return access.inputs;
};

const initDevice = async (id: string, onEvent: (event: MidiEvent) => void) => {
	const access = await MIDIVal.connect();

	const currentInput = access.inputs.find((v) => v.id === id);

	if (!currentInput) {
		toast.push('MIDI input not found');
		return;
	}

	localStorage.setItem(LAST_MIDI_ID, currentInput.id);

	const input = new MIDIValInput(currentInput);

	input.onAllNoteOn((event) => {
		onEvent({
			type: 'Note',
			data: event
		});
	});

	input.onAllControlChange((event) => {
		onEvent({
			name: ControlChangeToReadableName[event.control],
			type: 'CC',
			data: event
		});
	});
};

export const MIDI = {
	getDevices,
	initDevice
};
