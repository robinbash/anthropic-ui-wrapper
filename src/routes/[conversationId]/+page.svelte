<script lang="ts">
	import { Convo } from '$lib/components';
	import { page } from '$app/stores';
</script>

<Convo convoId={$page.params.conversationId} />
