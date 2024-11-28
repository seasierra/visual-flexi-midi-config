<script lang="ts">
	import { toast } from '@zerodevx/svelte-toast';
	import { MIDIVal, MIDIValInput, type IMIDIInput, type NoteMessage } from '@midival/core';
	import { onMount } from 'svelte';
	import { ControlChangeToReadableName } from '@midival/constants';
	import type { MidiEvent } from '$lib/midi';

	let { event: currentEvent = $bindable<MidiEvent>() } = $props();

	let connectedMidiInputs = $state<IMIDIInput[]>([]);
	let currentMidiId = $state('');

	onMount(() => {
		MIDIVal.connect().then((access) => {
			connectedMidiInputs = access.inputs;

			access.onInputConnected((input) => {
				toast.push('MIDI input connected');
			});

			access.onInputDisconnected((input) => {
				toast.push('MIDI input disconnected');
			});
		});
	});

	const handleInputChange = async (e) => {
		const access = await MIDIVal.connect();

		const currentInput = access.inputs.find((v) => v.id === e.target.value);

		const input = new MIDIValInput(currentInput);

		input.onAllNoteOn((event: any) => {
			currentEvent = {
				name: ControlChangeToReadableName[event.control as any],
				type: 'Note',
				data: event
			};
		});

		input.onAllControlChange((event) => {
			currentEvent = {
				name: ControlChangeToReadableName[event.control],
				type: 'CC',
				data: event
			};
		});
	};
</script>

<aside class="absolute right-5 top-5 bg-slate-300 p-5">
	<select bind:value={currentMidiId} onchange={handleInputChange}>
		{#each connectedMidiInputs as input}
			<option value={input.id}>{input.name}</option>
		{/each}
	</select>
	<section>
		<h3>
			Current data: {#if currentEvent}
				<b>{currentEvent.type}: {currentEvent.name}</b>
			{/if}
		</h3>
		{#each Object.entries(currentEvent?.data ?? {}) as [key, value]}
			<div>
				<h4 class="bold inline">{key}:</h4>
				{value}
			</div>
		{/each}
	</section>
</aside>
