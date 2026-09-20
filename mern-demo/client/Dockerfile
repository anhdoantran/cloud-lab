# --- GIAI ĐOẠN 1: BUILD REACT ---
# Câu 51. Khai báo Node.js Image làm Base Image cho quá trình Build React Application
FROM node:20-alpine AS build

# Câu 52. Thiết lập thư mục làm việc bên trong Frontend Container
WORKDIR /app

# Câu 53. Sao chép package.json và package-lock.json vào Container
COPY package*.json ./

# Câu 54. Cài đặt các package của React Application
RUN npm install

# Câu 55. Sao chép source code React vào Container
COPY . .

# Câu 56. Build React Application trong quá trình xây dựng Docker Image
RUN npm run build


# --- GIAI ĐOẠN 2: NGINX WEB SERVER (Phục vụ web tĩnh cho Container chạy ở Câu 60) ---
FROM nginx:alpine
#57
COPY --from=build /app/dist /usr/share/nginx/html
#60
EXPOSE 80
#58&60
CMD ["nginx", "-g", "daemon off;"]