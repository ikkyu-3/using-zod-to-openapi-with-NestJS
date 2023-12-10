import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import {
  LimitQuery,
  LimitQuerySchema,
  Pet,
  Pets,
  NewPet,
  NewPetSchema,
} from '@repo/openapi';

@Controller('pets')
export class PetsController {
  @Get()
  findAll(
    @Query(
      'limit',
      new ParseIntPipe({ optional: true }),
      new ZodValidationPipe(LimitQuerySchema),
    )
    limit: LimitQuery,
  ) {
    console.log(`limit: ${limit}`);
    const pets: Pets = [
      {
        id: 1,
        name: 'Charlie',
        tag: 'dog',
      },
      {
        id: 2,
        name: 'Bella',
        tag: 'cat',
      },
      {
        id: 3,
        name: 'Max',
        tag: 'rabbit',
      },
    ];

    return pets;
  }

  @Post()
  createPet(@Body(new ZodValidationPipe(NewPetSchema)) body: NewPet) {
    console.log(`body: ${JSON.stringify(body)}`, typeof body);
    const pet: Pet = {
      id: 1,
      name: body.name,
      tag: body.tag,
    };

    return pet;
  }

  @Get(':petId')
  findById(@Param('petId') petId: string) {
    console.log(`petId: ${petId}`);
    const pet: Pet = {
      id: 1,
      name: 'Charlie',
      tag: 'dog',
    };

    return pet;
  }
}
