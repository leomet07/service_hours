<script lang="ts">
	import type { ZodIssue } from "zod";

	export let issues: ZodIssue[] | undefined;
</script>

{#if issues}
	{#each issues as issue}
		<h3>Field: {issue.path[0]}</h3>
		<p>{issue.message}</p>
	{/each}
{/if}
