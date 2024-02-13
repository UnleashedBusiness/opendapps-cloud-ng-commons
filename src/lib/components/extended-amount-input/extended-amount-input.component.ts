import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BigNumber} from "bignumber.js";

@Component({
    selector: 'app-extended-amount-input',
    templateUrl: './extended-amount-input.component.html'
})
export class ExtendedAmountInputComponent {
    @Input() max?: BigNumber = undefined;
    @Input() ticker = '';
    @Input() name = '';
    @Input() required = false;
    @Input() placeholder = '';
    @Input() amount: BigNumber = new BigNumber(0);
    @Input() float = true;
    @Output() amountChange = new EventEmitter<BigNumber>();

    wrapNumber(num: string | number): BigNumber {
        return new BigNumber(num);
    }

    setAmount(amount: BigNumber): void {
        this.amount = this.float ? amount : amount.decimalPlaces(0);
        this.amountChange.emit(this.amount);
    }
}
