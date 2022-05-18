export interface EventArgs<Data> {
    id: string;
    event: string;
    data: Data | null
}

export type Handler<T, D = any> = (sender: T, event: EventArgs<D>) => void;

export class Notifier<T, D = any> {
    handlerMap: Map<string, Handler<T, D>> = new Map();

    subscribe(id: string, handler: Handler<T, D>): void {
        this.handlerMap.set(id, handler);
    }

    unsubscribe(id: string): void {
        this.handlerMap.delete(id);
    }

    notify(sender: T, event: string, data: D | null = null) {
        for (const [id, handler] of Array.from(this.handlerMap.entries())) {
            handler(sender, { id, event, data });
        }
    }
}
