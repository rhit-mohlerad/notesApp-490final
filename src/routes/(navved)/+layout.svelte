<script>
    export let data;
</script>

<nav>
    <a href="/"><h1>Notes</h1></a>
    <div class="buttons">
        {#if data?.email}
            <a href="/profile">Profile</a>
            <form method="POST" action="/?/logout">
                <button>Log Out</button>
            </form>
        {:else}
            <a href="/login">Log In</a>
            <a href="/signup" role="button">Sign Up</a>
        {/if}
    </div>
</nav>

<style>
    nav .buttons {
        display: flex;
    }
    nav a h1, nav div a {
        margin: 0.2em;
        margin-bottom: 0;
    }
    nav {
        margin-right: 0.5em;
    }
    nav div {
        align-self: center;
        margin: 0.3em;
        padding: 0.2em;
        margin-bottom: 0;
    }

    nav form {
        margin-bottom: 0;
    }

</style>

<slot></slot>