export type EventArgs = { id: string; event: string };
export type Handler<T> = (sender: T, event: EventArgs) => void;

export class Notifier<T> {
    handlerMap: Map<string, Handler<T>> = new Map();

    subscribe(id: string, handler: Handler<T>): void {
        this.handlerMap.set(id, handler);
    }

    unsubscribe(id: string): void {
        this.handlerMap.delete(id);
    }

    notify(sender: T, event: string) {
        for (const [id, handler] of Array.from(this.handlerMap.entries())) {
            handler(sender, { id, event });
        }
    }
}
