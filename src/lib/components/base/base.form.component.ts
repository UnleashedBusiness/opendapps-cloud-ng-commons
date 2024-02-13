import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { GlobalServiceProviderInterface } from "../../service/global-service-provider.interface.js";
import { GLOBALS_SERVICE_PROVIDER_DI_TOKEN } from "../../ng-commons.const.js";

@Component({
  template: "" //Bypass issues with route parameter
})
export abstract class BaseFormComponent<MainDataType> implements OnInit, OnDestroy {
  public submitted = false;
  public data!: MainDataType;

  private dataSubscription?: Subscription;

  public get overlayActive() {
    return (
      (!this.globals.transactionManager.running &&
        this.globals.transactionManager.lastResult &&
        this.submitted &&
        this.globals.transactionManager.lastWasProposal) ||
      (this.globals.transactionManager.running && this.submitted)
    );
  }

  protected constructor(
    @Inject(GLOBALS_SERVICE_PROVIDER_DI_TOKEN)
    public readonly globals: GlobalServiceProviderInterface,
    public readonly route: ActivatedRoute,
  ) {
  }

  public ngOnDestroy(): void {
    this.dataSubscription?.unsubscribe();
  }

  public ngOnInit(): void {
    this.dataSubscription = this.route.data.subscribe(async (value) => {
      this.data = value['data'] as MainDataType;
      await this.postDataLoad();

      this.globals.loading.loadingFlag = false;
    });
  }

  public async reloadData(): Promise<void> {
    this.globals.loading.loadingFlag = true;
    this.submitted = false;

    try {
      this.data = await this.loadDataFunction();
      await this.postDataLoad();
    } finally {
      this.globals.loading.loadingFlag = false;
      this.globals.transactionManager.lastResult = false;
    }
  }



  protected abstract loadDataFunction(): Promise<MainDataType>;

  protected async postDataLoad(): Promise<void> {}
}
