import React from "react"
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from "./ClaudeRecipe"

export default function Main() {
    // state setter functions
    const [ingredients, setIngredients] = React.useState([])
    const [recipe, setRecipe] = React.useState('')
    const [recipeShown, setRecipeShown] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState('')
    //useRef on Recipe Scroll on DOM node 

    const recipeSection = React.useRef(null)

    // async function generates recipe from external API onClick()
async function generateRecipe() {
    setLoading(true)
    setError('')
    setRecipe('')
    setRecipeShown(true)

    const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY
    const OPENROUTER_MODEL = import.meta.env.VITE_OPENROUTER_MODEL || "meta-llama/llama-3.1-8b-instruct"

    try {
        if (!OPENROUTER_API_KEY) {
            throw new Error('Missing OpenRouter API key. Add VITE_OPENROUTER_API_KEY to your .env file.')
        }

        const prompt = `Create a recipe using these ingredients: ${ingredients.join(', ')}. Include a title, an ingredients list, and step-by-step instructions.`

        const response = await fetch(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': window.location.origin,
                    'X-Title': 'Chef Claude'
                },
                body: JSON.stringify({
                    model: OPENROUTER_MODEL,
                    messages: [
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    reasoning: { enabled: true }
                })
            }
        )

        const data = await response.json()
        if (!response.ok) {
            console.error('OpenRouter error:', data) // real error, logged for you
            throw new Error('BUSY') // marker only, not shown to user
        }

        const text = data?.choices?.[0]?.message?.content
            || data?.choices?.[0]?.text
            || data?.generated_text
            || JSON.stringify(data)

        setRecipe(text)
    } catch (err) {
        console.error('Recipe generation failed:', err)
        if (err.message === 'Missing OpenRouter API key. Add VITE_OPENROUTER_API_KEY to your .env file.') {
            setError(err.message) // keep this one visible — it's a setup issue for YOU, not OpenRouter
        } else {
            setError('Chef Claude is a bit busy — try again in a few seconds.')
        }
    } finally {
        setLoading(false)
    }
}
    // add ingredients to the form 
    function addIngredient(event) {
        event.preventDefault()
        const newIngredient = event.target.ingredient?.value?.trim()
        if (!newIngredient) return
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
        event.target.reset()
    }

    /**
     * Problem:
     * We want to scroll the "Ready for a recipe?" div into view
     * ONLY AFTER the ClaudeRecipe section is rendered to the page 
     * (i.e. when `recipe` is not an empty string). How can we do that?
     */

     // implements scrollintoView onClicking the get a recipe button.
     React.useEffect(() => {
        if (recipe !== "" && recipeSection.current !== null) {
            recipeSection.current.scrollIntoView()
        }
    }, [recipe])


    return (
        <main>
            <form onSubmit={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>

            {ingredients.length > 0 &&
                <IngredientsList
                    ref={recipeSection}
                    ingredients={ingredients}
                    onGenerateRecipe={generateRecipe}
                />
            }

            {recipeShown && (
                <ClaudeRecipe
                    recipe={recipe}
                    loading={loading}
                    error={error}
                />
            )}
        </main>
    )
}