import { writable } from "svelte/store";

export const currentConvoId = writable<string | null>(null);
