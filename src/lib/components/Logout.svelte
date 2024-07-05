<script lang="ts">
	import { logout } from '$lib/auth';
</script>

<button on:click={logout}>{'> Log out'}</button>
