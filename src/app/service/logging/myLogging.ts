export class MyLogger {
  static on = true;

  static log(symbol: string): any {
    console.log(`%c${symbol}`, 'color: red; fontSize: 24px');
    return console.log;
  }

  static error(): any {
    console.log(`%cError`, 'color: palegreen; font-size: 13px');
    return console.log;
  }

  static alert(): any {
    console.log(`!!!`, 'color: red; font-size: 24px');
    return console.log;
  }

  static logCol(arg: { symbol: string, color: string, fontSize: string }): any {
    if (!MyLogger.on) {
      return (val: any) => null;
    }
    const {symbol, color, fontSize} = arg;
    console.log(`%c${symbol}`, `color: ${color}; fontSize: ${fontSize}`);
    return console.log;
  }

  static toLocalStorage(key: string, value: string) : void {
    window.localStorage.setItem(key,value);
     console.log('localsStorage', key, value);
  }
  // static logOnce(arg: { symbol?: string, color?: string, fontSize?: string}): any {
  //   if (!MyLogger.on) {
  //     return (val: any) =>  null;
  //   }
  //   const {symbol, color, fontSize} = arg;
  //   console.log(`%c${symbol}`, `color: ${color}; font-size:${fontSize}`);
  //   const fn = console.log;
  //   return fn ;
  // }

  static normal(): any {
    const {symbol, color, fontSize} = {symbol: '...', color: 'brown', fontSize: '12px'};
    console.log(`%c${symbol}`, `color: ${color}; font-size:${fontSize}`);
    const fn = console.log;
    return fn ;
  }
  static large(): any {
    const {symbol, color, fontSize} = {symbol: '...', color: 'blue', fontSize: '36px'};
    console.log(`%c${symbol}`, `color: ${color}; font-size:${fontSize}`);
    const fn = console.log;
    return fn ;
  }
}
