import { Injectable } from '@angular/core';
import { StompService } from 'ng2-stomp-service';
import { environment } from '../../environments/environment';
import { Event } from '../models/event';
import { EventType } from '../models/eventType';

@Injectable()
export class EventsService {

  constructor(private stomp: StompService) {
    // Configure stomp client
    stomp.configure({
      host: environment.sf_server_address + '/events',
      debug: environment.stomp_debug,
      queue: { 'init': false, 'events': false }
    });

    // Start socket connection
    stomp.startConnect().then(() => {
      stomp.done('init');
      console.log('Da client has konnected');
      this.stomp.subscribe('/topic/events', this.echoEvent);
    });
  }

  sendAddTrackEvent(user: string) {
    const addTrackEvent = new Event(user, EventType.ADDTRACK);
    addTrackEvent.setContext('artist', 'SoundGarden');
    console.log('Enviando evento ' + JSON.stringify(addTrackEvent));
    this.stomp.send('/app/events', addTrackEvent);
  }

  subscribeToEvents(callback: any) {
    this.stomp.after('init').then( () => {
      this.stomp.subscribe('/topic/events', callback);
    });
  }

  private echoEvent = (data) => {
    console.log('Recibiendo evento: ' + JSON.stringify(data));
  }

}
