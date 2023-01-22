# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

Refactoring: Simplified the given code and improved readability by:
- Using ternary operator to check the type of partitionKey
- Removing unnecessary/duplicate if-else statements
- Using more meaningful variable names
- Assigning a default value to the partitionKey before the if-statement
- Created new function to avoid duplication and increase re-usability and readability

Tests: Written test cases to cover the following cases
- When the given event is null
- when the given event is not null but the partitionKey is null
- when the given event is not null, partitionKey is also not null but not a string
- when the given event is not null, partitionKey is also not null but it is of type string
- when the given event is not null, partitionKey is also not null but not a string but length > 256
- when the given event is not null, partitionKey is also not null but it is of type string but length < 256

