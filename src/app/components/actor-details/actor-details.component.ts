import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/services/api/api.service';

@Component({
  selector: 'app-actor-details',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './actor-details.component.html',
  styleUrl: './actor-details.component.scss'
})
export class ActorDetailsComponent {
  id: string | undefined;
  actorDetails: any;

  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!
    this.getActorDetails()
    
  }

  private getActorDetails() {
    this.api.getPersonDetails(this.id!)
      .subscribe((res) => {
        this.actorDetails = res;
        console.log(res)
      });
  }
}
