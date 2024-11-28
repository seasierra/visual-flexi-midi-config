<script lang="ts">
	import '../app.css';

	import { SvelteToast } from '@zerodevx/svelte-toast';

	let { children } = $props();
</script>

{@render children()}
<aside class="bottom-0 right-0">
	<SvelteToast />
</aside>
