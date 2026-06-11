export class InventoryPage {

    constructor(page) {
        this.page = page;

        this.pageTitle = page.locator('[data-test="title"]');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
        this.cartButton = page.locator('[data-test="shopping-cart-link"]');
        this.itemNames = page.locator('.inventory_item_name');
        this.addToCartButtons = page.locator('button[data-test^="add-to-cart"]');
    }

    async getPageTitle() {
        return await this.pageTitle.textContent(); 
    }  
    

    async addItemToCart(itemName) {
        const item = this.page.locator('.inventory_item')
            .filter({ hasText: itemName });

        await item.locator('button').click();

    }

    async openCart() {
        await this.cartButton.click();
    }

    async sortHighToLow() {
        await this.sortDropdown.selectOption('hilo');
    }
    
    async getFirstItemName() {
        return await this.itemNames.first().textContent();
    }
}
