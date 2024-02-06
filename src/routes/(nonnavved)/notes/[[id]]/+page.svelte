<script>
    import Markdown from 'svelte-exmarkdown';
    import { gfmPlugin } from 'svelte-exmarkdown/gfm';
    const plugins = [gfmPlugin()];
    export let form;
    export let data;

    let md = data.current_note.content;

</script>

<form method="post">
<nav>
    <a href="/homepage"><i class="fa-solid fa-xmark"></i></a>
    <label for="title" hidden>Note title</label>
    <input type="text" id="title" name="title" value={data.current_note.name} placeholder="Name your note..." />
    <button id="save">Save Note</button>
</nav>
    {#if form?.missing}<p class="error">Note title and/or content cannot be empty.</p>{/if}
<div>
    <label hidden for="textarea">Note text content</label>
    <textarea name="textarea" id="textarea" bind:value={md} />
    <div class="container">
        <Markdown {md} {plugins} />
    </div>
</div>

</form>
<style>
    #title {
        max-width: 50%;
        font-size: x-large;
        border: none;
        text-decoration: underline;
    }
    #save {
        margin: 5px;
        height: fit-content;
        width: fit-content;
    }
    input {
        width: fit-content;
        text-align: center;

    }
    div {
        display: flex;
        margin: 1em;
    }
    textarea {
        max-width: 50%;
    }
    i {
        font-size: xxx-large;
    }
    .container {
        margin: 1em;
        display: block;
    }
    nav {
        margin-top: 2em;
        display: flex;
        justify-content: space-between;
    }
    nav a {
        margin: 5px;
        padding-top: 0;
        margin-bottom: 0;
    }
    nav a h1 {
        padding-top: 0;
        margin-bottom: 0;
    }
</style>