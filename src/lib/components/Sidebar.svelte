<script lang="ts">
  import { currentConvoId } from "$lib/stores";
</script>

<div class="sidebar">
  <div class="convolist">
    <div class="buttondiv">
      <button on:click={() => currentConvoId.set(null)}>New</button>
    </div>
    <div class="convoitem">srjfdklsfskdfjlskdjfasdklasj sdkfj asyf</div>
  </div>
</div>

<style>
  .sidebar {
    border-right: 1px solid;
    border-color: gray;
    height: 100%;
    width: 13rem;
  }
  .convolist {
    display: grid;
    justify-content: center;
    padding-top: 2rem;
  }
  .convoitem {
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    padding: 0.5rem 1rem;
  }
  .convoitem:hover {
    background-color: gray;
  }
  .buttondiv {
    display: flex;
    justify-content: center;
  }
  button {
    width: 8rem;
    height: 2rem;
  }
</style>
