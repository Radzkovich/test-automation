import { test, expect } from '@playwright/test';

test.describe('API-тесты для Restful-booker', () => {
    test.describe.configure({ mode: 'serial' });

    const baseURL = 'https://restful-booker.herokuapp.com';
    
    let authToken;
    let bookingId;
    let bookingData;
    let updatedBookingData;      

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

        const response = await request.post(`${baseURL}/booking`, { data: bookingData });
        
        expect(response.status()).toBe(200);
        
        const responseBody = await response.json();
        
        expect(responseBody).toHaveProperty('bookingid');

        bookingId = responseBody.bookingid; // будет использован в Read/Update/Delete

        expect(responseBody.booking).toEqual(bookingData);
    });

    test('Получение информации о бронировании', async ({ request }) => {        

        const response = await request.get(`${baseURL}/booking/${bookingId}`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(responseBody).toEqual(bookingData);
    });

    test('Обновление бронирования', async ({ request }) => {

        const authResponse = await request.post(`${baseURL}/auth`, {
            data: {
                "username": "admin",
                "password": "password123",
            }
        });

        expect(authResponse.status()).toBe(200);

        const authBody = await authResponse.json();

        authToken = authBody.token;

        updatedBookingData = {
            ...bookingData,
            firstname: "Jack",
            totalprice: 222
        };


        const updatedResponse = await request.put(`${baseURL}/booking/${bookingId}`, {
            data: updatedBookingData,                
            headers: {
                Cookie: `token=${authToken}`                
            }            
        });

        expect(updatedResponse.status()).toBe(200);
        
        const updatedBody = await updatedResponse.json();
        expect(updatedBody.firstname).toBe("Jack");
        expect(updatedBody.totalprice).toBe(222);
    });

    test('Удаление бронирования ', async ({ request }) => {
        
        const response = await request.delete(`${baseURL}/booking/${bookingId}`, {                            
            headers: {
                Cookie: `token=${authToken}`
            }            
        });

        expect(response.status()).toBe(201);

        const noData = await request.get(`${baseURL}/booking/${bookingId}`);

        expect(noData.status()).toBe(404);

    });
});
