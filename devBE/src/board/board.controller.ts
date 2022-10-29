import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes, ParseIntPipe, UseGuards, Req, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { multerConfigs } from 'src/configs/multer.config';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';
import { UnitJoinDto } from './dto/unit-join.dto';
import { SoldierJoinDto } from './dto/soldier-join.dto';
import { SetStatusDto } from './dto/set-status.dto';

@Controller('/api/board')
@ApiTags("Boards API")
@UseGuards(AuthGuard())
export class BoardController {
  constructor(private readonly boardService: BoardService) { }

  @Post("/createBoard")
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto,
    @Req() req): Promise<Board> {
    return this.boardService.createBoard(createBoardDto, req.user);
  }

  @Delete("/deleteBoard/:idx")
  deleteBoard(@Param("idx", ParseIntPipe) idx: number, @Req() req): Promise<void> {
    return this.boardService.deleteBoard(idx, req.user);
  }

  @Patch("/updateBoard/:idx")
  @UsePipes(ValidationPipe)
  updateBoard(
    @Param('idx', ParseIntPipe) idx: number,
    @Body() updateBoardDto: UpdateBoardDto,
    @Req() req
  ): Promise<Board> {
    return this.boardService.updateBoard(idx, updateBoardDto, req.user);
  }

  @Get("/getAllBoards")
  getAllBoards(): Promise<Board[]> {
    return this.boardService.getAllBoards();
  }

  @Get("/getAllUndoneBoards")
  getAllUndoneBoards(): Promise<Board[]> {
    return this.boardService.getAllUndoneBoards();
  }

  @Get("/getBoardsByIdentifier/:identifier")
  getBoardsByIdentifier(@Param("identifier") identifier: string, @Req() req): Promise<Board[]> {
    return this.boardService.getBoardsbyIdentifier(identifier);
  }

  @Get("/getBoardsByAuth")
  getBoardsById(@Req() req): Promise<Board[]> {
    return this.boardService.getBoardsbyIdentifier(req.user.identifier);
  }

  @Get("/getBoardByIndex/:idx")
  getBoardByIdx(@Param("idx") idx: number): Promise<Board> {
    return this.boardService.getBoardByIdx(idx);
  }

  @Post("/uploadImages")
  @UseInterceptors(FilesInterceptor("images", 10, multerConfigs))
  // FileInterceptors("Key value of the from", "limit for the number of files", "file upload configure")
  uploadImages(
    @UploadedFiles() files: File[]
  ): object {
    return this.boardService.uploadImages(files);
  }

  @Patch("/unitParticipate")
  @UsePipes(ValidationPipe)
  unitParticipate(@Body() unitJoinDto: UnitJoinDto, @Req() req): Promise<Board> {
    return this.boardService.unitParticipate(unitJoinDto, req.user);
  }

  @Patch("/unitCancelParticipation/:idx")
  @UsePipes(ValidationPipe)
  unitCancelParticipation(@Param("idx") idx:number, @Req() req): Promise<Board> {
    return this.boardService.unitCancelParticipation(idx, req.user);
  }

  @Patch("/soldierParticipate")
  @UsePipes(ValidationPipe)
  soldierParticipate(@Body() soldierJoinDto: SoldierJoinDto, @Req() req): Promise<Board> {
    return this.boardService.soldierParticipate(soldierJoinDto, req.user);
  }

  @Patch("/soldierCancelParticipation/:idx")
  @UsePipes(ValidationPipe)
  soldierCancelParticipation(@Param("idx") idx:number, @Req() req): Promise<Board> {
    return this.boardService.soldierCancelParticipation(idx, req.user);
  }

  @Patch("/setStatus")
  @UsePipes(ValidationPipe)
  setStatus(@Body() setStatusDto: SetStatusDto, @Req() req): Promise<Board> {
    return this.boardService.setStatus(setStatusDto, req.user);
  }

  @Patch("/setDone/:idx")
  @UsePipes(ValidationPipe)
  setDone(@Param("idx") idx: number, @Req() req): Promise<Board> {
    return this.boardService.setDone(idx, req.user);
  }

  /*
  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardService.create(createBoardDto);
  }

  @Get()
  findAll() {
    return this.boardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardService.update(+id, updateBoardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardService.remove(+id);
  }
  */
}
