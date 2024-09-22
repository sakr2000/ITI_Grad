import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../page-header/page-header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-agent',
  standalone: true,
  imports: [PageHeaderComponent, ReactiveFormsModule,CommonModule ],
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.css'],
})
export class AddAgentComponent implements OnInit {
  agentForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.agentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[ا-ي A-Za-z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(16),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}\[\]|;:'",.<>?/~`\\])[A-Za-z\d!@#$%^&*()\-_=+{}\[\]|;:'",.<>?/~`\\]+$/)
        ]
      ],

      branch: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('01(0|1|2|5)[0-9]{8}'), Validators.minLength(11), Validators.maxLength(11)]],
      governs: [[], Validators.required],
      address: ['', Validators.required],
      typeOfDiscount: ['', Validators.required],
      companyPercent: ['', [Validators.required, Validators.pattern(/^(100|[1-9]?[0-9])$/)]],
    });
  }

  onSubmit() {
    if (this.agentForm.valid) {
      console.log(this.agentForm.value);
    }
  }
}
