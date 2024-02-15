<script>
    import {afterUpdate, onMount} from "svelte";
    export let data;
    export let form;

    let currentCategory;

    onMount(() => {
        updateActiveCategory();
    });

    afterUpdate(() => {
        updateActiveCategory();
    });

    function updateActiveCategory() {
        const currentUrl = window.location.pathname;
        currentCategory = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
    }
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

    #categories li {
        list-style-type: none;
        background: hsl(195, 85%, 41%);
        color: white;
        margin: 0 0.2em;
        padding: 0.20em 0.9em;
        border-radius: 5%;
    }

    #categoryList a {
        margin: 0.2em 0.2em;
        padding: 0.20em 0.9em;
        border-radius: 5%;
        width: 100%;
    }

    #categories {
        display: flex;
        margin-top: 0;
    }

    #categories div {
        align-self: center;
    }

    #screen {
        display: flex;
        justify-content: center;
    }

    #screen .container{
        text-align: left;
        margin-left: auto;
        margin-right: auto;
        max-width: 80%;
    }
    #categoryList #categories-text {
        background: none;
        margin: 0;
        padding: 0;
        border: none;
        border-bottom: black;
    }

    #categoryList {
        text-align: center;
    }

    #reset {
        font-size: larger;
    }

    #categoryList a.active {
        background-color: hsl(195, 85%, 20%);
    }

</style>
<hr width="75%">
<div id="screen">
    <div>
        <ul id="categoryList">

            <li id="categories-text"><h3>Categories</h3></li>
            {#if data.just_categories.length != 0}
            <div><a id="reset" href="/homepage">Reset</a></div>
            {/if}
            {#each data.just_categories as category}
            <div><a class:active={category.categoryName === currentCategory} role="button" href="/homepage/{category.categoryName}">{category.categoryName}</a></div>
            {/each}
            {#if data.just_categories.length == 0}
                <li id="categories-text"><p>No categories yet!</p></li>
            {/if}
        </ul>
    </div>
    <div class="container">

        <a role="button" href="/notes">New Note</a>
        <div class="container">
            <ul>
                {#each data.current_user_notes as note}
                    <li>
                        <form method="post"><div class="note"><a href="/notes/{note.id}">{note.name}</a><button name="delButton" value={note.id} type="submit"><i class="fa fa-trash" aria-hidden="true"></i>
                        </button></div></form>

                        <ul id="categories">
                            <div>Categories:</div>
                            {#each data.note_categories as category}
                                {#if category.noteID == note.id}
                                    <li>{category.categoryName}</li>
                                {/if}
                            {/each}
                        </ul>
                    </li>
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

</div>

