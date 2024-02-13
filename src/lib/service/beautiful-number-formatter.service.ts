import {Injectable} from "@angular/core";
import {BigNumber} from "bignumber.js";
import {formatNumber} from "@angular/common";

@Injectable({
    providedIn: "root"
})
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

    public secondsToDhms(seconds: number): string {
        seconds = Number(seconds);
        const d = Math.floor(seconds / (3600 * 24));
        const h = Math.floor((seconds % (3600 * 24)) / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);

        const dDisplay = d > 0 ? d + (d == 1 ? " day " : " days ") : "";
        const hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours ") : "";
        const mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
        const sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
        return dDisplay + hDisplay + mDisplay + sDisplay;
    }
}