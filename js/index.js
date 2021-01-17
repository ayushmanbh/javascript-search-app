import { clearSearchText, setSearchFocus, showClearTextButton, clearPushListener } from "./searchBar.js"
import { getSearchTerm, retrieveSearchResults } from "./dataFunctions.js"
import { deleteSearchResults, buildSearchResults, clearStatsLine, setStatsLine } from "./searchResults.js"

document.addEventListener("readystatechange", (e) => {
  if (e.target.readyState === "complete") {
    initApp()
  }
})

const initApp = () => {
  setSearchFocus()
  const search = document.getElementById("search")
  search.addEventListener('input', showClearTextButton)
  const clear = document.getElementById("clear")
  clear.addEventListener("click", clearSearchText)
  clear.addEventListener("keydown", clearPushListener)
  const form = document.getElementById("searchBar")
  form.addEventListener("submit", submitTheSearch)
}

//procedural "workflow" function
const submitTheSearch = (e) => {
  e.preventDefault()
  deleteSearchResults()
  processTheSearch()
  setSearchFocus()
}

//procedure
const processTheSearch = async () => {
  clearStatsLine()
  const searchTerm = getSearchTerm()
  if (searchTerm === "") return
  const resultArray = await retrieveSearchResults(searchTerm)
  if (resultArray.length) buildSearchResults(resultArray)
  setStatsLine(resultArray.length)
}