<script>
    import Markdown from 'svelte-exmarkdown';
    import {gfmPlugin} from 'svelte-exmarkdown/gfm';
    import {onMount} from "svelte";

    const plugins = [gfmPlugin()];
    export let form;
    export let data;

    let md = data.current_note.content;
    let categories = [];
    data.note_categories?.forEach((category) => {
        categories.push(category.categoryName);
    });

    let categoriesJSON = JSON.stringify(categories);
    const addCategory = () => {
        const addCategoryInput = document.getElementById("addCategory");

        if (addCategoryInput) {
            const text = addCategoryInput.value.trim();

            if (text && !categories.includes(text) && text !== '') {
                categories = [...categories, text];
                categoriesJSON = JSON.stringify(categories);
                categories.forEach((category) => {
                    console.log(category);
                });


            }
            addCategoryInput.value = '';
        }
    }

    const removeCategory = (e) => {
        console.log(e.target.parentNode.parentNode.innerText)
        let text = e.target.parentNode.parentNode.innerText.trim();
        categories = categories.filter(s => s !== text);
        categoriesJSON = JSON.stringify(categories);
    }

</script>

<form method="post" action="?/saveNote">
    <nav id="titleNav">
        <a href="/homepage"><i class="fa-solid fa-xmark"></i></a>
        <label for="title" hidden>Note title</label>
        <input type="text" id="title" name="title" value={data.current_note.name} placeholder="Name your note..."/>
        <button id="save">Save Note</button>
    </nav>
    <div id="categoryForm">
        <p>Add categories to your note here!</p>
        <nav>
            <input type="text" id="addCategory" name="addCategory" placeholder="New Category"/>
            <button type="button" on:click={addCategory} >Add Category</button>
        </nav>
    </div>



    <div>
        <label hidden for="textarea">Note text content</label>
        <textarea name="textarea" id="textarea" bind:value={md}/>
        <div class="container">
            <Markdown {md} {plugins}/>
        </div>
    </div>
    <div id="categoriesContainer">
        <input type="hidden" name="categories" bind:value={categoriesJSON} />
        <p>Categories:</p>
        <ul>
            {#each categories as category}
                <li class="category">{category}
                <a on:click={removeCategory}><i class="fa-solid fa-xmark"></i></a>
                </li>
            {/each}
        </ul>
    </div>
    {#if form?.missing}<p class="error">Note title and/or content cannot be empty.</p>{/if}
</form>
<style>
    #title {
        max-width: 50%;
        font-size: x-large;
        border: none;
        text-decoration: underline;
    }
    #categoriesContainer {
        text-align: left;
        display: block;
    }
    #categoriesContainer i {
        color: white;
        font-size: 20px;
    }
    #categoriesContainer i:hover {
        color: darkgray;
    }

    div ul {
        display: flex;
    }
    .category {
        list-style-type: none;
        background: hsl(195, 85%, 41%);
        color: white;
        margin: 0 0.2em;
        padding: 0.5em 1em;
        border-radius: 5%;
    }

    #categoryForm {
        flex-direction: column;
        max-width: 50%;
    }
    #categoryForm p, #categoriesContainer p {
        text-align: left;
    }
    #categoryForm nav {
        justify-content: left;
    }
    #categoryForm button {
        width: fit-content;
        margin-left: 0.4em;
    }

    #save {
        margin: 5px;
        height: fit-content;
        width: fit-content;
    }

    form p {
        text-align: center;
    }

    .error {
        color: red;
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

    #titleNav {
        margin-top: 2em;
        display: flex;
        justify-content: space-between;
    }

    #titleNav a {
        margin: 5px;
        padding-top: 0;
        margin-bottom: 0;
    }
</style>