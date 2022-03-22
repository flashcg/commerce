export interface OrderItems {
    name: string;
    overflow: string;
    container: string;
    sectionClass: string;
    paddingY: number;
    additionClass: object;
    switchText: string;
    subscription: Subscription;
    iconGird: number;
    iconGirdMObile: number;
    iconGirdClass: string;
    items: Item[];
}

export interface Item {
    text: object;
    name: string;
    imageUrl: string;
    model?: string;
    price: number;
    buyLink: string;
    id: number;
    tips?: string[];
    iconUrl?: string;
    container? : string;
    sectionClass? : string;
    subscriptions?: SubscriptionText[];
}

export interface SubscriptionText {
    price: number;
    id: number;
    text: string;
    tips?: string[];
}

export interface Subscription {
    switchText: string;
    tips: string[];
}

