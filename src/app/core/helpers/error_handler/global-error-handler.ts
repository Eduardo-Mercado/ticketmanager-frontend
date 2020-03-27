import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from './error.service';
import { LoggingService } from './logging.service';
import { NotificationService } from './notification.service';

/** Handles HttpClient errors */
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) { }

  handleError(error: Error | HttpErrorResponse) {
    const errorService = this.injector.get(ErrorService);
    const logger = this.injector.get(LoggingService);
    const notifier = this.injector.get(NotificationService);

    let message;
    let stackTrace;
    if (error instanceof HttpErrorResponse) {
      // Server error
      message = errorService.getServerMessage(error);
      notifier.showError(message);
    } else {
      // Client error
      message = errorService.getClientMessage(error);
      stackTrace = errorService.getClientStack(error);
      notifier.showError(message);
    }

    // Always log errors
    logger.logError(message, stackTrace);
    console.error(error);

  }
}
