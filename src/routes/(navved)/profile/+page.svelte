<script>
    import { enhance } from "$app/forms";

    export let form;
    export let data;
    let currentUser = data.current_user;
</script>
<div class="container">
    <h3>Your Info</h3>
    {#if form?.missing}<p class="error">All fields are required!</p>{/if}
    {#if form?.invalidEmail}<p class="error">Email format is invalid!</p>{/if}
    {#if form?.exists}<p class="error">
        User with that email already exists!
    </p>{/if}
    <form method="post">
        <div class="form">
            <label for="name">
                Name
                <input
                        type="text"
                        placeholder="Name"
                        id="name"
                        name="name"
                        value={currentUser.name ?? ""}
                />
            </label>
            <label for="email">
                Email
                <input
                        type="email"
                        placeholder="Email Address"
                        id="email"
                        name="email"
                        value={currentUser.email ?? ""}
                />
            </label>
            <button>Save Changes</button>
        </div>
    </form>
</div>

<div id="options" class="container">
    <h3>Other Options</h3>
    <form method="post">
        <button>Export Data</button>
        <button>Delete Account</button>
    </form>
</div>

<style>
    h1 {
        margin-left: 0.2em;
    }
    .container {
        margin-top: 5em;
    }
    #options {
        margin-top: 7em;
    }
    #options button {
        width: fit-content;
        margin: 0 5px;
    }
    #options h3 {
        margin-bottom: 0.2em;
    }
    #options form {
        display: flex;
        justify-content: center;
    }
    .container > h3 {
        text-align: center;
    }
    .form {
        max-width: 50%;
        margin: 0 auto;
    }
    .error {
        color: red;
    }
</style>
