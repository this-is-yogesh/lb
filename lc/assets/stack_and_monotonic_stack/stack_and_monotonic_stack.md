Stack:
1. Interview Relevance: These three problems represent the three core stack use cases: matching/nesting, state tracking, and evaluation/processing. Every stack interview question falls into one of these categories.

Why the matching parenthese question Cannot Be Solved Without a Stack:
A simple counter can track whether the number of openers and closers match, but it cannot verify that they match in the correct order. The string "(]" has one opener and one closer, but they do not match. The string "([)]" has balanced counts but incorrect nesting. Only a stack preserves the order needed to verify nesting.


Monotonic stack:
1. Common Mistake: Storing values in a monotonic stack problem that requires distance calculations. This forces you to add a separate data structure to track positions, making the code more complex and error-prone. Start with indices and you will rarely need to change.

