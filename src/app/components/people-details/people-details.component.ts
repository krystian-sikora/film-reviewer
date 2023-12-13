import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/services/api/api.service';
import { PersonDetails } from '../../interfaces/people/person-details';

@Component({
  selector: 'app-people-details',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './people-details.component.html',
  styleUrl: './people-details.component.scss'
})
export class PeopleDetailsComponent {
  id: string | undefined;
  personDetails: PersonDetails | undefined;

  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    this.getPersonDetails()
  }

  private getPersonDetails() {
    this.api.getPersonDetails(this.getPersonId())
      .subscribe((res) => {
        this.personDetails = res;
      });
  }

  private getPersonId(): string {
    return this.route.snapshot.paramMap.get('id')!;
  }
}
