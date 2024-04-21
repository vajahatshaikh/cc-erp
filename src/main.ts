import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Remove unknown parameter from payload
      forbidNonWhitelisted: false, //Display error if we have some unknown parameter in request payload
      transform: true,
      forbidUnknownValues: false,
      disableErrorMessages: false,
      validateCustomDecorators: true,
      exceptionFactory: (errors) => {
        return {
          statusCode: 422,
          error: 'Unprocessable Entity',
          message: errors.reduce((acc, e) => {
            const handleNestedErrors = (error: any) => {
              if (error.children && error.children.length > 0) {
                return error.children.reduce(
                  (nestedAcc: any, nestedError: any) => {
                    return { ...nestedAcc, ...handleNestedErrors(nestedError) };
                  },
                  {},
                );
              } else {
                return { [error.property]: Object.values(error.constraints) };
              }
            };
            return { ...acc, ...handleNestedErrors(e) };
          }, {}),
        };
      },
    }),
  );

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
}


bootstrap();
