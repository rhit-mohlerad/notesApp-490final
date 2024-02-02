<script>
    import { enhance } from "$app/forms";

    export let form;
</script>

<a href="/"><h1>Notes</h1></a>
<div class="container">
    <p>Welcome!</p>
    {#if form?.missing}<p class="error">All fields are required!</p>{/if}
    {#if form?.invalidEmail}<p class="error">Email format is invalid!</p>{/if}
    {#if form?.incorrect}<p class="error">Passwords don't match!</p>{/if}
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
                    value={form?.name ?? ""}
                />
            </label>
            <label for="email">
                Email
                <input
                    type="email"
                    placeholder="Email Address"
                    id="email"
                    name="email"
                    value={form?.email ?? ""}
                />
            </label>

            <label for="password">
                Password
                <input type="password" id="password" name="password" />
            </label>
            <label for="password_confirmation">
                Confirm Password
                <input
                    type="password"
                    id="password_confirmation"
                    name="password_confirmation"
                />
            </label>

            <button>Sign Up</button>
        </div>
    </form>
</div>

<style>
    h1 {
        margin-left: 0.2em;
    }
    .container {
        margin-top: 5em;
    }
    .container > p {
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
