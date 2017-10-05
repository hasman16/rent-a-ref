import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable()
export class OrganizeService {

  private org_data = { id: '', name: '' };


  constructor(private userService: UserService) {

  }

  getData() {
    return this.org_data;
  }


  fetchOrganization(user_id: any) {
    return this.userService.getOrganization(user_id)
      .map((res) => {
        this.org_data = res;
        console.log('Res: ', res);
        return res;
      });
  }
}

