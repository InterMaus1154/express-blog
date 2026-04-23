import {apiFetch} from "./app.js";

const registerListeners = () => {

    const newPostForm = document.querySelector("#new-post-form");

    newPostForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const el = e.target;

        const title = el.querySelector("#title").value;
        const body = el.querySelector("#body").value;

        const categories = [...document.querySelectorAll("input[name='categories[]']:checked")].map((cb) => cb.value);

        if (categories.length === 0) {
            const el = document.querySelector("#error");
            el.innerText = "Select at least one category!";
            el.classList.remove("hidden");
            return;
        }

        const res = await apiFetch("/posts", {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                body: body,
                categories: categories
            })
        });

        console.log(res.status);

    });

};

document.addEventListener("DOMContentLoaded", registerListeners);