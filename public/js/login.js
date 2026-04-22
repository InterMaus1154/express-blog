import {apiFetch} from "./app.js";

document.querySelector("#login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    console.log(document.querySelector("#username").value);
    console.log(document.querySelector("#password").value);

    await apiFetch("/login", {
        method: 'POST',
        body: JSON.stringify({
            username: document.querySelector("#username").value,
            password: document.querySelector("#password").value
        })
    });

});