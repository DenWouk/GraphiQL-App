interface Variables {
  [key: string]: string;
}

export function addVariablesValue(query: string, variables: Variables): string {
  if (query.includes('$')) {
    const indexStart = query.indexOf('(');
    const indexEnd = query.indexOf(')');

    query = query.slice(0, indexStart - 1) + query.slice(indexEnd + 1);

    const queryArgs = query
      .split(' ')
      .filter((el) => el.includes('$'))
      .map((el) => el.replace(/[^a-zA-Z0-9$_]/g, ''));

    queryArgs.forEach((el) => {
      query = query.replace(
        el,
        variables[el.replace('$', '') as keyof typeof variables]
      );
    });
  }

  console.log(query);

  return query;
}
