# Улучшения в форке Xoalt SDK

Отличия от оригинального репозитория.

## 1. Архитектура и разделение кода

- **api.ts** — запрос баннера вынесен в отдельный слой: `fetchBanner(options, signal?)`, единая точка для Prebid-запроса.
- **hooks/useFetchBanner** — логика «загрузка + состояние» в хуке, `XoaltView` только отображает и обрабатывает клики.
- **types.ts** — все типы SDK в одном месте: `XoaltClickEvent`, `XoaltViewProps`, `OnFetchedCallback`, `FetchBannerOptions`, `FetchBannerResponse`; экспорт типов из `index.ts`.

## 2. Отмена запроса при размонтировании

- В `useFetchBanner` используется **AbortController**: при размонтировании компонента запрос отменяется.
- В `fetchBanner` в `fetch` передаётся `signal`; нет лишних обновлений state после unmount и гонок запросов при быстром изменении пропсов.

## 3. Типизация

- Явные типы для API: `FetchBannerOptions`, `FetchBannerResponse`.
- `OnFetchedCallback`: второй аргумент типизирован как `string | 'FAILED'` при ошибке.
- JSDoc у опций (width, height, prebidId, onFetched) в `FetchBannerOptions`.

## 4. Документация и пограничные случаи

- JSDoc у `discoveryDomain` в `XoaltService.init` (пример `https://h.xoalt.com`, назначение — домен для deep link).
- TODO в `XoaltView`: учёт случая, когда домен задан без `www`, а ссылка приходит с `www` (пока проверка через `startsWith`).

## 5. Упрощение и чистка

- Удалены неиспользуемые стили из `XoaltView` (controls, output).
- Контейнер: `style={styles.container}` без лишнего spread.
- `XoaltViewProps` — только нужные поля, без наследования `ViewProps`.

## 6. Инфраструктура репозитория

- **.gitignore** — React Native / iOS / Android / Node.
- **Prettier** — конфиг и скрипт `prettier` в `package.json` для единого форматирования.
- **README** — актуальные примеры инициализации и использования `XoaltView`.
