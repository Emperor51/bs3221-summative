import { Body, Controller, Get, Post, Param, Query, Patch, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { SubmissionReq } from './dtos/SubmissionReq.dto';
import { CreateUserReqDto } from './dtos/CreateUserReq.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * returns submissions for a user
   * @param entryTime
   * @param exitTime
   */
  @Get('/submissions')
  getSubmissions(@Param('entryTime') entryTime: string, @Query('exitTime') exitTime: string) {
    return this.appService.getSubmissions(entryTime, exitTime);
  }

  /**
   * returns a submission by id
   * @param id
   */
  @Get('/submissions/:id')
  getSubmission(@Query('id') id: string) {
    return this.appService.getSubmission(id)
  }

  /**
   * @returns submissions for all users
   */
  @Get('/allSubmissions')
  getAllSubmissions(@Param('entryTime') entryTime: string, @Query('exitTime') exitTime: string) {
    return this.appService.getAllSubmissions(entryTime, exitTime);
  }

  /**
   * updates a submission
   * @param submission
   */
  @Patch('/submissions/:id')
  updateSubmission(@Body() submission: SubmissionReq) {
    return this.appService.updateSubmission(submission);
  }

  /**
   * creates a submission
   * @param submission
   */
  @Post('/submission')
  createSubmission(@Body() submission: SubmissionReq) {
    return this.appService.createSubmission(submission);
  }

  /**
   * creates a user
   * @param user
   */
  @Post('/createUser')
  createUser(@Body() user: CreateUserReqDto) {
    return this.appService.createUser(user);
  }

  /**
   * updates a user
   * @param user
   */
  @Patch('/updateUser/:id')
  updateUser(@Body() user: CreateUserReqDto) {
    return this.appService.updateUser(user);
  }

  /**
   * @returns all users
   */
  @Get('/users')
  getUsers() {
    return this.appService.getUsers();
  }

  /**
   * Delete a user
   * @param id
   */
  @Delete('/users/:id')
  deleteUser(@Param('id') id: string) {
    return this.appService.deleteUser(id);
  }

  @Get('rooms')
  getRooms() {
    return this.appService.getRooms();
  }

}
