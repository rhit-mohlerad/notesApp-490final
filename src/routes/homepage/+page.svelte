<style>
    nav a h1, nav div a {
        margin: 0.2em;
        margin-bottom: 0;
    }
    nav {
        margin-right: 0.5em;
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
        border-radius: 4%;
    }
    .note {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
    }
    .note > button {
        align-self: center;
        width: fit-content;
        margin-bottom: 0;
    }
    .note > a {
        align-self: center;
    }


</style>

<nav>
    <a href="/"><h1>Notes</h1></a>
    <div>
        <a href="/profile">Profile</a>
        <a href="/signout" role="button">Sign Out</a>
    </div>
</nav>
<div class="container">
    <hr>
    <a role="button" href="/notes/new">New Note</a>
    <div class="container">
        <ul>
            <li><div class="note"><a href="/notes/noteID">Test item </a><button type="button"><i class="fa fa-trash" aria-hidden="true"></i>
            </button></div></li>
            <li><div class="note"><a href="/notes/noteID">Test item 2</a><button type="button"><i class="fa fa-trash" aria-hidden="true"></i>
            </button></div></li>
        </ul>
    </div>
</div>
