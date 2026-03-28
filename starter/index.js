// This is where your JS goes!

fetch("https://cs571.org/rest/s25/ice/chili", {
    headers: {
        "X-CS571-ID": CS571.getBadgerId(), // You may hardcode your Badger ID instead.
    },
})
    .then((res) => {
        console.log(res.status, res.statusText);
        if (res.status === 200) {
            return res.json();
        } else {
            throw new Error();
        }
    })
    .then((data) => {
        const filtered_review = data.reviews
            .filter((review) => review.rating === 5)
            .map((review) => review.txt);
        const steps = data.recipe.map((step) => step.split(":")[0]);
        const ingrs = data.ingredients;
        const ingr_flatened = Object.keys(ingrs).map((ingr) => {
            let res =
                ingr + ": " + ingrs[ingr].amount + (ingrs[ingr].unit ?? "");
            if (ingrs[ingr].misc) {
                res += ", " + ingrs[ingr].misc;
            }
            return res;
        });

        console.log(filtered_review);
        console.log(steps);
        console.log(ingr_flatened);
    })
    .catch((err) => {
        alert("Uh oh! Something went wrong");
    });
