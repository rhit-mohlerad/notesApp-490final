<script>
    export let data;
</script>

<style>
    nav a h1, nav div a {
        margin: 0.2em;
        margin-bottom: 0;
    }
    nav {
        margin-right: 0.5em;
    }
    .container {
        margin-top: 2em;
    }

    div>.container {
        margin-top: 2em;
        text-align: center;
        max-width: 80%;
    }

    hr {
        border-top-width: 2px;
        border-color: lightgray;
    }
    li {
        list-style: none;
        padding: 1em;
        border: 1px solid lightgray;
        border-radius: 4%;
    }
    .note {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
    }
    .note > button {
        align-self: center;
        width: fit-content;
        margin-bottom: 0;
    }
    .note > a {
        align-self: center;
    }


</style>

<div class="container">
    <hr>
    <a role="button" href="/notes">New Note</a>
    <div class="container">
        <ul>
            {#each data.current_user_notes as note}
            <li><div class="note"><a href="/notes/{note.id}">{note.name}</a><button type="button"><i class="fa fa-trash" aria-hidden="true"></i>
            </button></div></li>
            {/each}
        </ul>
    </div>
</div>
