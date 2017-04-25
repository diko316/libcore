FROM diko316/alnode:v2.1

EXPOSE 8000

COPY . $PROJECT_ROOT

RUN npm install -d -y


