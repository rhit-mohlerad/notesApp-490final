<script>
    export let data;
    export let form;
</script>

<style>
    nav div a {
        margin: 0.2em;
        margin-bottom: 0;
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
        border-radius: 5px;
    }
    .note {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
    }
    li form {
        margin-bottom: 0;
    }
    .note > button {
        align-self: center;
        width: fit-content;
        margin-bottom: 0;
    }
    .note > a {
        align-self: center;
    }

    .success {
        color: green;
    }
    .failure {
        color: red;
    }


</style>

<div class="container">
    <hr>
    <a role="button" href="/notes">New Note</a>
    <div class="container">
        <ul>
            {#each data.current_user_notes as note}
            <li><form method="post"><div class="note"><a href="/notes/{note.id}">{note.name}</a><button name="delButton" value={note.id} type="submit"><i class="fa fa-trash" aria-hidden="true"></i>
            </button></div></form></li>
            {/each}
        </ul>
    </div>
    {#if form?.success}
        <p class="success">Successfully deleted note!</p>
    {/if}

    {#if form && !form?.success}
        <p class="failure">Note deletion unsuccessful. Oh no!</p>
    {/if}
</div>
