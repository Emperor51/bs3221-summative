import { Body, Controller, Get, Post, Param, Query, Patch, Delete } from '@nestjs/common';
import { SubmissionReq } from '../dtos/SubmissionReq.dto';
import { SubmissionService } from '../services/submission.service';

@Controller('submissions')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  /**
   * returns submissions for a user
   * @param entryTime
   * @param exitTime
   */
  @Get()
  getSubmissions(@Param('entryTime') entryTime: string, @Query('exitTime') exitTime: string) {
    return this.submissionService.getSubmissions(entryTime, exitTime);
  }

  /**
   * returns a submission by id
   * @param id
   */
  @Get('/:id')
  getSubmission(@Query('id') id: string) {
    return this.submissionService.getSubmission(id)
  }

  /**
   * @returns submissions for all users
   */
  @Get('/all')
  getAllSubmissions(@Param('entryTime') entryTime: string, @Query('exitTime') exitTime: string) {
    return this.submissionService.getAllSubmissions(entryTime, exitTime);
  }

  /**
   * updates a submission
   * @param submission
   */
  @Patch('/:id')
  updateSubmission(@Body() submission: SubmissionReq) {
    return this.submissionService.updateSubmission(submission);
  }

  /**
   * creates a submission
   * @param submission
   */
  @Post()
  createSubmission(@Body() submission: SubmissionReq) {
    return this.submissionService.createSubmission(submission);
  }
  
  @Delete('/:id')
  deleteSubmission(@Param('id') id: string) {
    return this.submissionService.deleteSubmission(id)
  }

}
