export function isResTypeCorrect(res: unknown): res is { content: string; role: string } {
  return (
    !!res &&
    typeof res === 'object' &&
    'content' in res &&
    'role' in res &&
    typeof res.content === 'string' &&
    typeof res.role === 'string'
  );
}
