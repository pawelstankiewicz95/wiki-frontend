import { ChangeDetectorRef, Component } from '@angular/core';
import { Message } from '../../models/message';
import { MessageService } from '../../services/message.service';
import { DatePipe } from '@angular/common';
import { AbstractControl, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

  public messages: Message[] = [];

  text = new FormControl('', [Validators.required, this.noWhitespaceValidator]);

  constructor(private messageService: MessageService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getMessages();

    this.messageService.messages$.subscribe({
      next: (messages: Message[]) => {
        this.messages = messages;
      },
      error: (err) => console.log(err)
    });
  }

  public getMessages(): void {
    this.messageService.getMessages().subscribe((response: Message[]) => {
      this.messages = response;
    });
  }

  public saveMessage() {
    if (this.text.valid) {
      const text = this.text.value!;

      let message: Message = {
        id: 0,
        message: text,
        timeCreated: new Date(),
      }
      this.messageService.saveMessage(message).subscribe({
        next: (response) => {
          console.log('Item saved:', response);
          this.changeDetectorRef.detectChanges();
          this.scrollDown()
          this.text.reset();
        },
        error: (err) => console.log(err)
      });
    } else {
      console.log('invalide form');
    }
  }

  scrollDown() {
    console.log('scroll down');
    const element = document.getElementById('chat')!;
    element.scrollTop = element.scrollHeight;
  }

  public noWhitespaceValidator(control: AbstractControl) {
    return (control.value || '').trim().length ? null : { 'whitespace': true };
  }
}
