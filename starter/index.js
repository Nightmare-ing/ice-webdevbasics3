// This is where your JS goes!

fetch("https://cs571.org/rest/s25/ice/pizza", {
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

        console.log("Is there some instruction to bake?");
        console.log(
            data.recipe.some((instr) => instr.toLowerCase().includes("bake")),
        );

        console.log("Is every review 4 or 5 stars?");
        console.log(
            data.reviews.every((rev) => rev.rating === 4 || rev.rating === 5),
        );

        console.log("Using reduce, what is the average review rating?");
        console.log(
            data.reviews
                .map((rev) => rev.rating)
                .reduce((prev, curr) => prev + curr, 0) / data.reviews.length,
        );

        console.log(
            "Using reduce, what are the unique units of the ingredients?",
        );
        const units = Object.keys(data.ingredients).reduce((prev, curr_key) => {
            if (ingrs[curr_key].unit && !prev.includes(ingrs[curr_key].unit)) {
                prev.push(ingrs[curr_key].unit);
            }
            return prev;
        }, []);
        console.log(units);
    });
// .catch((err) => {
//     alert("Uh oh! Something went wrong");
// });
