# RUN `npm install` at first!

# RUS Новая админ панель
.git репозиторий с тремя ветками
### development
### sandbox
### production


## BUILD
В зависимости от активной ветки команда `build` выполняет билд приложения с 
переменными окружения из одноименной секциии файла `.env-cmdrc` и деплоит его на наш тестовый сервер. 
Следующая команда разработчиков доджна отредактировать скрипт `.env-cmdrc`. 
Нужно изменить значения `host`, `pem_path` и `remote_path` согласно конфигрурации нового сервера.
Скрипт выполняет копирование на Remote server при помощи утилиты scp (https://en.wikipedia.org/wiki/Secure_copy) 

## START
Запуск приложения выполняеться командой `start:` + `имя_окружения` из файла `.env-cmdrc`
Например `start:sandbox`

## FEATURES
Приложения работает с двумя API

#### LEGACY_API (Работа с БД Клиентов)
api.ecopurehomecleaning.com 
Позволяет делать букинг и регистрировать пользователей.

#### MANAGE_USERS_API (Работа с БД Клиентов)
api.ecopurehomecleaning.com/manage-users/ 
 недавно появивившийся доп функционал по работе с клиентами.
массовое удаление клиентов, дешифровка кредитных карт, получение токена Клиента и т. д.
!!!НЕОБХОДИМ JWT ТОКЕН мненеджера(+доступ по zip_code клиента) или администратора для работы с этим апи 

#### LOCATIONS_API (БД Локаций и прайсингов)

52.62.149.101/api/v1-production
Осуществляет авторизацию менеджеров и администраторов (выдача JWT ТОКЕН).
Управление Локациями/Билдингами
Управление Ценами

--------------------------------------------------------------------

# ENG New admin panel
.git repository with three branches
### development
### sandbox
### production

## BUILD
Depending on the active branch, the build command executes the application build with
environment variables from the same section of the file `.env-cmdrc` and deploy it to our test server.
The next development team needs to edit the `.env-cmdrc` script.
You need to change the values ​​of `host`,` pem_path` and `remote_path` according to the configuration of the new server.
The script copies to the Remote server using the scp utility (https://en.wikipedia.org/wiki/Secure_copy)

## START
The application is launched by the command `start:` + `environment_name` from the file` .env-cmdrc`
For example `start: sandbox`

## FEATURES
Applications works with two APIs

#### LEGACY_API (Work with the Customer Database)
api.ecopurehomecleaning.com
Allows you to book and register users.

#### MANAGE_USERS_API (Work with the Customer Database)
api.ecopurehomecleaning.com/manage-users/
 recently appeared additional functionality for working with clients.
mass removal of customers, decryption of credit cards, receipt of a Client token, etc.
!!! JWT TOKEN is required of the manager (+ access by zip_code client) or administrator to work with this api

#### LOCATIONS_API (Database of Locations and Priceings)

52.62.149.101/api/v1-production
Authorizes managers and administrators (issuing JWT TOKEN).
Location / Building Management
Price Management
