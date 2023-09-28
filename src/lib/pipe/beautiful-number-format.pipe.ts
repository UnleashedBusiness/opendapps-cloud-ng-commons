import {Pipe, PipeTransform} from "@angular/core";
import BigNumber from "bignumber.js";
import BeautifulNumberFormatterService from "../service/beautiful-number-formatter.service";

@Pipe({
    name: 'beautyNumber'
})
export class BeautifulNumberFormatPipe implements PipeTransform {
    constructor(private formatter: BeautifulNumberFormatterService) {
    }

    public transform(value: number | BigNumber | undefined, digitsInfo?: string, locale?: string, reduce?: number): string | null {
        return this.formatter.format(value, digitsInfo, locale, reduce);
    }
}
