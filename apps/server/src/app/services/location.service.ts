import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm";
import { Location } from "../entities/location.entity"

@Injectable()
export class LocationService{

  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async listLocations() {
    return this.locationRepository.find({
      select: {
        id: true,
        name: true,
      }
    })
  }

  async createLocation(location: Location) {
    const newLocation = this.locationRepository.create(location)
    return await this.locationRepository.save(newLocation, {})
  }

  async deleteLocation(id: number) {
    return await this.locationRepository.delete(id)
  }
}
