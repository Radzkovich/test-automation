import { test, expect} from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';

test('Успешный логин и проверка страницы товаров', async ({ page }) => {
    // 1. Инициализируем наши Page objects, передавая им объект 'page'
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    //2. Используем методы Page Object для взаимодействия со страницей
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');

    //3. Используем другой Page Object для проверок на новой странице
    // Проверяем, что заголовок на странице инвентаря верный
    const pageTitle = await inventoryPage.getPageTitle();
    await expect(pageTitle).toBe('Products');

    // Также можно проверить URL
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});
