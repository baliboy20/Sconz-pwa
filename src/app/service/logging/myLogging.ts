export class MyLogger {
  static on = true;

  static log(symbol: string): any {
    console.log(`%c${symbol}`, 'color: red; fontSize: 24px');
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

  static logOnce(arg: { symbol?: string, color?: string, fontSize?: string}): any {
    if (!MyLogger.on) {
      return (val: any) =>  null;
    }
    const {symbol, color, fontSize} = arg;
    console.log(`%c${symbol}`, `color: ${color}; font-size:${fontSize}`);
    const fn = console.log;
    return fn ;
  }

  static normal(): any {
    const {symbol, color, fontSize} = {symbol: '...', color: 'brown', fontSize: '12px'};
    console.log(`%c${symbol}`, `color: ${color}; font-size:${fontSize}`);
    const fn = console.log;
    return fn ;
  }
}
