<script lang="ts">
	import { ControllerBlockType, type ControllerBlock } from '$lib';
	import type { MidiEvent } from '$lib/midi';
	import ControllerRow from '../components/controller-row.svelte';
	import ControllerSelector from '../components/controller-selector.svelte';
	import IconKeys from '../components/icons/icon-keys.svelte';
	import IconKnobs from '../components/icons/icon-knobs.svelte';
	import IconPads from '../components/icons/icon-pads.svelte';

	let currentEvent = $state<MidiEvent>();

	let blockMap = $state<ControllerBlock[]>([]);

	const handleAdd = (type: ControllerBlockType) => () => {
		blockMap = [
			...blockMap,
			{
				id: crypto.randomUUID(),
				type,
				size: null,
				color: '#000000',
				position: {
					x: 0,
					y: 0
				}
			}
		];
	};

	const handleChangeBlockSize = (id: string) => {
		const target = event.target as HTMLInputElement;
		const block = blockMap.find((block) => block.id === id);
		if (!block) return;
		block.size = parseInt(target.value);
	};

	const onRemove = (id: string) => {
		blockMap = blockMap.filter((block) => block.id !== id);
	};
</script>

<main class="px-28 pt-10">
	<ControllerSelector bind:event={currentEvent} />
	<header class="mb-12">
		<h2 class="mb-2 text-xl font-black uppercase italic">Widgets</h2>
		<nav class="flex gap-2 *:size-20 *:place-content-center">
			<button class="icon-button" onclick={handleAdd(ControllerBlockType.KNOB)}
				><IconKnobs />
				<div class="button-backdrop"><span>Knobs</span></div></button
			>
			<button class="icon-button" onclick={handleAdd(ControllerBlockType.PAD)}
				><IconPads /> <span>Pads</span>
			</button>
			<button class="icon-button" onclick={handleAdd(ControllerBlockType.KEY)}
				><IconKeys /><span>Keys</span></button
			>
		</nav>
	</header>
	<section class="grid gap-5">
		{#each blockMap as block (block.id)}
			<ControllerRow {block} onAdd={handleChangeBlockSize} {onRemove} />
		{/each}
	</section>
</main>
