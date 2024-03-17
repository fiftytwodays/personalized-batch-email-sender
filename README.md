# personalized-batch-email-sender
Send personalized emails as a batch

## Technologies
* Apache POI
* Spring Boot
* React + Vite

## Prerequisites
* java 17
* npm (only if you need to build the frontend)

## Build Jar
Run the command to build the frontend application from the root path<br/>
Please use git bash to run the following commands
```
cd src/main/frontend
npm run build
```
If any error occurs when running build-script.sh using the below command.
```
sh build-script.sh
```
Run the following command to build the jar file
```
mvn clean install
```

## Send Report
Run the following command to start the application
```
java.exe -jar personalized-batch-email-sender-1.0.0.jar
```