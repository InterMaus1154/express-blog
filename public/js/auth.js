import {apiFetch} from "./app.js";

const loginForm = document.querySelector("#login-form");
const registerForm = document.querySelector("#register-form");

const registerListeners = () => {
    if (loginForm) {
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
    }

    if (registerForm) {
        document.querySelector("#register-form").addEventListener("submit", async (e) => {
            e.preventDefault();

            const username = document.querySelector("#username").value;
            const email = document.querySelector("#email").value;
            const password = document.querySelector("#password").value;

            const res = await apiFetch("/register", {
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password
                })
            })

            if (res.status === 201) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                console.log(res.data);
            }
        });
    }

};

document.addEventListener("DOMContentLoaded", registerListeners);




