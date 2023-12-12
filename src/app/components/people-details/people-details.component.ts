import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/services/api/api.service';

@Component({
  selector: 'app-people-details',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './people-details.component.html',
  styleUrl: './people-details.component.scss'
})
export class PeopleDetailsComponent {
  id: string | undefined;
  personDetails: any;

  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!
    this.getPersonDetails()
    
  }

  private getPersonDetails() {
    this.api.getPersonDetails(this.id!)
      .subscribe((res) => {
        this.personDetails = res;
        console.log(res)
      });
  }
}
