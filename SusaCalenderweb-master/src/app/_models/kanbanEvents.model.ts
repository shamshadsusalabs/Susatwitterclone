export class kanbanEvents{
    _id: string;
    name: string;
    statusId: number;
    index: number;
    title: string;
    description: string;
    imageURL: string;
    priority: string;
    modifiedDate: string;
    creationDate: string;
    closingDate: string;
    progressDate: string;
    ticketId: number;

    constructor(kanbanEvents) {
        this._id = kanbanEvents._id;
        this.name = kanbanEvents.name;
        this.statusId = kanbanEvents.statusId;
        this.index = kanbanEvents.index;
        this.title = kanbanEvents.title;
        this.description = kanbanEvents.description;
        this.imageURL = kanbanEvents.imageURL;
        this.priority = kanbanEvents.priority;
        this.closingDate = kanbanEvents.closingDate;
        this.creationDate = kanbanEvents.creationDate;
        this.modifiedDate = kanbanEvents.modifiedDate;
        this.progressDate = kanbanEvents.progressDate;
        this.ticketId = kanbanEvents.ticketId;
    }
}