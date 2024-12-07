<script>
	import IconDown from '../icons/icon-down.svelte';

	let { value = $bindable(), options = [], placeholder } = $props();

	const label = $derived(options.find((option) => option.id === value)?.name);
</script>

<div class="relative w-full">
	<div class="pointer-events-none absolute flex w-full items-center gap-2">
		<p class="truncate text-sm font-black uppercase italic">
			{label || placeholder}
		</p>
		<IconDown />
	</div>
	<select class="w-full appearance-none bg-none opacity-0" bind:value>
		{#each options as option (option.id)}
			<option value={option.id}>{option.name}</option>
		{/each}
	</select>
</div>
