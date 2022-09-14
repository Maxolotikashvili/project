import { Component, OnInit } from '@angular/core';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'project';

  bar = faBars;
  xmark = faXmark;

  classBar: string = 'bar';
  classXmark: string = 'xmark';

  constructor() {}

  ngOnInit(): void {
    document.addEventListener('scroll', () => {
      let scrollTop: any = document.documentElement.scrollTop;
      const list1 = document.querySelector('.li1');
      const list2 = document.querySelector('.li2');
      const list3 = document.querySelector('.li3');
      const list4 = document.querySelector('.li4');

      if (scrollTop >= 924) {
        list1?.classList.add('list1-active');
        list2?.classList.remove('list2-active');
        list3?.classList.remove('list3-active');
        list4?.classList.remove('list4-active');
      } else {
        list1?.classList.remove('list1-active')
      }

      if (scrollTop >= 1396) {
        list1?.classList.remove('list1-active');
        list2?.classList.add('list2-active');
        list3?.classList.remove('list3-active');
        list4?.classList.remove('list4-active');
      }

      if (scrollTop >= 2496) {
        list1?.classList.remove('list1-active');
        list2?.classList.remove('list2-active');
        list3?.classList.add('list3-active');
        list4?.classList.remove('list4-active');
      }

      if (scrollTop >= 3296) {
        list1?.classList.remove('list1-active');
        list2?.classList.remove('list2-active');
        list3?.classList.remove('list3-active');
        list4?.classList.add('list4-active');
      }
    });
    
  }

  handleScroll(scroll: number) {
    if (scroll === 0) {
      document.documentElement.scrollTop = 0;
    } else if (scroll === 961) {
      document.documentElement.scrollTop = 960;
      this.classBar = 'bar';
      this.classXmark = 'xmark';
      document.getElementById('nav')?.classList.remove('nav-active')
    } else if (scroll === 1856) {
      document.documentElement.scrollTop = 1856;
      this.classBar = 'bar';
      this.classXmark = 'xmark';
      document.getElementById('nav')?.classList.remove('nav-active')
    } else if (scroll === 2676) {
      document.documentElement.scrollTop = 2676;
      this.classBar = 'bar';
      this.classXmark = 'xmark';
      document.getElementById('nav')?.classList.remove('nav-active')
    } else if (scroll === 3607) {
      document.documentElement.scrollTop = 3607;
      this.classBar = 'bar';
      this.classXmark = 'xmark';
      document.getElementById('nav')?.classList.remove('nav-active')
    }
  }

  handleBar(condition: boolean) {
    if (condition === true) {
      this.classBar = 'bar-inactive'
      this.classXmark = 'xmark-active'

      document.getElementById('nav')?.classList.add('nav-active')

    } else if (condition === false) {
      this.classBar = 'bar'
      this.classXmark = 'xmark'

      document.getElementById('nav')?.classList.remove('nav-active')
    }
  }
}
