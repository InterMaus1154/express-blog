import {apiFetch} from "./app.js";

document.querySelector("#login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const res = await apiFetch("/login", {
        method: 'POST',
        body: JSON.stringify({
            identifier: document.querySelector("#identifier").value,
            password: document.querySelector("#password").value
        })
    });

    if (res.status === 200) {
        console.log(res.data);
    }

});