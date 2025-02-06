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

  getRooms() {
    return ["Alwyn Hall",
      "Beech Glade",
      "Bowers Building",
      "Burma Road Student Village",
      "Centre for Sport",
      "Chapel",
      "The Cottage",
      "Fred Wheeler Building",
      "Herbert Jarman Building",
      "Holm Lodge",
      "Kenneth Kettle Building",
      "King Alfred Centre",
      "Martial Rose Library",
      "Masters Lodge",
      "Medecroft",
      "Medecroft Annexe",
      "Paul Chamberlain Building",
      "Queen’s Road Student Village",
      "St Alphege",
      "St Edburga",
      "St Elizabeth’s Hall",
      "St Grimbald’s Court",
      "St James’ Hall",
      "St Swithun’s Lodge",
      "The Stripe",
      "Business School",
      "Tom Atkinson Building",
      "West Downs Centre",
      "West Downs Student Village",
      "Winton Building",
      "Students’ Union"];
  }

}
