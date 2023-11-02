import {Injectable} from "@angular/core";

@Injectable({
    providedIn: "root"
})
export default class WalletAddressFormatterService {
    public format(value: string | undefined, trimSize: number = 15): string {
        if (value == undefined) return '';

        if (trimSize >= value.length)
            return value;
        const size = (trimSize - 5) / 2;
        return value.substring(0, size) + '....' + value.substring(value.length - size, value.length);
    }
}