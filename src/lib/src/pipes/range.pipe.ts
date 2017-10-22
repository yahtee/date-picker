import {Pipe, PipeTransform} from '@angular/core'

@Pipe({name: 'range'})
export class RangePipe implements PipeTransform {

  public transform(...args: number[]): number[] {
    const [from, to] = args.length == 1 ? [0, args[0]] : args
    return Array.from({length: to - from}).map((_, index) => index + from)
  }

}
