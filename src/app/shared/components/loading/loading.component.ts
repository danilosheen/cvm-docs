import { Component } from '@angular/core';
import { LottieComponent } from 'ngx-lottie';
import { AnimationOptions } from 'ngx-lottie';
import animationData from '../../../../assets/animations/loading.json';

@Component({
  selector: 'app-loading',
  imports: [LottieComponent],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {
  options: AnimationOptions = {
    animationData: animationData,
    loop: true,
    autoplay: true
  };
}
