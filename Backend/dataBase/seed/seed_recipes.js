const Recipes = [
    {
        recipeContent: {
            ingredients: "eggs, flour, baking powder, vanilla powder, milk",
            instructions: "mixing all the ingredients together' waiting until the pan is really hot and make as much pancakes as you want",
        },
        image: {
            url: "https://plus.unsplash.com/premium_photo-1692193554212-6a27903ab9c4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=m3wxmja3fdb8mhxzzwfyy2h8mjl8fhbhbmnha2v8zw58mhx8mhx8fda%3d",
            alt: "pancakes",
        },
        _id: "67acbfea02d01e15434c2954",
        title: "Pancake",
        subtitle: "Delicious pancakes for breakfast, a great way to start the morning!",
        likes: [null, "67acb560a2991e1b0d31133a", "", ","],
        comments: [
            {
                userId: "67acb560a2991e1b0d31133a",
                comment: "looks incredible🥰",
                date: "2025-04-23T20:30:09.535Z",
                _id: "68094dd1b2b8e4aba03d3255",
            },
            {
                userId: "67acb560a2991e1b0d31133a",
                comment: "Absolutely Amazing!!",
                date: "2025-04-23T20:43:07.588Z",
                _id: "680950db317ad2b286fd0b62",
            },
        ],
        category: ["67b4d5dcaa79ff074fef8407", "67b4d6d2aa79ff074fef840d"],
        user_id: "67acb560a2991e1b0d31133a",
        createdAt: "2025-02-10T18:18:15.215Z",
        __v: 94,
    },
    {
        recipeContent: {
            ingredients: "2 eggs, 1/2 cup chopped spinach, 1/4 cup diced tomatoes, 1/4 cup chopped onions, 1/4 cup shredded cheese, Salt and pepper to taste, 1 tablespoon olive oil",
            instructions:
                "1. Heat the olive oil in a pan over medium heat.\n2. Add onions and tomatoes and sauté for 2-3 minutes until soft.\n3. Add spinach and cook until wilted.\n4. Beat the eggs in a bowl, then pour over the vegetables in the pan.\n5. Sprinkle cheese on top and cook until eggs are set.\n6. Season with salt and pepper and serve hot.",
        },
        image: {
            url: "https://images.unsplash.com/photo-1510693206972-df098062cb71?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=m3wxmja3fdb8mhxzzwfyy2h8nhx8b21lbgv0zxxlbnwwfhwwfhx8ma%3d%3d",
            alt: "vegetable omelette with cheese",
        },
        _id: "67acca2f91aa6c5fca078d89",
        title: "Vegetable Omelette",
        subtitle: "A protein-packed vegetable omelette for a healthy meal",
        likes: [""],
        comments: [],
        category: ["67b4d6d2aa79ff074fef840d", "67b4d65faa79ff074fef840a"],
        user_id: "67acb560a2991e1b0d31133a",
        createdAt: "2025-02-12T00:00:00.000Z",
        __v: 7,
    },
    {
        recipeContent: {
            ingredients: "all-purpose flour, sugar, unsweetened cocoa powder, baking powder, baking soda, salt, espresso powder, milk, oil, eggs - room temperature, vanilla extract, boiling water",
            instructions:
                "Prep. Preheat the oven to 350º F. Prepare two 9-inch cake pans by spraying them with baking spray or buttering and lightly flouring them. You can also spread the pans with my homemade chocolate cake goop (pan release).Whisk dry ingredients. Add flour, sugar, cocoa, baking powder, baking soda, salt and espresso powder to a large bowl or the bowl of a stand mixer. Whisk through to combine or, using your paddle attachment, stir through flour mixture until combined well. Mix in wet ingredients. Add milk, vegetable oil, eggs, and vanilla to flour mixture and mix together on medium speed until well combined. Reduce speed and carefully add boiling water to the cake batter until well combined. Bake. Distribute cake batter evenly between the two prepared cake pans. Bake for 30-35 minutes, until a toothpick or cake tester inserted in the center of the chocolate cake comes out clean. Frost. Remove from the oven and allow to cool for about 10 minutes, remove from the pan and cool completely. Frost with Chocolate Buttercream Frosting.",
        },
        image: {
            url: "https://plus.unsplash.com/premium_photo-1716152291350-4137853b4a73?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=m3wxmja3fdb8mhxzzwfyy2h8mtn8fgnob2nvbgf0zsuymgnha2v8zw58mhx8mhx8fda%3d",
            alt: "chocolate cake",
        },
        _id: "67b21c7fbd7e1d6f13dc018c",
        title: "Choclate Cake",
        subtitle: "Chocolate cake everybody loves",
        likes: ["67acb560a2991e1b0d31133a"],
        comments: [
            {
                userId: "67acb560a2991e1b0d31133a",
                comment: "I'm definitly gonna try this!",
                date: "2025-02-16T17:13:43.861Z",
                _id: "67b21cc7bd7e1d6f13dc0191",
            },
        ],
        category: ["67b4d5dcaa79ff074fef8407"],
        user_id: "67acb560a2991e1b0d31133a",
        createdAt: "2025-02-16T17:12:31.261Z",
        __v: 6,
    },
];

module.exports = Recipes;
