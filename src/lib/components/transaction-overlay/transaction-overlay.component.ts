import {Component, EventEmitter, Input, type OnInit, Output} from '@angular/core';
import {TransactionRunningHelperService} from '@unleashed-business/ts-web3-commons';
import { WalletConnectionService } from "../../wallet/wallet-connection.service";

@Component({
    selector: 'app-transaction-overlay',
    templateUrl: './transaction-overlay.component.html'
})
export class TransactionOverlayComponent implements OnInit {
    @Output() reloadLambda = new EventEmitter<void>();
    @Input() buttonActionText = "Reload Data";
    @Input() submitted!: boolean
    @Input() decentralizedEntityAddress?: string = undefined;

    constructor(
        public tm: TransactionRunningHelperService,
        public connection: WalletConnectionService
    ) {
    }

    ngOnInit(): void {
    }

    reset = () => {
        this.tm.reset();
    }

    reload = () => {
        this.reloadLambda.emit()
    }
    protected readonly undefined = undefined;
}
