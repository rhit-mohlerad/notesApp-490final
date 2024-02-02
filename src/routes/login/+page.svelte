<script>
    import {page} from '$app/stores';
    const logout = $page.url.searchParams.has("logout");
    const signupsuccess = $page.url.searchParams.has("signupsuccess");
    export let form;
</script>

<a href="/"><h1>Notes</h1></a>
<div class="container">
    <p>Welcome back!</p>
    {#if form?.incorrect}<p class="error">
            Email and/or Password incorrect.
        </p>{/if}
    {#if logout}<p class="success">Logged out. Please Log In.</p>{/if}
    {#if signupsuccess}<p class="success">Account Created! Please Log In!</p>{/if}
    <form method="post">
        <div class="form">
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
            <button>Log In</button>
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
    .success {
        color: green;
    }
</style>
