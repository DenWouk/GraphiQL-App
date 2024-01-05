import checkBrackets from './сheckBrackets';

export const toPrettify = (query: string) => {
  const formattedLines = checkBrackets(query);

  if (!formattedLines) {
    return;
  }

  const words = query.replace(/{/g, ' {\n').replace(/}/g, ' }\n').split(/\s+/);

  const lines = words.map((word, i, arr) => {
    if (
      i !== 0 &&
      word !== '{' &&
      !word.includes('(') &&
      !word.includes(')') &&
      word !== '}' &&
      !word.includes('$') &&
      !arr[i - 1].includes(':') &&
      !arr[i - 1].includes('$') &&
      arr[i - 1] != '{'
    ) {
      return '\n' + word.trim();
    } else return word.trim();
  });
  let depth = 0;

  const formattedQuery = lines.map((trimmedChar, i, arr) => {
    if (trimmedChar == '{') {
      depth += 2;
      return ' {\n' + ' '.repeat(depth);
    } else if (trimmedChar === '}') {
      depth >= 2 ? (depth -= 2) : (depth = 0);
      return depth === 0 && i !== arr.length - 1
        ? '\n}'
        : '\n' + ' '.repeat(depth) + '}';
    } else if (
      trimmedChar.includes(':') ||
      trimmedChar.includes(',') ||
      trimmedChar === 'query'
    ) {
      return trimmedChar + ' ';
    } else {
      if (trimmedChar.includes('\n')) {
        return trimmedChar.replaceAll('\n', `${'\n' + ' '.repeat(depth)}`);
      }
      return trimmedChar;
    }
  });
  return formattedQuery.join('');
};
