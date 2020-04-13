import { FormGroup } from '@angular/forms';
import { element } from 'protractor';

export class DateFunction {

  // private time = {                                                                  // structure
  //   years: 31536000,
  //   months: 2592000,
  //   weeks: 604800, // uncomment row to ignore
  //    days:  86400,   // feel free to add your own row
  //    hours: 3600,
  //    minutes: 60
  //  };

  constructor() {}

   public  get_TimeInverted(time: number) {
    let diff = time;
    const intervals = [
                        [31536000, 'year'],
                        [ 2592000, 'month'],
                        [   86400, 'day'],
                        [    3600, 'hour'],
                        [      60, 'minute']
                    ];
    const intervalStrings = [];
    // tslint:disable-next-line:prefer-for-of
    for ( let index = 0; index < intervals.length; index++ ) {

      const valor = Math.floor(diff / Number(intervals[index][0]));
      if ( valor > 0 ) {
        intervalStrings.push(valor + ' ' + intervals[index][1] + ((valor > 1) ?  's' : ' '));
        diff = diff % Number(intervals[index][0]);
      }

    }

    return intervalStrings.join(' ');
    // return  Math.floor(diff % this.time.day ) + ' days '
    //         + Math.floor(diff % this.time.hour ) + ' hours ' + Math.floor(diff % this.time.minute) + ' minutes';
  }

}


export function must_greatest( start: string, finish: string) {
  return (formGroup: FormGroup) => {
     const primaryControl = formGroup.controls[start];
     const secundaryControl = formGroup.controls[finish];

     if (primaryControl.errors && !secundaryControl.errors.mustGreatest ) {
        return;
     }

     try {
      const date1 = primaryControl.value;
      const date2 = secundaryControl.value;
      const diff = Math.abs((date2.getTime() - date1.getTime()) / 1000 ) ;

      if ( Math.floor(diff / 60) < 5) {
        secundaryControl.setErrors({mustGreatest: true});
      } else {
        secundaryControl.setErrors(null);
      }

    } catch (error) {
     // console.log(error);
    }

  };
}
