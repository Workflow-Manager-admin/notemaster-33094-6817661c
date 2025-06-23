import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-fab',
  standalone: true,
  template: `<button (click)="clicked.emit()" class="fab" title="Add Note">
      <span>＋</span>
    </button>`,
  styleUrls: ['./fab.component.css'],
})
export class FabComponent {
  @Output() clicked = new EventEmitter<void>();
}
