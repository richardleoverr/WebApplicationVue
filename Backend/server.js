const express = require('express');
const pool = require('./database');
const cors = require('cors')
const port = process.env.PORT || 3000;

const app = express();

app.use(cors());

//The express.json() function is a built-in middleware function in Express. 
//It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());

//"async and await make promises easier to write"
// async makes a function return a Promise
// The keyword async before a function makes the function return a promise.
// Syntax:  "async(req, res) => {}"
// await makes a function wait for a Promise
// The await keyword can only be used inside an async function.
// The await keyword makes the function pause the execution and wait for a resolved promise before it continues
// Syntax:  "async(req, res) => {let value = await promise}"
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS posttable (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    post_date TIMESTAMP,
    profile_picture VARCHAR(255),
    image VARCHAR(255),
    post_text TEXT,
    thumbs_up VARCHAR(255),
    likes INT
  );
`;

const dataToDatabase = async () => {
    try {
        console.log("Entering data");

        
        const posts = [
            {
                username: "Dogggooo",
                date: "03/10/2024",
                profilePicture: "me.png",
                postContent: {
                    image: "dog.jpg",
                    text: "Ou look its a dog eating a taco!xPPPp",
                    thumbsUp: "thumbsup.png"
                },
                likes: 0
            },
            {
                username: "User1111",
                date: "04/10/2024",
                profilePicture: "me.png",
                postContent: {
                    image: null,
                    text: "Noo way :DDD hahahahaha",
                    thumbsUp: "thumbsup.png"
                },
                likes: 0
            },
            {
                username: "Somebody",
                date: "05/10/2024",
                profilePicture: "me.png",
                postContent: {
                    image: "windowsxp.jpg",
                    text: "Look what a cool picture I took yesterdayyy lolool",
                    thumbsUp: "thumbsup.png"
                },
                likes: 0
            },
            {
                username: "User1",
                date: "07/10/2024",
                profilePicture: "me.png",
                postContent: {
                    image: "trippy.jpg",
                    text: "Wow am I seeing things or does this image seem to be moving...",
                    thumbsUp: "thumbsup.png"
                },
                likes: 0
            },
            {
                username: "CatLover",
                date: "08/10/2024",
                profilePicture: "cat2.webp",
                postContent: {
                    image: "cat.webp",
                    text: "Cat :3",
                    thumbsUp: "thumbsup.png"
                },
                likes: 0
            },
            {
                username: "TreeLover",
                date: "09/10/2024",
                profilePicture: "treelover.jpg",
                postContent: {
                    image: "trees.jpg",
                    text: "Treeeees",
                    thumbsUp: "thumbsup.png"
                },
                likes: 0
            },
            {
                username: "bearLiker",
                date: "09/10/2024",
                profilePicture: "me.png",
                postContent: {
                    image: "bears.gif",
                    text: "Sup",
                    thumbsUp: "thumbsup.png"
                },
                likes: 0
            }
        ];

        
        for (const post of posts) {
            const { username, date, profilePicture, postContent, likes } = post;
            const { image, text, thumbsUp } = postContent;
            const formattedDate = new Date(date).toISOString();  

            
            await pool.query(
                `INSERT INTO posttable (username, post_date, profile_picture, image, post_text, thumbs_up, likes) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7) 
                 ON CONFLICT (id) DO NOTHING`, 
                [username, formattedDate, profilePicture, image, text, thumbsUp, likes]
            );
            
        }

        console.log("Data has been inserted into database");

    } catch (err) {
        console.error("Error inserting data into database:", err.message);
    }
};
const createTable = async () => {
    try {
      await pool.query(createTableQuery);
      console.log('Table posttable is ready');
    } catch (err) {
      console.error('Error creating table:', err);
      throw err;
    }
  };
  const startDatabase = async () => {
    await createTable(); 
    await dataToDatabase();   
};
startDatabase();



app.get('/', (req, res) => {
    res.send('Hello');
});
// Adds all posts
app.post('/api/posts', async (req, res) => {
    try {
        console.log("A POST request has arrived");
        
        
        const { username, date, profilePicture, postContent, likes } = req.body;
        
        
        const { image, text, thumbsUp } = postContent;
        
        
        const formattedDate = new Date(date).toISOString();  

        
        const newPost = await pool.query(
            `INSERT INTO posttable (username, post_date, profile_picture, image, post_text, thumbs_up, likes) 
             VALUES ($1, $2, $3, $4, $5, $6, $7) 
             RETURNING *`,
            [username, formattedDate, profilePicture, image, text, thumbsUp, likes]
        );

        
        res.json(newPost.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});






// Get all posts
app.get('/api/posts', async (req, res) => {
    try {
        console.log("Get posts request has arrived");

        
        const posts = await pool.query("SELECT * FROM posttable");

        
        const transformedPosts = posts.rows.map(post => ({
            id: post.id,
            username: post.username,
            date: new Date(post.post_date).toISOString().split('T')[0], 
            profilePicture: post.profile_picture,
            postContent: {
                image: post.image,
                text: post.post_text,
                thumbsUp: post.thumbs_up
            },
            likes: post.likes
        }));

        
        res.json(transformedPosts);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});




//  
app.get('/api/posts/:id', async(req, res) => {
    try {
        console.log("get a post with route parameter  request has arrived");
        // The req.params property is an object containing properties mapped to the named route "parameters". 
        // For example, if you have the route /posts/:id, then the "id" property is available as req.params.id.
        const { id } = req.params; // assigning all route "parameters" to the id "object"
        const posts = await pool.query( // pool.query runs a single query on the database.
            //$1 is mapped to the first element of { id } (which is just the value of id). 
            "SELECT * FROM posttable WHERE id = $1", [id]
        );
        res.json(posts.rows[0]); // we already know that the row array contains a single element, and here we are trying to access it
        // The res.json() function sends a JSON response. 
        // This method sends a response (with the correct content-type) that is the parameter converted to a JSON string using the JSON.stringify() method.
    } catch (err) {
        console.error(err.message);
    }
}); 



// Task 4
app.put('/api/posts/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const post = req.body;
        console.log("update request has arrived");
        const updatepost = await pool.query(
            "UPDATE posttable SET (title, body, urllink) = ($2, $3, $4) WHERE id = $1", [id, post.title, post.body, post.urllink]
        );
        res.json(updatepost);
    } catch (err) {
        console.error(err.message);
    }
});



// Deletes all posts
app.delete('/api/posts', async (req, res) => {
    try {
        console.log("Delete all posts request has arrived");
        const deleteAllPosts = await pool.query(
            "DELETE FROM posttable"
        );
        res.json({ message: "All posts have been deleted successfully." });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "An error occurred while deleting all posts." });
    }
});


app.listen(port, () => {
    console.log("Server is listening to port " + port)
});