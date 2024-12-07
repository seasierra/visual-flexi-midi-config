<script lang="ts">
	import ControllerRow from './controller-row.svelte';

	const { blockMap = $bindable() } = $props();

	$effect(() => {
		console.log(blockMap);
	});

	const onAdd = (id: string, size: number) => {
		blockMap.set(id, {
			...blockMap.get(id),
			size
		});
	};

	const onRemove = (id: string) => {
		blockMap.delete(id);
	};
</script>

<section class="grid gap-5">
	{#each blockMap as [id, block] (id)}
		<ControllerRow {block} {onAdd} {onRemove} />
	{/each}
</section>
