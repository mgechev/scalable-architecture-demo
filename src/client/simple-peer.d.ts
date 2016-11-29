declare module 'simple-peer' {

  interface Peer {
    new(config: any): any;
  }

  export var ctrl: Peer;
}
