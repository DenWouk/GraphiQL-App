export default function checkBrackets(input: string): boolean {
  const stack: { char: string; index: number }[] = [];
  const brackets: Record<string, string> = {
    '{': '}',
    '[': ']',
    '(': ')',
  };

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    const nextChar = input[i + 1];

    if (brackets[char as keyof typeof brackets]) {
      if (nextChar === '}' || nextChar === ')' || nextChar === ']') {
        return false;
      }
      stack.push({ char, index: i });
    } else if (Object.values(brackets).includes(char)) {
      if (
        stack.length === 0 ||
        brackets[stack.pop()!.char as keyof typeof brackets] !== char
      ) {
        return false;
      }
    }
  }

  if (stack.length !== 0) {
    return false;
  }

  return true;
}
