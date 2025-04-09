export const blacklist = ["gmail.com", "yahoo.com", "sunray.dev"];

export function isBlacklisted(email: string): boolean {
  const domain = email.split("@")[1];
  return blacklist.includes(domain);
}
