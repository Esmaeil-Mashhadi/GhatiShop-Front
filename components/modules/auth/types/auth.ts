export type NotifObjectType = {
    type: 'success' | 'warning' | 'error' 
    message: string;
    triggered: boolean;
}