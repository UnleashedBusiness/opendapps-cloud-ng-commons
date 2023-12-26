import { Component, EventEmitter, Inject, Input, OnInit, Output } from "@angular/core";
import { GlobalServiceProviderInterface } from "../../service/global-service-provider.interface";
import { BlockchainDefinition } from "@unleashed-business/ts-web3-commons";
import { GLOBALS_SERVICE_PROVIDER_DI_TOKEN } from "../../ng-commons.const";

@Component({
  selector: "app-common-page-wrapper",
  templateUrl: "./common-page-wrapper.component.html",
})
export class CommonPageWrapperComponent implements OnInit {
  @Output() reloadLambda = new EventEmitter<void>();
  @Input() targetAddress: string | undefined = undefined;
  @Input() pageTitle = "";
  @Input() pageSubtitle = "";
  @Input() backButtonRoute = "/dashboard";
  @Input() submitted!: boolean;
  @Input() successfulTransactionText = "Transaction executed successfully!";
  @Input() successfulTransactionActionText = "Reload data";
  @Input() autoCardPlacement = true;
  @Input() activeBlockchain!: BlockchainDefinition;

  constructor(
    @Inject(GLOBALS_SERVICE_PROVIDER_DI_TOKEN)
    public readonly globals: GlobalServiceProviderInterface
  ) {}

  ngOnInit(): void {}

  public overlayActive() {
    return (
      this.submitted &&
      (this.globals.transactionManager.running ||
        this.globals.transactionManager.lastResult)
    );
  }

  protected readonly undefined = undefined;
}
