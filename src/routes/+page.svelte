<script lang="ts">
	import { ControllerBlockType, type ControllerBlock } from '$lib';
	import { MIDI, type MidiEvent } from '$lib/midi';
	import { SvelteMap } from 'svelte/reactivity';
	import ControllerMap from '../components/controller-map.svelte';
	import DebugInfo from '../components/debug-info.svelte';
	import HeaderMenu from '../components/header-menu.svelte';
	import Select from '../components/ui/select.svelte';

	const devices = MIDI.getDevices();

	let selectedDevice = $state<string>(null);

	let midiEvent = $state<MidiEvent>();
	$effect(() => {
		if (selectedDevice) {
			MIDI.initDevice(selectedDevice, (e) => {
				midiEvent = e;
			});
		}
	});

	let blockMap = $state<Map<string, ControllerBlock>>(new SvelteMap());

	const addBlock = (type: ControllerBlockType) => {
		const id = crypto.randomUUID();

		blockMap.set(id, {
			id,
			type,
			size: null,
			color: '#000000',
			position: {
				x: 0,
				y: 0
			}
		});
	};
</script>

<main class="px-28 pt-10">
	<DebugInfo {midiEvent} />
	<figure class="background-title fixed left-0 top-0">
		<img src="/synth.bw.webp" alt="Background" />
		<h1 class="absolute font-extrabold uppercase overline">VISUAL AUDIO CONTROL OVER CONFIG</h1>
	</figure>
	<HeaderMenu {addBlock}>
		{#snippet deviceSelect()}
			{#await devices then options}
				<Select placeholder="Select device" bind:value={selectedDevice} {options} />
			{/await}
		{/snippet}
	</HeaderMenu>
	<ControllerMap bind:blockMap />
</main>
