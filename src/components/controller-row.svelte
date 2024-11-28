<script lang="ts">
	const { block, onAdd, onRemove } = $props();

	let size = $state<number>(block.size || null);

	const handleChangeBlockSize = (e) => {
		size = parseInt(e.target.value) || null;
	};
</script>

<div class="relative h-24 w-[70vw] border border-black">
	<h4 class="absolute left-1 top-1 font-black italic">{block.type}S</h4>
	<footer class="absolute -bottom-3 -left-8 flex gap-5">
		<button
			class:disabled={!size}
			class="action bg-indigo-500 bg-opacity-50 px-5 text-2xl uppercase hover:bg-opacity-90"
			onclick={() => onAdd(block.id)}>Add</button
		>
		<button
			class="action bg-rose-300 bg-opacity-50 px-5 text-2xl uppercase hover:bg-opacity-90"
			onclick={() => onRemove(block.id)}>Remove</button
		>
	</footer>

	<input
		type="text"
		class="block h-full w-full px-4 text-right text-[48px]"
		placeholder="Enter amount"
		value={size}
		onchange={handleChangeBlockSize}
	/>
</div>
