import { Component } from '@angular/core';
import { LottieComponent } from 'ngx-lottie';
import { AnimationOptions } from 'ngx-lottie';
import animationData from '../../../../assets/animations/loading-blue.json';

@Component({
  selector: 'app-loading-blue',
  imports: [LottieComponent],
  templateUrl: './loading-blue.component.html',
  styleUrl: './loading-blue.component.css'
})
export class LoadingBlueComponent {
  options: AnimationOptions = {
    animationData: animationData,
    loop: true,
    autoplay: true
  };
}
