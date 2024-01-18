import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-bar-component',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './search-bar-component.component.html',
  styleUrl: './search-bar-component.component.scss'
})
export class SearchBarComponentComponent {

}
