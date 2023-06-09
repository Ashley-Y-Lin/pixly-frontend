/** formatCaption takes as input a string (user submitted).
 *
 * It returns a string, but formatted to remove all whitespace and capitalize
 * first letters of each word in the caption.
 */

function formatCaption(caption) {
  const words = caption.trim().split(/\s+/);

  const formattedWords = words.map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  return formattedWords.join(" ");
}

export { formatCaption };