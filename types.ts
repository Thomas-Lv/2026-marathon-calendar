
export type EventCategory = 'A' | 'B' | 'C';

export interface MarathonEvent {
  id: number;
  province: string;
  name: string;
  time: string;
  organizer: string;
  eventType: string;
  category: EventCategory;
}

export interface GroupedEvents {
  date: string;
  events: MarathonEvent[];
}
