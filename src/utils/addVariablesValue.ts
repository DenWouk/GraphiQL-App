interface Variables {
  [key: string]: string;
}

export function addVariablesValue(query: string, variables: Variables): string {
  if (query.includes('$')) {
    const indexStart = query.indexOf('(');
    const indexEnd = query.indexOf(')');

    query = query.slice(0, indexStart - 1) + query.slice(indexEnd + 1);

    const arr = query
      .split(' ')
      .filter((el) => el.includes('$'))
      .map((el) => el.replace(/[^a-zA-Z0-9$_]/g, ''));

    for (let i = 0; i < arr.length; i++) {
      query = query.replace(
        arr[i],
        variables[arr[i].replace('$', '') as keyof typeof variables]
      );
    }

    console.log(arr);
  }

  console.log(query);

  return query;
}
