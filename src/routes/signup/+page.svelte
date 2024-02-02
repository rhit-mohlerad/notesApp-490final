<style>
    h1 {
        margin-left: 0.2em;
    }
    .container {
        margin-top: 5em;
    }
    .container>div, .container>p {
        text-align: center;
    }
    .form {
        max-width: 50%;
        margin: 0 auto;
    }

</style>
<a href="/"><h1>Notes</h1></a>
<div class="container">

    <p>Welcome!</p>
    <form>
        <div class="form">
            <label for="name">
                Name
                <input type="text" placeholder="Name" id="name" name="name">
            </label>
            <label for="email">
                Email
                <input type="email" placeholder="Email Address" id="email" name="email">
            </label>

            <label for="password">
                Password
                <input type="password" id="password" name="password">
            </label>
            <label for="password_confirmation">
                Confirm Password
                <input type="password" id="password_confirmation" name="password_confirmation">
            </label>

        </div>

    </form>
    <div><a role="button" href="/logged in">Log In</a></div>
</div>

