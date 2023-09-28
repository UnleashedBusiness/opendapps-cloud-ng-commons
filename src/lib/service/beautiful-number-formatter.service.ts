import {Injectable} from "@angular/core";
import BigNumber from "bignumber.js";
import {formatNumber} from "@angular/common";

@Injectable()
export default class BeautifulNumberFormatterService {
    private static readonly LEVELS = ['K', 'M', 'B', 'T'];

    public format(
        value: number | BigNumber | undefined,
        digitsInfo?: string,
        locale?: string,
        reduce?: number
    ): string | null {
        if (value === undefined)
            return '';
        if (!(value instanceof BigNumber))
            value = new BigNumber(value);
        let suffix = '';
        if (reduce) {
            value = value.dividedBy(10 ** reduce);
        }
        for (const level of BeautifulNumberFormatterService.LEVELS) {
            if (value.lt(1000))
                break;
            value = (value as BigNumber).dividedBy(1000);
            suffix = level;
        }

        return formatNumber(value.toNumber(), locale ?? 'en-US', digitsInfo) + ' ' + suffix;
    }
}