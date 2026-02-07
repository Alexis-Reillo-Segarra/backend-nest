import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {


    getImagePath(name: string) {


        const path = join(__dirname, '../../static/products', name);

        if (!existsSync(path)) {
            throw new BadRequestException('Not image found')
        }

        return path;

    }
}
