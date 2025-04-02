import Article from "../Model/articleModel.js";

//  Get Articles (Public + User Specific)
const getArticles = async (req, res) => {
    try {
        // If `req.user` is not defined (User is not logged in), return 3 latest public articles
        if (!req.user) {
            const publicArticles = await Article.find().sort({ createdAt: -1 }).limit(3);
            return res.status(200).json({ message: "Showing public articles", success: true, articles: publicArticles });
        }

        // If logged in, fetch user-specific articles
        const userArticles = await Article.find({ author: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json({ message: "Your articles", success: true, articles: userArticles });
    } catch (error) {
        console.error("Error fetching articles:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

//  Create Article (Only for Logged-in Users)
const createArticle = async (req, res) => {
    try {
        const { title, description } = req.body;

        // Validate if title and description exist in the request body
        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required", success: false });
        }

        // Create a new article
        const article = new Article({
            title,
            description,
            author: req.user._id, // Set the logged-in user as the author
        });

        // Save the article to the database
        await article.save();

        res.status(201).json({ message: "Article created successfully", success: true, article });
    } catch (error) {
        console.error("Error creating article:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

//  Update Article (Only Author Can Update)
const updateArticle = async (req, res) => {
    try {
        const { title, description } = req.body;
        const { id } = req.params;

        // Find the article by ID
        const article = await Article.findById(id);
        if (!article) {
            return res.status(404).json({ message: "Article not found", success: false });
        }

        // Check if the logged-in user is the author of the article
        if (article.author.toString() !== req.user._id) {
            return res.status(403).json({ message: "Forbidden. You can only update your own articles.", success: false });
        }

        // Update the article title and description
        article.title = title || article.title;
        article.description = description || article.description;

        // Save the updated article
        await article.save();

        res.status(200).json({ message: "Article updated successfully", success: true, article });
    } catch (error) {
        console.error("Error updating article:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

//  Delete Article (Only Author Can Delete)
const deleteArticle = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the article by ID
        const article = await Article.findById(id);
        if (!article) {
            return res.status(404).json({ message: "Article not found", success: false });
        }

        // Check if the logged-in user is the author of the article
        if (article.author.toString() !== req.user._id) {
            return res.status(403).json({ message: "Forbidden. You can only delete your own articles.", success: false });
        }

        // Delete the article from the database
        await article.deleteOne();

        res.status(200).json({ message: "Article deleted successfully", success: true });
    } catch (error) {
        console.error("Error deleting article:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

export { getArticles, createArticle, updateArticle, deleteArticle };
