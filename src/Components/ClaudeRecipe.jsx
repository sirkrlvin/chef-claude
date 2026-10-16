import React from "react"
import ReactMarkdown from "react-markdown"


class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error }
    }

    componentDidCatch(error, errorInfo) {
        console.error('ReactMarkdown error:', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return <p style={{ color: 'red' }}>Error rendering recipe: {this.state.error?.message}</p>
        }
        return this.props.children
    }
}
// handles loading,error and recipe state display on UI
export default function ClaudeRecipe({ recipe, loading, error }) {
    return (
        <section>
            <h2>The Chef Recommends:</h2>
            <article className="suggested-recipe-container" aria-live="polite">
                {loading && <p>Thinking... please wait.</p>}
                {error && <p style={{ color: 'red' }}>Error: {error}</p>}
                {!loading && !error && !recipe && <p>Click "Get a recipe" to generate a recipe from your ingredient list.</p>}
                {!loading && !error && recipe && (
                    <ErrorBoundary>
                        <div className="recipe-output">
                            <ReactMarkdown>{recipe}</ReactMarkdown>
                        </div>
                    </ErrorBoundary>
                )}
            </article>
        </section>
    )
}
