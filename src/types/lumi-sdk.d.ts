declare module '@lumi.new/sdk' {
  // Minimal ambient declarations — expand with actual typings if available.
  export function createClient(config: any): any;
  export const version: string;
  export default createClient;
}
