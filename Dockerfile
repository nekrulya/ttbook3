# Используем официальный образ Node.js для сборки
FROM node:18 as build-stage

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Собираем проект
RUN npm run build

# Используем Nginx для сервировки статических файлов
FROM nginx:alpine as production-stage

# Копируем сборку Vue в папку, которую обслуживает Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# # Копируем конфигурацию Nginx (опционально, если есть свои настройки)
# COPY ./nginx.conf /etc/nginx/nginx.conf

# Экспонируем порт
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
