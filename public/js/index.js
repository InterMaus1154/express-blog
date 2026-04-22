import {requireAuth, apiFetch} from "./app.js";

document.addEventListener("DOMContentLoaded", () => {
    requireAuth();

    const logoutBtn = document.querySelector("#logout-button");
    logoutBtn.addEventListener("click", async () => {

        const res = await apiFetch("/logout", {
            method: 'POST'
        });

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location = "/login";
    });

});