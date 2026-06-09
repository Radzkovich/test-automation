// Импортируем 'test' и 'expect' из библиотеки Playwright
const { test, expect } = require('@playwright/test');

// Описываем наш набор тестов
test.describe('Авторизация на Sauce Demo', () => {

  // Создаем тест-кейс успешного входа
  test('Пользователь должен успешно войти в систему', async ({ page }) => {
    // 1. Переходим на страницу
    await page.goto('https://www.saucedemo.com/');

    // 2. Вводим логин
    // Ищем поле по placeholder, который видит пользователь
    await page.getByPlaceholder('Username').fill('standard_user');

    // 3. Вводим пароль
    // Ищем поле по placeholder
    await page.getByPlaceholder('Password').fill('secret_sauce');

    // 4. Нажимаем кнопку входа
    // Ищем кнопку по её роли и отображаемому тексту
    await page.getByRole('button', { name: 'Login' }).click();

    // 5. Проверяем, что произошел переход на страницу товаров
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });


  // Создаем тест-кейс неуспешного входа
  test('Заблокированный пользователь не должен войти в систему', async ({ page }) => {
    // 1. Переходим на страницу
    await page.goto('https://www.saucedemo.com/');

    // 2. Вводим логин
    // Ищем поле по placeholder, который видит пользователь
    await page.getByPlaceholder('Username').fill('locked_out_user');

    // 3. Вводим пароль
    // Ищем поле по placeholder
    await page.getByPlaceholder('Password').fill('secret_sauce');

    // 4. Нажимаем кнопку входа
    // Ищем кнопку по её роли и отображаемому тексту
    await page.getByRole('button', { name: 'Login' }).click();

    // 5. Проверяем, что появилось сообщение об ошибке
    await expect(
      page.getByText(
        'Epic sadface: Sorry, this user has been locked out.'
      )
    ).toBeVisible();
    
  });

});
