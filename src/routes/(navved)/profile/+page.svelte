<script>
    import { enhance } from "$app/forms";
    import Modal from './Modal.svelte';
    export let form;
    export let data;
    let currentUser = data.current_user;
    let showModal = false;
</script>
<div class="container">
    <h3>Your Info</h3>
    {#if form?.missing}<p class="error">All fields are required!</p>{/if}
    {#if form?.invalidEmail}<p class="error">Email format is invalid!</p>{/if}
    {#if form?.exists}<p class="error">
        User with that email already exists!
    </p>{/if}
    <form method="post" action="?/updateProfile">
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

    <Modal bind:showModal id="modal">
        <h2 slot="header">
            Are you sure you want to delete your entire account?
        </h2>

        <div>
            If you do this, you will lose all data and the ability to log in to our wonderful
            app without creating an account again.
            We suggest that you export your data if you haven't already.
            <br>
            <br>
            Are you sure you want to continue?
        </div>
        <form method="post" action="?/deleteAccount">
        <button>Yes, I am positive</button>
        </form>
    </Modal>
</div>

<div id="options" class="container">
    <h3>Other Options</h3>
    <form>
        <a role="button" target="_blank" href="/profile/download-notes">Export Data</a>
        <button on:click={() => (showModal = true)}>Delete Account</button>
    </form>
</div>



<style>
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
