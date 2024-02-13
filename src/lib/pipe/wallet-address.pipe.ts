import {Pipe, PipeTransform} from "@angular/core";
import WalletAddressFormatterService from "../service/wallet-address-formatter.service.js";

@Pipe({
    name: 'walletAddress'
})
export class WalletAddressPipe implements PipeTransform {
    constructor(private readonly formatterService: WalletAddressFormatterService) {
    }

    public transform(value: string | undefined, trimSize: number = 15): string {
        return this.formatterService.format(value, trimSize);
    }
}
