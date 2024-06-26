<script lang="ts">
  import { currentConvoId } from "../stores";
  let inputEl: HTMLDivElement;
</script>

<div class="convo">
  <div class="messages"></div>
  <div class="bottom">
    <!-- <textarea />  -->
    <div class="input" contentEditable bind:this={inputEl} />
    <div>
      <button
        on:click={() => {
          console.log(inputEl.innerText);
        }}>{">"}</button
      >
    </div>
  </div>
</div>

<style>
  .convo {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .messages {
    height: 100%;
  }
  .bottom {
    display: flex;
    justify-content: center;
    align-items: end;
    padding: 3rem;
    gap: 0.5rem;
  }
  .input {
    width: 25rem;
    /* height: 1rem; */
    border-radius: 1rem;
    background-color: gray;
    padding: 0.5rem 1rem;
  }
  .input:focus {
    outline: none;
  }
  button {
    width: 3rem;
    height: 2.5rem;
    border-radius: 1rem;
    font-weight: bold;
    background-color: gray;
  }
</style>
