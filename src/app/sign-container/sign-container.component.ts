import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-sign-container',
  templateUrl: './sign-container.component.html',
  styleUrls: ['./sign-container.component.scss']
})
export class SignContainerComponent {
  @Input() sign: 'X' | 'O' | undefined
}
