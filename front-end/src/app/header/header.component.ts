import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router, public token: TokenStorageService) {}

  ngOnInit(): void {}

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  logout() {
    this.token.signOut();
    this.goToPage("/auth/login");
  }

  goToProfile() {
    this.goToPage("/profile");
  }

  goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }

}
