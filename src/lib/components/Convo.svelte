<script lang="ts">
  import Anthropic from "@anthropic-ai/sdk";
  import { currentConvoId } from "../stores";

  let text = "";
  let inputEl: HTMLDivElement;
  const client = new Anthropic({
    apiKey: "",
  });

  const submitMessage = async () => {
    const message = inputEl.innerText;
    if (!message) return;
    console.log(message);
    client.messages
      .stream({
        messages: [{ role: "user", content: "Hello" }],
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 1024,
      })
      .on("text", (newText) => {
        text = newText;
      });
  };
</script>

<div class="convo">
  <div class="messages">{text}</div>
  <div class="bottom">
    <div class="input" contentEditable bind:this={inputEl} />
    <div>
      <button on:click={submitMessage}>{">"}</button>
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
    padding: 3rem;
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
