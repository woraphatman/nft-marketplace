import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { Movie } from "src/movie/movie.model";

    import { editFileName, imageFileFilter, MovieService } from './movie.service';

@Controller('movies')
export class MovieController {
    constructor(private readonly movieService: MovieService) {}
  
    @Post()
    async createMovie(@Res() response, @Body() movie: Movie) {
        const newMovie = await this.movieService.create(movie);
        return response.status(HttpStatus.CREATED).json({
            newMovie
        })
    }

    @Get()
    async fetchAll(@Res() response) {
        const movies = await this.movieService.readAll();
        return response.status(HttpStatus.OK).json({
            movies
        })
    }

    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
        const movie = await this.movieService.readById(id);
        return response.status(HttpStatus.OK).json({
            movie
        })
    }

    @Put('/:id')
    async update(@Res() response, @Param('id') id, @Body() movie: Movie) {
        const updatedMovie = await this.movieService.update(id, movie);
        return response.status(HttpStatus.OK).json({
            updatedMovie
        })
    }

    @Delete('/:id')
    async delete(@Res() response, @Param('id') id) {
        const deletedMovie = await this.movieService.delete(id);
        return response.status(HttpStatus.OK).json({
            deletedMovie
        })
    }

    @Post("uploaded")
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './src/uploads/files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file) {
    const upload = await this.movieService.create(file)
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return response;
  }

  @Post('multiple')
  @UseInterceptors(
    FilesInterceptor('image', 20, {
      storage: diskStorage({
        destination: './src/uploads/files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadMultipleFiles(@UploadedFiles() files) {
    console.log(files)
    const response = [];
    files.forEach(file => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
        file
      };
      response.push(fileReponse);
    });
    return response;
  }
@Get('uploaded/:imgpath')
seeUploadedFile(@Param('imgpath') image, @Res() res) {
  return res.sendFile(image, { root: './src/uploads/files' });
}
    
}
