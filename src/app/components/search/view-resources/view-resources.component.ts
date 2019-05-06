import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { ResourceService } from 'src/app/services/resource/resource.service';
import { Resource } from 'src/app/models/resource';
import { Reservation } from 'src/app/models/reservation';
import { ConfirmCreateComponent } from '../confirm-create/confirm-create.component';

/**
 * view-resources component displays the availability of resources such as microphones
 * or ethernet
 */
@Component({
  selector: 'app-view-resources',
  templateUrl: './view-resources.component.html',
  styleUrls: ['./view-resources.component.css'],
})
export class ViewResourcesComponent implements OnInit, OnDestroy {

  reservationInfo: Reservation;
  resources: Resource[];
  resourceSubscription: Subscription;

  constructor(
    public reservationService: ReservationService,
    private modalService: NgbModal,
    public resourceService: ResourceService
  ) { }

  /**
   * Function that will open a modal with Reservation info and will appear updated
   * with the selectedResource being the Resource assigned to the Reservation.
   * @param selectedResource Takes in the selected resource.
   */
  open(selectedResource: any) {
    const reservation = this.reservationService.currentReservation;
    reservation.resource = selectedResource;
    const modalRef = this.modalService.open(ConfirmCreateComponent, { centered: true });
    modalRef.componentInstance.reservation = reservation;
  }

  ngOnInit() {
    if (this.resourceService.currentResourceList) {
      this.resources = this.resourceService.currentResourceList;
    } else {
      this.resourceSubscription = this.resourceService.$currentResourceList.subscribe((resources) => {
        this.resources = resources;
      });
    }
  }

  /**
   * When the user navigates away from the page, destroy the entire list of resources.
   */
  ngOnDestroy() {
    // if (this.resourceService) {
    //   this.resourceSubscription.unsubscribe();
    // }
     this.resourceService.pushNewCurrentResourceList(null);
  }
}
