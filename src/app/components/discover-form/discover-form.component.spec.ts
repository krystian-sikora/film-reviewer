import { type ComponentFixture, TestBed } from '@angular/core/testing'

import { DiscoverFormComponent } from './discover-form.component'

describe('DiscoverFormComponent', () => {
  let component: DiscoverFormComponent
  let fixture: ComponentFixture<DiscoverFormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscoverFormComponent]
    })
      .compileComponents()

    fixture = TestBed.createComponent(DiscoverFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
