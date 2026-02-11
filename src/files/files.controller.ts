import { Controller, Get, Post, Param, UploadedFile, UseInterceptors, BadRequestException, Res } from '@nestjs/common';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { type Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

import { fileFilter, fileNamer } from './helpers';
import { FilesService } from './files.service';
import { ConfigService } from '@nestjs/config';
import { ValidRoles } from 'src/auth/interfaces';
import { Auth } from 'src/auth/decorators';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService
  ) { }

  @Post('product')
  @Auth(ValidRoles.admin)
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter,
    storage: diskStorage({
      destination: './static/products',
      filename: fileNamer
    })
  }))
  uploadProductImage(@UploadedFile() file: Express.Multer.File) {

    if (!file) {
      throw new BadRequestException('Make sure that the files is a image');
    }

    const secureUrl = `${this.configService.get('HOST_API')}/files/product/${file.filename}`

    return { secureUrl }
  }


  @Get('product/:name')
  getFileByName(
    @Res() res: Response,
    @Param('name') name: string
  ) {


    const path = this.filesService.getImagePath(name);

    res.sendFile(path);
  }
}
