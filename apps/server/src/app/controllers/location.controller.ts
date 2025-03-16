import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { LocationService } from "../services/location.service"
import { Location } from "../entities/location.entity"
import { Permissions } from '../decorators/permissions.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RbacGuard } from '../guards/rbac.guard';

@Controller('location')
export class LocationController {
  constructor(
    private readonly locationService: LocationService,
  ) {
  }

  @Permissions('locations.list')
  @UseGuards(JwtAuthGuard, RbacGuard)
  @Get()
  async getLocations() {
    return this.locationService.listLocations()
  }

  @Permissions('locations.delete')
  @UseGuards(JwtAuthGuard, RbacGuard)
  @Delete(':id')
  async deleteLocation(@Param('id') id: number) {
    await this.locationService.deleteLocation(id)
  }

  @Permissions('locations.create')
  @UseGuards(JwtAuthGuard, RbacGuard)
  @Post()
  async createLocation(@Body() body: Location) {
    await this.locationService.createLocation(body)
  }

}
