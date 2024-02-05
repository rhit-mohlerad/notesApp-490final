<script>
    import Markdown from 'svelte-exmarkdown';
    import { gfmPlugin } from 'svelte-exmarkdown/gfm';
    let md = '# Start typing!';
    const plugins = [gfmPlugin()];
</script>


<nav>
    <a href="/homepage"><h1>x</h1></a>
</nav>
<input type="text" id="title" name="title" placeholder="Name your note..." />
<div>
    <textarea bind:value={md} />
    <div class="container">
        <Markdown {md} {plugins} />
    </div>
</div>
<a id="save" role="button" href="/savenote">Save</a>

<style>
    #title {
        max-width: 50%;
        font-size: x-large;
        border: none;
        text-decoration: underline;
    }
    #save {
        margin: 5px;
    }
    div {
        display: flex;
        margin: 1em;
    }
    textarea {
        max-width: 50%;
    }
    .container {
        margin: 1em;
        display: block;
    }
    nav a {
        margin: 5px;
    }
</style>