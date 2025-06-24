//импорт данных
import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json";
import * as recovery_password_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"

describe('Форма логина и пароля', function () {

   beforeEach('Начало теста', function () {
         cy.visit('/');  //перехожу на сайт
         cy.get(main_page.window).should('be.visible');
         cy.get(main_page.title).should('be.visible');//проверяю, что видим контент
         cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)'); //проверяю цвет кнопки "Восстановить пароль"
           });

   afterEach('Конец теста', function () {
         cy.get(result_page.close).should('be.visible');//проверяем, что видим крестик
        });

it('Верный логин и верный пароль', function () {
        cy.get(main_page.email).type(data.login);//вводим верный логин
        cy.get(main_page.password).type(data.password);//вводим верный пароль
        cy.get(main_page.login_button).click();//нажимаем кнопку "Войти"
        cy.get(result_page.window).should('be.visible');
        cy.get(result_page.title).should('be.visible');//проверяем видимость окна
        cy.get(result_page.title).contains('Авторизация прошла успешно');//проверяем текст сообщения
    })
it('Успешно восстановление пароля', function () {
        cy.get(main_page.fogot_pass_btn).click();//ищем, нажимаем кнопку "Восстановить пароль"
        cy.get(recovery_password_page.window).should('be.visible');//проверяем, что видим окно
        cy.get(recovery_password_page.email).type(data.login);//вводим верный пароль
        cy.get(recovery_password_page.send_button).click();//нажимаем кнопку
        cy.get(result_page.window).should('be.visible');
        cy.get(result_page.title).should('be.visible');//проверяем видим ли окно с сообщением
        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail');//проверяем текст сообщения
    })
it('Верный логин и неверный пароль', function () {
        cy.get(main_page.email).type(data.login);//вводим верный логин
        cy.get(main_page.password).type("iLoveqaЫtudio1");//вводим неверный пароль
        cy.get(main_page.login_button).click();//нажимаем кнопку "Войти"
         cy.get(result_page.window).should('be.visible');
        cy.get(result_page.title).should('be.visible');//проверяем видим ли окно с сообщением
        cy.get(result_page.title).contains('Такого логина или пароля нет');//проверяем текст сообщения
    })
it('Неверный логин и верный пароль', function () {
        cy.get(main_page.email).type("negerman@dolnikov.ru");//вводим верный логин
        cy.get(main_page.password).type(data.password);//вводим неверный пароль
        cy.get(main_page.login_button).click();//нажимаем кнопку "Войти"
         cy.get(result_page.window).should('be.visible');
        cy.get(result_page.title).should('be.visible');//проверяем видим ли окно с сообщением
        cy.get(result_page.title).contains('Такого логина или пароля нет');//проверяем текст сообщения
    })
it('Валидация на наличие @', function () {
        cy.get(main_page.email).type('germandolnikov.ru');//вводим логин без "@"
        cy.get(main_page.password).type(data.password);//вводим неверный пароль
        cy.get(main_page.login_button).click();//нажимаем кнопку "Войти"
         cy.get(result_page.window).should('be.visible');
        cy.get(result_page.title).should('be.visible');//проверяем видим ли окно с сообщением
        cy.get(result_page.title).contains('Нужно исправить проблему валидации');
    })
it('Приведение к строчным буквам', function () {
        cy.get(main_page.email).type('gerMan@dolnikov.ru');//вводим верный логин, с большими буквами
        cy.get(main_page.password).type(data.password);//вводим верный пароль
        cy.get(main_page.login_button).click();//нажимаем кнопку "Войти"
         cy.get(result_page.window).should('be.visible');
        cy.get(result_page.title).should('be.visible');//проверяем видим ли окно с сообщением
        cy.get(result_page.title).contains('Авторизация прошла успешно');//проверяем текст сообщения
    })
    
})
