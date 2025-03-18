import { Body, Controller, Get, Post, Param, Query, Delete, UseGuards, Req, Patch } from '@nestjs/common';
import { SubmissionService } from '../services/submission.service';
import { Log } from '../entities/log.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LocationDto } from '../dtos/location.dto';

@Controller('submissions')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  /**
   * returns submissions for a user
   * @param email
   * @param entryTime
   * @param exitTime
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  getSubmissions(@Req() req, @Query('entryTime') entryTime: string, @Query('exitTime') exitTime: string) {
    // console.log(entryTime, exitTime)
    return this.submissionService.getSubmissions(req.user.id, entryTime, exitTime);
  }

  /**
   * returns a submission by id
   * @param id
   */
  @UseGuards(JwtAuthGuard)
  @Get('submission/:id')
  getSubmission(@Param('id') id: number) {
   return this.submissionService.getSubmission(id)
  }

  /**
   * @returns submissions for all users
   */
  @UseGuards(JwtAuthGuard)
  @Get('all')
  getAllSubmissions(@Query('entryTime') entryTime: string, @Query('exitTime') exitTime: string) {
    return this.submissionService.getAllSubmissions(entryTime, exitTime);
  }

  /**
   * updates a submission
   * @param id
   * @param submission
   */
  @Patch('/:id')
  updateSubmission(@Param('id') id: number, @Body() submission: LocationDto) {
    return this.submissionService.updateSubmission(id, submission);
  }

  /**
   * creates a submission
   * @param submission
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  createSubmission(@Req() req, @Body() submission: LocationDto) {
    return this.submissionService.createSubmission(req.user.id, submission);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteSubmission(@Param('id') id: number) {
    return this.submissionService.deleteSubmission(id)
  }

}
