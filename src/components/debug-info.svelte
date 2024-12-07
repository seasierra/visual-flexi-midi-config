<script>
	const { midiEvent } = $props();
</script>

<aside class="fixed bottom-3 left-3">
	<h3>
		Current data: {#if midiEvent}
			<b>{midiEvent.type}: {midiEvent.name}</b>
		{/if}
	</h3>
	{#each Object.entries(midiEvent?.data ?? {}) as [key, value]}
		<div>
			<h4 class="bold inline">{key}:</h4>
			{value}
		</div>
	{/each}
</aside>
