import { test, expect} from '@playwright/test';

import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutStepOnePage } from '../pages/checkout.step.one.page';
import { CheckoutStepTwoPage } from '../pages/checkout.step.two.page';
import { CheckoutCompletePage } from '../pages/checkout.complete.page';


test('@ui E2E: успешная покупка товара', async ({ page }) => {
    // 1. Инициализируем наши Page objects, передавая им объект 'page'
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    //2. Открыть страницу логина
    await loginPage.open();

    // Логин
    await loginPage.login('standard_user', 'secret_sauce');

    //3. Проверка страницы товаров
    expect(await inventoryPage.getPageTitle()).toBe('Products');

    // Сортировка от дорогого к дешевому
    await inventoryPage.sortHighToLow();

    // Берём самый дорогой товар
    const firstItemName = await inventoryPage.getFirstItemName();

    // Добавляем в корзину
    await inventoryPage.addItemToCart(firstItemName);

    // Переход в корзину
    await inventoryPage.openCart();

    // Проверка товара в корзине
    const cartItems = await cartPage.getCartItemNames();
    expect(cartItems).toContain(firstItemName);

    // Переход к оформлению заказа
    await cartPage.goToCheckout();

    // Заполнение данных
    await checkoutStepOnePage.fillUserInfo(
        'Test',
        'User',
        '12345'
    );

    // Завершение покупки
    await checkoutStepTwoPage.finishCheckout();

    // Проверка успешного заказа
    expect(await checkoutCompletePage.getCompletionMessage()).toBe('Thank you for your order!');
});
