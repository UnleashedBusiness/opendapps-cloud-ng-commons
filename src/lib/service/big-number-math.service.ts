import { Injectable } from "@angular/core";
import BigNumber from "bignumber.js";

@Injectable({
  providedIn: "root",
})
export class BigNumberMathService {
  public floor: (b: number) => number = (b) => Math.floor(b);
  
  public pow: (b: number, n: number) => BigNumber = (b, n) =>
    new BigNumber(b).pow(n);

  public min: (b: BigNumber, n: BigNumber) => BigNumber = (b, n) =>
    b.gte(n) ? n : b;

  public max: (b: BigNumber, n: BigNumber) => BigNumber = (b, n) =>
    b.gte(n) ? b : n;

  public sqrt: (i: BigNumber, b: number) => number = (i, b) => {
    if (i.eq(0)) return 0;
    let k = 0;
    while (i.gte(b)) {
      i = i.dividedToIntegerBy(b);
      k++;
    }
    return k;
  };

  public sqrtReminder: (i: BigNumber, b: number) => number = (i, b) => {
    if (i.eq(0)) return 0;
    let k = 0;
    while (i.gte(b)) {
      i = i.dividedBy(b);
      k++;
    }
    if (i.eq(1)) return 0;
    return i.toNumber();
  };
}
