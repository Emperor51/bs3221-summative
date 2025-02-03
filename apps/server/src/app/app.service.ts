import { Injectable } from '@nestjs/common';
import { SubmissionReq } from './dtos/SubmissionReq.dto';
import { CreateUserReqDto } from './dtos/CreateUserReq.dto';

@Injectable()
export class AppService {

  getSubmissions(entryTime: string, exitTime: string) {
    return `Entry Time: ${entryTime}, Exit Time: ${exitTime}`;

  }

  createSubmission(submission: SubmissionReq) {
    return `Entry Time: ${submission.entryTime}, Exit Time: ${submission.exitTime}, Building: ${submission.building}, Room: ${submission.room}`;
  }

  updateSubmission(submission: SubmissionReq) {
    return `Entry Time: ${submission.entryTime}, Exit Time: ${submission.exitTime}, Building: ${submission.building}, Room: ${submission.room}`;
  }

  getSubmission(id: string) {
    return `Submission ID: ${id}`;
  }

  getAllSubmissions(entryTime: string, exitTime: string) {
    return `Entry Time: ${entryTime}, Exit Time: ${exitTime}`;
  }

  createUser(user: CreateUserReqDto) {
    return `User: ${user.firstName}, Email: ${user.email}`;
  }

  getUsers() {
    return 'All Users';
  }

  updateUser(user: CreateUserReqDto) {
    return `User: ${user.firstName}, Email: ${user.email}`;
  }

  deleteUser(id: string) {
    return `User ID: ${id}`;
  }

}
