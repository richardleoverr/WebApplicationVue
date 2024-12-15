const express = require('express');
const pool = require('./database');
const cors = require('cors')
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const secret = "Lets_just_make_this_one_big_secret_noone_will_know_about_okay";
const port = process.env.PORT || 3000;

const app = express();

app.use(cors({ origin: 'http://localhost:8080', credentials: true }));

//The express.json() function is a built-in middleware function in Express. 
//It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());
app.use(cookieParser());

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
    CREATE TABLE IF NOT EXISTS users (
    email VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255)
    );
`;

const generateJWT = (id) => {
    return jwt.sign({ id }, secret, { expiresIn: 3600 })
}


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




//  Get post
app.get('/api/posts/:id', async (req, res) => {
    try {
        console.log("Request params:", req.params); // Debug log
        const { id } = req.params;

        // Validate ID
        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({ error: "Invalid post ID" });
        }

        const result = await pool.query(
            "SELECT * FROM posttable WHERE id = $1", 
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Post not found" });
        }

        const post = result.rows[0];
        const transformedPost = {
            id: post.id,
            username: post.username,
            date: new Date(post.post_date).toISOString().split('T')[0],
            profilePicture: post.profile_picture,
            postContent: {
                image: post.image,
                text: post.post_text,
                thumbsUp: post.thumbs_up,
            },
            likes: post.likes,
        };

        res.json(transformedPost);
    } catch (err) {
        console.error("Error retrieving post:", err.message);
        res.status(500).json({ error: "Server error" });
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

// Authenticating user
app.get('/auth/authenticate', async(req, res) => {
    console.log('authentication request has been arrived');
    const token = req.cookies.jwt; 
    let authenticated = false;
    try {
        if (token) { 
            await jwt.verify(token, secret, (err) => { //token exists, now we try to verify it
                if (err) { // not verified, redirect to login page
                    console.log(err.message);
                    console.log('token is not verified');
                    res.redirect('/login')

                } else { // token exists and it is verified 
                    console.log('author is authinticated');
                    authenticated = true;
                }
            })
        } else { 
            console.log('author is not authinticated');
            res.send({ "authenticated": authenticated });
            res.redirect('/login')
        }
    } catch (err) {
        console.error(err.message);
    }
});


// signup a user
app.post('/auth/signup', async (req, res) => {
    try {
      console.log("A signup request has arrived");
      const { email, password } = req.body;
  
      const bcryptPassword = await bcrypt.hash(password, await bcrypt.genSalt());
      const authUser = await pool.query(
        "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
        [email, bcryptPassword]
      );
      console.log(authUser.rows[0].email);
  
      const token = await generateJWT(authUser.rows[0].email);
      console.log(token);
  
      res.status(201)
        .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
        .json({ user_id: authUser.rows[0].email });
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ error: err.message });
    }
  });
  

app.post('/auth/login', async(req, res) => {
    try {
        console.log("a login request has arrived");
        const { email, password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) return res.status(401).json({ error: "User is not registered" });

        //Checking if the password is correct
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        //console.log("validPassword:" + validPassword);
        if (!validPassword) return res.status(401).json({ error: "Incorrect password" });

        const token = await generateJWT(user.rows[0].id);
        res
            .status(201)
            .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
            .json({isAuthed: true})
            .send;
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

//logout a user
app.post('/auth/logout', (req, res) => {
    res.clearCookie('jwt');
    res.send({ message: "Logged out successfully" });
    window.location.href = "/login";
});


app.listen(port, () => {
    console.log("Server is listening to port " + port)
});