import { test, expect } from '@playwright/test';

test.describe('API-тесты для Restful-booker', () => {
    test.describe.configure({ mode: 'serial' });

    const baseURL = 'https://restful-booker.herokuapp.com';
    
    let bookingId;
    let bookingData;    

    test('Создание бронирования', async ({ request }) => {

        bookingData = {
            "firstname" : "Jim",
            "lastname" : "Brown",
            "totalprice" : 111,
            "depositpaid" : true,
            "bookingdates" : {
                "checkin" : "2018-01-01",
                "checkout" : "2019-01-01"
            },
            "additionalneeds" : "Breakfast"
        }

        const response = await request.post(`${baseURL}/booking`, { data:bookingData });
        
        expect(response.status()).toBe(200);
        
        const responseBody = await response.json();
        
        expect(responseBody).toHaveProperty('bookingid');

        bookingId = responseBody.bookingid; // будет использован в Read/Update/Delete

        expect(responseBody.booking).toEqual(bookingData);
    });


});
