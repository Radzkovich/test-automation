export class CheckoutCompletePage {

    constructor(page) {
        this.page = page;

        this.completionMessage = page.locator('.complete-header');
        this.backHomeButton = page.locator('[data-test="back-to-products"]');
    }

    async getCompletionMessage() {
        return await this.completionMessage.textContent();
    }

    async backToHome() {
        await this.backHomeButton.click();
    }
}
