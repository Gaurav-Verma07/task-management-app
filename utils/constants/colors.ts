export const colors = ['red', 'pink', 'grape', 'violet', 'indigo', 'cyan', 'teal', 'green', 'lime', 'orange'];

// Generate a random index within the range of the array length
const randomIndex = Math.floor(Math.random() * colors.length);

// Retrieve the random color using the random index
const randomColor = colors[randomIndex];

export {randomColor}