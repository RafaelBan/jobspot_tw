import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(public token: TokenStorageService) { }

  ngOnInit(): void {
  }

}
