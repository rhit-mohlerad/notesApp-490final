<script>
    export let data;
</script>

<nav>
    <a href="/"><h1>Notes</h1></a>
    <div>
        {#if data?.email}
            <form method="POST" action="?/logout">
                <button>Log Out</button>
            </form>
        {:else}
            <a href="/login">Log In</a>
            <a href="/signup" role="button">Sign Up</a>
        {/if}
    </div>
</nav>

<div class="container">
    <h2>Like Google Keep, but better!</h2>
    <p>Simplistic, effective webapp for Markdown editing</p>
    <a role="button" href="/signup">Get Started!</a>
</div>

<style>
    nav a h1, nav div a {
        margin: 0.2em;
        margin-bottom: 0;
    }
    nav {
        margin-right: 0.5em;
    }

    .container {
        margin-top: 10em;
        text-align: center;
    }
</style>