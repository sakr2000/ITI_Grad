import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../page-header/page-header.component';

@Component({
  selector: 'app-add-agent',
  standalone: true,
  imports: [PageHeaderComponent, ReactiveFormsModule],
  templateUrl: './add-agent.component.html',
  styleUrl: './add-agent.component.css',
})
export class AddAgentComponent implements OnInit {
  agentForm!: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.agentForm = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
      role: [''],
      branch: [''],
      phoneNumber: [''],
      governs: [[]],
      address: [''],
      typeOfDiscount: [''],
      companyPercent: [''],
    });
  }
}
