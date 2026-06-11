export class CheckoutStepTwoPage {

    constructor(page) {
        this.page = page;

        this.orderInformation = page.locator('.summary_info');
        this.totalPrice = page.locator('.summary_total_label');
        this.finishButton = page.locator('[data-test="finish"]');
    }

    async finishCheckout() {
        await this.finishButton.click();
    }

    async getOrderInformation() {
        return await this.orderInformation.textContent();
    }

    async getTotalPrice() {
        return await this.totalPrice.textContent();
    }
}
