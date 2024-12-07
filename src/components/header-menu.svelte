<script lang="ts">
	import { ControllerBlockType } from '$lib';
	import IconKeys from './icons/icon-keys.svelte';
	import IconKnobs from './icons/icon-knobs.svelte';
	import IconPads from './icons/icon-pads.svelte';

	const { addBlock, deviceSelect } = $props();
</script>

{#snippet menuItem(label, type, Icon)}
	<button class="icon-button" onclick={() => addBlock(type)}
		><Icon />
		<div class="button-backdrop"><span>{label}</span></div></button
	>
{/snippet}

<header class="mb-12 max-w-72">
	<div class="flex items-center justify-between gap-5">
		<h2 class="mb-2 text-xl font-black uppercase italic">Widgets</h2>
		{@render deviceSelect()}
	</div>
	<nav class="flex gap-2 *:size-20 *:place-content-center">
		{@render menuItem('Knobs', ControllerBlockType.KNOB, IconKnobs)}
		{@render menuItem('Pads', ControllerBlockType.PAD, IconPads)}
		{@render menuItem('Keys', ControllerBlockType.KEY, IconKeys)}
	</nav>
</header>
