let userCounter = 1;

export function generateSubmissionTitle(prefix = 'automation'): string {
  const timestamp = Date.now();           
  const username = `${prefix}${timestamp}_${userCounter++}`;
  return username;
}