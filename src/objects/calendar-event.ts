export class CalendarEvent {

    public isInCalendar : boolean = false;

    constructor(public EndDate : Date, public InsType : string, public RegPlate : string) {}

    getDateString() : string {
        return `${this.EndDate.getDate()}/${this.EndDate.getMonth()+1}/${this.EndDate.getFullYear()}`;
    }
}
