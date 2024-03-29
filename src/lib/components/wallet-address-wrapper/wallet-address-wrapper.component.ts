import {Component, Input, type OnInit} from '@angular/core';
import {ClipboardService} from "ngx-clipboard";
import {BlockchainDefinition, NotificationService} from "@unleashed-business/ts-web3-commons";

@Component({
    selector: 'app-wallet-address-wrapper',
    templateUrl: './wallet-address-wrapper.component.html',
})
export class WalletAddressWrapperComponent implements OnInit {
    @Input() address?: string = undefined;
    @Input() trim: boolean = false;
    @Input() prefix?: string = undefined;
    @Input() blockchain!: BlockchainDefinition;

    constructor(
        private readonly notifications: NotificationService,
        private readonly clipboard: ClipboardService
    ) {
    }

    ngOnInit(): void {
    }

    copyAddressToClipboard() {
        this.clipboard.copy(this.address!);
        this.notifications.show({
            text: "Wallet address copied to clipboard!",
            icon: "info",
            title: ""
        });
    }

}
