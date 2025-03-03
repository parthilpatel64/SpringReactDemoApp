From openjdk:17-jdk

WORKDIR /app

COPY target/SpringReactExample-0.0.1-SNAPSHOT.jar /app/springdemo.jar
COPY src/main/resources/application.properties /app/application.properties

EXPOSE 8090

CMD [ "java","-jar","springdemo.jar" ]
