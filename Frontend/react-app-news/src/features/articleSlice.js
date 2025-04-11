import { createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"

const initialState = {
  articles: localStorage.getItem("articles") ? JSON.parse(localStorage.getItem("articles")) : [],
}


export const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    addToarticles: (state, action) => {
      const article = action.payload
      state.articles.push(article)
      localStorage.setItem("articles", JSON.stringify(state.articles))
      toast.success("Article created successfully")
    },
    updateToarticles: (state, action) => {
      const article = action.payload
      const index = state.articles.findIndex((item) => item._id === article._id)

      if (index !== -1) {
        state.articles[index] = article
        localStorage.setItem("articles", JSON.stringify(state.articles))
        toast.success("Article updated successfully")
      } else {
        toast.error("Article not found")
      }
    },
    removeFromarticles: (state, action) => {
      const articleId = action.payload
      state.articles = state.articles.filter((item) => item._id !== articleId)
      localStorage.setItem("articles", JSON.stringify(state.articles))
      toast.success("Article deleted successfully")
    },
  },
})

export const { addToarticles, updateToarticles, removeFromarticles } = articleSlice.actions

export default articleSlice.reducer

