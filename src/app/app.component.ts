import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  ngOnInit(): void {
	var config = {
		apiKey: "AIzaSyA-ieNl5KQf6byEO0eAz2VR78v9TiAOJiE",
		authDomain: "jta-instagram-clone-cb1e7.firebaseapp.com",
		databaseURL: "https://jta-instagram-clone-cb1e7.firebaseio.com",
		projectId: "jta-instagram-clone-cb1e7",
		storageBucket: "jta-instagram-clone-cb1e7.appspot.com",
		messagingSenderId: "814050546520"
	  };
	firebase.initializeApp(config)
  }
}
